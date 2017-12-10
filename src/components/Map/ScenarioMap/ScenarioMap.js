import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer, GeoJson, ZoomControl, MapLayer} from 'react-leaflet';
import {Map as LeafletMap} from 'leaflet';
import jsolines from 'jsolines';

import s from "./ScenarioMap.css"

import Geojson16A from '../../../Data/busline/16A.geojson'
import Geojson16B from '../../../Data/busline/16B.geojson'
import Geojson16C from '../../../Data/busline/16C.geojson'
import GeojsonE3A from '../../../Data/busline/E3A.geojson'
import GeojsonE3B from '../../../Data/busline/E3B.geojson'
import GeojsonE3C from '../../../Data/busline/E3C.geojson'
import GeojsonE3D from '../../../Data/busline/E3D.geojson'
import GeojsonE5A from '../../../Data/busline/E5A.geojson'
import GeojsonE5B from '../../../Data/busline/E5B.geojson'
import GeojsonJeT from '../../../Data/busline/JeT.geojson'
import GeojsonNORTA from '../../../Data/busline/NORTA.geojson'

import Baseline from '../../../Data/scenario/Baseline.json'

import uuid from 'uuid'
import Browsochrones from 'browsochrones'
import debounce from 'debounce'

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

//import configuration file
import {
  MapLat,
  MapLng,
  ZoomLevel,
  Tile,
  CorridorInfo,
  INIT_ORIGIN,
  INIT_DESTINATION,
  WORKER_VERSION,
  TRANSPORT_NETWORK_ID,
  BASE_URL,
  GRID_URL,
} from '../../../config'

/** how often will we allow the isochrone to update, in milliseconds */
const MAX_UPDATE_INTERVAL_MS = 50; // seems smooth on 2017 Macbook Pro
const SURFACE_HEADER_LENGTH = 9;
const SURFACE_HEADER_TITLE = 'ACCESSGR';
const TRAVEL_TIME_PERCENTILES = [5, 25, 50, 75, 95];
const POSITION = TRAVEL_TIME_PERCENTILES.indexOf(50)


class ScenarioMap extends React.Component {
  constructor() {
    super();
    this.state = {
      transitive: null,
      isochrone: null,
      transitive2: null,
      isochrone2: null,
      isochroneCutoff: 30,
      key: null,
      key2: null,
      loaded: false,
      origin: {lat: MapLat, lng: MapLng},
      destination: INIT_DESTINATION,
      originGrid: null,
    };

    this.moveOrigin = this.moveOrigin.bind(this);
    this.getIsochroneAndAccessibility = this.getIsochroneAndAccessibility.bind(this);
    this.changeIsochroneCutoffDebounce = debounce(this.changeIsochroneCutoff, MAX_UPDATE_INTERVAL_MS);
    this.changeIsochroneCutoff = this.changeIsochroneCutoff.bind(this);
    this.updateScneario = this.updateScneario.bind(this);
    this.responseToSurface = this.responseToSurface.bind(this);
    this.intToString = this.intToString.bind(this);
    this.computeSingleValuedSurface = this.computeSingleValuedSurface.bind(this);
    this.computeIsochrone = this.computeIsochrone.bind(this);

    this.bs = new Browsochrones({webpack: true});
    this.bs2 = new Browsochrones({webpack: true});
  }


  componentDidUpdate(nextState) {
    if (this.state.accessibility !== nextState.accessibility) {
      this.props.changeGridNumber([this.state.accessibility, this.state.accessibility2])
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentTimeFilter !== nextProps.currentTimeFilter && this.state.key !== null) {
      this.changeIsochroneCutoff(nextProps.currentTimeFilter);
    }

    if (this.props.fireScenario !== nextProps.fireScenario) {
      let staticRequest = this.state.staticRequest;
      staticRequest.request.scenario.modifications = nextProps.fireScenario;
      staticRequest.request.scenario.id = uuid.v4();

      this.setState({
        staticRequest,
      });
    }

    if (this.props.isCompareMode !== nextProps.isCompareMode) {
      this.setState({
        isochrone: null,
        isochrone2: null,
        transitive: null,
        transitive2: null,
        key: null,
        key2: null,
        accessibility: null,
        accessibility2: null,
      });
    }

    if (this.props.updateButtonState !== nextProps.updateButtonState) {
      this.updateScneario();
    }
  }


