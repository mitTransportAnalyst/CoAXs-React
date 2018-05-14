import {Map as LeafletMap} from 'leaflet';
import jsolines from 'jsolines';
//import configuration file
import {
  GET_MODIFICATIONS_URL,
  UPDATE_MODIFICATIONS_URL,
} from '../../../config'

const SURFACE_HEADER_LENGTH = 9;
const SURFACE_HEADER_TITLE = 'ACCESSGR';
const TRAVEL_TIME_PERCENTILES = [5, 25, 50, 75, 95];
const POSITION = TRAVEL_TIME_PERCENTILES.indexOf(50);

export function responseToSurface(response) {
  if (response[0] && response[0].title) {
    // this is a list of errors from the backend
    return {
      errors: response,
      warnings: []
    }
  } else {
    // First read the header to figure out how big the binary portion is, then
    // read the full binary portion, then read the sidecar metadata at the end.
    const header = new Int32Array(response, 0, SURFACE_HEADER_LENGTH);
    // validate header and version
    if (intToString(header[0]) + intToString(header[1]) !== SURFACE_HEADER_TITLE) {
      throw new Error('Invalid header in travel time surface')
    }
    if (header[2] !== 0) {
      throw new Error(`Unsupported version ${header[2]} of travel time surface`)
    }
    const zoom = header[3];
    const west = header[4];
    const north = header[5];
    const width = header[6];
    const height = header[7];
    const nSamples = header[8];

    // 9 ints of header, each four bytes wide
    const data = new Int32Array(
      response,
      SURFACE_HEADER_LENGTH * 4,
      width * height * nSamples
    );

    // de delta-code
    for (let i = 0, position = 0; i < nSamples; i++){
      let previous = 0
      for (let j = 0; j < width * height; j++, position++){
        data[position] = data[position] + previous
        previous = data[position]
      }
    }

    // read metadata
    const decoder = new TextDecoder('utf-8'); // utf-8 is Jackson default
    const rawMetadata = new Uint8Array(
      response,
      (SURFACE_HEADER_LENGTH + width * height * nSamples) * 4
    );
    const metadata = JSON.parse(decoder.decode(rawMetadata));

    return {
      zoom,
      west,
      north,
      width,
      height,
      nSamples,
      errors: [], // no errors - we got a result
      warnings: metadata.projectApplicationWarnings || [],
      get(x, y, z) {
        const index1d = ((z * width * height) + y * width + x);
        return data[index1d]
      }
    }
  }
}

/**
 * Convert a four-byte int to a four-char string
 */
function intToString(val) {
  return (
    String.fromCharCode(val & 0xff) +
    String.fromCharCode((val >> 8) & 0xff) +
    String.fromCharCode((val >> 16) & 0xff) +
    String.fromCharCode((val >> 24) & 0xff)
  )
}

/**
 * SingleValuedSurface, width, height all come from selector defined below and
 * thus must be passed in one argument.
 */
export function computeIsochrone(singleValuedSurface, cutoff) {
  if (singleValuedSurface == null) return null;

  const {surface, width, height, west, north, zoom} = singleValuedSurface;

  return jsolines({
    surface,
    width,
    height,
    cutoff,
    project: ([x, y]) => {
      const {lat, lng} = LeafletMap.prototype.unproject(
        [x + west, y + north],
        zoom
      );
      return [lng, lat]
    }
  })
}

/**
 * The travel time surface contains percentiles, compute a surface with a single
 * percentile for jsolines done separately from isochrone computation because it
 * can be saved when the isochrone cutoff changes when put in a separate
 * selector, memoization will handle this for us.
 */
export function computeSingleValuedSurface(travelTimeSurface) {
  if (travelTimeSurface == null) return null;
  const surface = new Uint8Array(
    travelTimeSurface.width * travelTimeSurface.height
  );

  // y on outside, loop in order, hope the CPU figures this out and prefetches
  for (let y = 0; y < travelTimeSurface.height; y++) {
    for (let x = 0; x < travelTimeSurface.width; x++) {
      const index = y * travelTimeSurface.width + x;
      surface[index] = travelTimeSurface.get(x, y,POSITION)
    }
  }

  return {
    ...travelTimeSurface,
    surface
  }
}

//recalculate isochrone when change the cutoff time
export function changeIsochroneCutoff(isochroneCutoff, singleValuedSurface) {
  isochroneCutoff = parseInt(isochroneCutoff);
  return computeIsochrone(singleValuedSurface, isochroneCutoff);
}

export function computeAccessibility(travelTimeSurface,
                                     isochroneCutoff,
                                     opportunityDataset) {
  if (travelTimeSurface == null || opportunityDataset == null || opportunityDataset == null) return null;
  let accessibility = 0
  // y on outside, loop in order, hope the CPU figures this out and prefetches
  for (let y = 0; y < opportunityDataset.height; y++) {
    const travelTimeY = y + opportunityDataset.north - travelTimeSurface.north;
    if (travelTimeY < 0 || travelTimeY >= travelTimeSurface.height) continue;
    for (let x = 0; x < opportunityDataset.width; x++) {
      const travelTimeX = x + opportunityDataset.west - travelTimeSurface.west;
      if (travelTimeX < 0 || travelTimeX >= travelTimeSurface.width) continue;
      // less than is correct here, times are floored on the server when
      // converted from seconds to minutes, so a travel time of 59m59s will have
      // a value of 59, not 60.
      if (
        travelTimeSurface.get(travelTimeX, travelTimeY,POSITION) <
        isochroneCutoff
      ) {
        accessibility += opportunityDataset.data[y * opportunityDataset.width + x]
      }
    }
  }

  return accessibility
}

export function processGrid(data) {
  const array = new Int32Array(data, 4 * 5);
  const header = new Int32Array(data);

  let min = Infinity;
  let max = -Infinity;

  for (let i = 0, prev = 0; i < array.length; i++) {
    array[i] = (prev += array[i]);
    if (prev < min) min = prev;
    if (prev > max) max = prev
  }

  const width = header[3];
  const height = header[4];

  // parse header
  return {
    zoom: header[0],
    west: header[1],
    north: header[2],
    width,
    height,
    data: array,
    min,
    max,
    contains(x, y) {
      return x >= 0 && x < width && y >= 0 && y < height
    }
  }
}

// update modification
export function updateModification(projectID, scenario) {
  //fetch modifications in this project
  return fetch(GET_MODIFICATIONS_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        projectID: projectID,
      }
    )
  }).then(res => res.json())
    .then(oldModifications => oldModifications.map(
      oldModification => {
        let updatedEntries = oldModification.entries.map(entry => {
          return {...entry, headwaySecs: scenario[oldModification.name] * 60}
        });
        return {
          ...oldModification, entries: updatedEntries,
        }
      }
    )).then(newModifications => Promise.all(newModifications.map(newModification =>
    fetch(UPDATE_MODIFICATIONS_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          newModification,
        }
      )
    })))
  );
}