  moveOrigin(e) {
    if (this.props.isCompareMode) {
      // let origin = e.target.getLatLng();
      // console.log(origin);
      // let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});
      // this.setState({
      //   ...this.state,
      //   originGrid: {x, y}
      // });
      //
      // let {staticRequest, isochroneCutoff,} = this.state;
      //
      // this.setState({
      //   ...this.state,
      //   origin,
      //   isochrone2: null,
      //   transitive2: null,
      //   inVehicleTravelTime2: null,
      //   travelTime2: null,
      //   waitTime2: null,
      //   accessibility2: null
      // });

      fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(
          {
            "date": "2017-12-08",
            "fromTime": 25200,
            "toTime": 32400,
            "accessModes": "WALK",
            "directModes": "WALK",
            "egressModes": "WALK",
            "transitModes": "BUS,TRAM,RAIL,SUBWAY",
            "walkSpeed": 1.3888888888888888,
            "bikeSpeed": 4.166666666666667,
            "monteCarloDraws": 200,
            "maxRides": 4,
            "fromLat": 29.98646043083785,
            "fromLon": -90.13526916503908,
            "workerVersion": "v3.2.0",
            "projectId": "5a29eca1896fd005dc77a631",
            "variantIndex": 0
          }
        )
      }).then(res => console.log(res))


    }


    // let origin = e.target.getLatLng();
    // console.log(origin);
    //
    // let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});
    //
    // console.log({x, y});
    // let {staticRequestBase, isochroneCutoff} = this.state;
    // this.setState({
    //   ...this.state,
    //   originGrid: {x, y}
    // });
    //
    // this.setState({
    //   ...this.state,
    //   origin,
    //   isochrone: null,
    //   transitive: null,
    //   inVehicleTravelTime: null,
    //   travelTime: null,
    //   waitTime: null,
    //   accessibility: null
    // });

    this.props.changeProgress(0.2);

    fetch("http://localhost:8000/api", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          "date": "2017-12-08",
          "fromTime": 25200,
          "toTime": 32400,
          "accessModes": "WALK",
          "directModes": "WALK",
          "egressModes": "WALK",
          "transitModes": "BUS,TRAM,RAIL,SUBWAY",
          "walkSpeed": 1.3888888888888888,
          "bikeSpeed": 4.166666666666667,
          "monteCarloDraws": 200,
          "maxRides": 4,
          "fromLat": 29.98646043083785,
          "fromLon": -90.13526916503908,
          "workerVersion": "v3.2.0",
          "projectId": "5a29eca1896fd005dc77a631",
          "variantIndex": 0
        }
      )
    })
      .then(res => res.arrayBuffer())
      .then(buff => this.responseToSurface(buff))
      .then(surface => this.computeSingleValuedSurface(surface))
      .then(singleValuedSurface => this.setState({isochrone: this.computeIsochrone(singleValuedSurface, 20)}))
  };

  intToString (val) {
    return (
      String.fromCharCode(val & 0xff) +
      String.fromCharCode((val >> 8) & 0xff) +
      String.fromCharCode((val >> 16) & 0xff) +
      String.fromCharCode((val >> 24) & 0xff)
    )
  }

  responseToSurface (response) {
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
      console.log(this.intToString(header[0]) + this.intToString(header[1]));
      console.log(header);
      // validate header and version
      if (this.intToString(header[0]) + this.intToString(header[1]) !== SURFACE_HEADER_TITLE) {
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

      // de delta code data
      for (let y = 0, pixel = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // pixels are delta coded individually
          for (let sample = 0, val = 0; sample < nSamples; sample++, pixel++) {
            data[pixel] = val += data[pixel]
          }
        }
      }

      // read metadata
      // TODO cross browser compatibility
      const decoder = new TextDecoder('utf-8') // utf-8 is Jackson default
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
        get (x: number, y: number) {
          const index1d = (y * width + x) * nSamples
          return data.slice(index1d, index1d + nSamples)
        }
      }
    }
  }

  computeSingleValuedSurface (travelTimeSurface) {
    if (travelTimeSurface == null) return null
    const surface = new Uint8Array(
      travelTimeSurface.width * travelTimeSurface.height
    )

    // y on outside, loop in order, hope the CPU figures this out and prefetches
    for (let y = 0; y < travelTimeSurface.height; y++) {
      for (let x = 0; x < travelTimeSurface.width; x++) {
        const index = y * travelTimeSurface.width + x
        surface[index] = travelTimeSurface.get(x, y)[POSITION]
      }
    }

    return {
      ...travelTimeSurface,
      surface
    }
  }

  computeIsochrone (singleValuedSurface, cutoff) {
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
        )
        return [lng, lat]
      }
    })
  }

  updateScneario() {
    if (this.props.isCompareMode) {
      let origin = this.state.origin;
      let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});
      let {staticRequest, isochroneCutoff} = this.state;

      this.setState({
        ...this.state,
        origin,
        isochrone2: null,
        transitive2: null,
        inVehicleTravelTime2: null,
        travelTime2: null,
        waitTime2: null,
        accessibility2: null
      });

      fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'static',
          request: staticRequest,
          workerVersion: WORKER_VERSION,
          graphId: TRANSPORT_NETWORK_ID,
          x,
          y
        })
      }).then(res => res.arrayBuffer())
        .then(async (buff) => {
          console.log("generate surface");
          await this.bs2.setOrigin({data: buff, point: {x, y}});
          await this.bs2.generateSurface({gridId: 'jobs'});
          let {isochrone2, accessibility2} = await this.getIsochroneAndAccessibility(isochroneCutoff, true);

          console.log("done isochrone and accessibility");
          this.props.doneCompareScenario(" ");

          this.setState({
            ...this.state,
            isochrone2,
            key2: uuid.v4(),
            origin,
            accessibility2,
            transitive2: null,
            inVehicleTravelTime2: null,
            travelTime2: null,
            waitTime2: null
          })
        })
    }

    let origin = this.state.origin;
    let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});
    let {staticRequestBase, isochroneCutoff} = this.state;

    this.setState({
      ...this.state,
      origin,
      isochrone: null,
      transitive: null,
      inVehicleTravelTime: null,
      travelTime: null,
      waitTime: null,
      accessibility: null
    });

    this.props.changeProgress(0.2);

    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({
        type: 'static',
        request: staticRequestBase,
        workerVersion: WORKER_VERSION,
        graphId: TRANSPORT_NETWORK_ID,
        x,
        y
      })
    }).then(res => res.arrayBuffer())
      .then(async (buff) => {
        console.log("generate surface");
        this.props.changeProgress(0.6);

        await this.bs.setOrigin({data: buff, point: {x, y}});
        await this.bs.generateSurface({gridId: 'jobs'});
        let {isochrone, accessibility} = await this.getIsochroneAndAccessibility(isochroneCutoff, false);

        this.props.changeProgress(0.9);

        console.log("done isochrone and accessibility");
        this.props.doneOneScenario(" ");

        this.setState({
          ...this.state,
          isochrone,
          key: uuid.v4(),
          origin,
          accessibility,
          transitive: null,
          inVehicleTravelTime: null,
          travelTime: null,
          waitTime: null
        });

        this.props.changeProgress(1);
      });


  };

  async changeIsochroneCutoff(isochroneCutoff) {
    isochroneCutoff = parseInt(isochroneCutoff);

    if (this.props.isCompareMode && this.state.isochrone2 !== null) {
      var data = await this.getIsochroneAndAccessibility(isochroneCutoff, true);
    }
    var data1 = await this.getIsochroneAndAccessibility(isochroneCutoff, false);
    this.setState({...this.state, ...data, ...data1, isochroneCutoff})
  };

  /** get an isochrone and an accessibility figure */
  async getIsochroneAndAccessibility(isochroneCutoff, isBased) {
    // console.log(isochroneCutoff, isBased);
    if (isBased) {
      let [accessibility2, isochrone2] = await Promise.all([
        this.bs2.getAccessibilityForGrid({gridId: 'jobs', cutoff: isochroneCutoff}),
        this.bs2.getIsochrone({cutoff: isochroneCutoff})
      ]);
      return {accessibility2, isochrone2, key2: uuid.v4()}
    }

    else {
      let [accessibility, isochrone] = await Promise.all([
        this.bs.getAccessibilityForGrid({gridId: 'jobs', cutoff: isochroneCutoff}),
        this.bs.getIsochrone({cutoff: isochroneCutoff})
      ]);
      return {accessibility, isochrone, key: uuid.v4()}
    }

  }

  render() {
    let {isochrone, isochrone2, key, key2, origin} = this.state;
    const position = [MapLat, MapLng];

    return (
      <div className={s.map}>
        <Map center={position} zoom={ZoomLevel} detectRetina zoomControl={false} ref='map' minZoom={12} maxZoom={15}>
          <ZoomControl position="bottomleft"/>
          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJson data={GeojsonJeT} key={"JeT"} style={{
            color: "#f1d3e9",
            weight: 1,
            opacity: 0.5
          }}
          />
          <GeoJson data={GeojsonNORTA} key={"NORTA"} style={{
            color: "#f1d3e9",
            weight: 1,
            opacity: 0.3
          }}
          />
          {isochrone && <GeoJson
            style={{
              stroke: true,
              fillColor: '#89cff0',
              color: '#45b3e7',
              weight: 1,
              fillOpacity: 0.25,
              opacity: 1
            }}
            data={isochrone}
            key={`iso-${key}`}
          />}
          {this.props.isCompareMode && isochrone2 && <GeoJson
            style={{
              stroke: true,
              fillColor: '#FDB813',
              color: '#F68B1F',
              weight: 1,
              fillOpacity: 0.25,
              opacity: 1,
            }}
            data={isochrone2}
            key={`iso-${key2}`}
          />}
          <Marker
            position={origin}
            draggable={true}
            onDragend={this.moveOrigin}
            ref='markerOrigin'
          />
          {
            this.props.currentCorridor === "A" && this.props.currentBusline.A === "16A" &&
            <GeoJson data={Geojson16A} key={"16A1"} style={{
              color: CorridorInfo["A"].color,
              weight: 8,
              opacity: 1
            }}
            />

          }
          {
            this.props.currentCorridor !== "A" && this.props.currentBusline.A === "16A" &&
            <GeoJson data={Geojson16A} key={"16A2"} style={{
              color: CorridorInfo["A"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "A" && this.props.currentBusline.A === "16B" &&
            <GeoJson data={Geojson16B} key={"16B1"} style={{
              color: CorridorInfo["A"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "A" && this.props.currentBusline.A === "16B" &&
            <GeoJson data={Geojson16B} key={"16B2"} style={{
              color: CorridorInfo["A"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "A" && this.props.currentBusline.A === "16C" &&
            <GeoJson data={Geojson16C} key={"16C1"} style={{
              color: CorridorInfo["A"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "A" && this.props.currentBusline.A === "16C" &&
            <GeoJson data={Geojson16C} key={"16C2"} style={{
              color: CorridorInfo["A"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "B" && this.props.currentBusline.B === "E3A" &&
            <GeoJson data={GeojsonE3A} key={"E3A1"} style={{
              color: CorridorInfo["B"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "B" && this.props.currentBusline.B === "E3A" &&
            <GeoJson data={GeojsonE3A} key={"E3A2"} style={{
              color: CorridorInfo["B"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "B" && this.props.currentBusline.B === "E3B" &&
            <GeoJson data={GeojsonE3B} key={"E3B1"} style={{
              color: CorridorInfo["B"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "B" && this.props.currentBusline.B === "E3B" &&
            <GeoJson data={GeojsonE3B} key={"E3B2"} style={{
              color: CorridorInfo["B"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "B" && this.props.currentBusline.B === "E3C" &&
            <GeoJson data={GeojsonE3C} key={"E3C1"} style={{
              color: CorridorInfo["B"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "B" && this.props.currentBusline.B === "E3C" &&
            <GeoJson data={GeojsonE3C} key={"E3C2"} style={{
              color: CorridorInfo["B"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "B" && this.props.currentBusline.B === "E3D" &&
            <GeoJson data={GeojsonE3D} key={"E3D1"} style={{
              color: CorridorInfo["B"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "B" && this.props.currentBusline.B === "E3D" &&
            <GeoJson data={GeojsonE3D} key={"E3D2"} style={{
              color: CorridorInfo["B"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "C" && this.props.currentBusline.C === "E5A" &&
            <GeoJson data={GeojsonE5A} key={"E5A1"} style={{
              color: CorridorInfo["C"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "C" && this.props.currentBusline.C === "E5A" &&
            <GeoJson data={GeojsonE5A} key={"E5A2"} style={{
              color: CorridorInfo["C"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
          {
            this.props.currentCorridor === "C" && this.props.currentBusline.C === "E5B" &&
            <GeoJson data={GeojsonE5B} key={"E5B1"} style={{
              color: CorridorInfo["C"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }
          {
            this.props.currentCorridor !== "C" && this.props.currentBusline.C === "E5B" &&
            <GeoJson data={GeojsonE5B} key={"E5B2"} style={{
              color: CorridorInfo["C"].color,
              weight: 5,
              opacity: 0.5
            }}
            />
          }
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTimeFilter: state.timeFilterStore.currentTimeFilter,
    fireScenario: state.fireUpdate.fireScenario,
    isCompareMode: state.isCompare.isCompare,
    currentCorridor: state.currentCorridorStore.currentCor,
    currentBusline: state.BuslineSelectedStore,
    updateButtonState: state.updateButtonState,
    emailStore: state.emailStore,
    scenarioStore: state.scenarioStore,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ScenarioMap);


