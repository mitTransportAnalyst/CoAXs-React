/** the main entry point for the Browsochrones example */



import React, { Component } from 'react'
import { Marker, TileLayer, Map as LeafletMap, GeoJson } from 'react-leaflet'
import { Browser } from 'leaflet'
import { render } from 'react-dom'
import fetch from 'isomorphic-fetch'
import uuid from 'uuid'
import Browsochrones from 'browsochrones'
import TransitiveLayer from './transitive-layer'
import debounce from 'debounce'
import dbg from 'debug'

const debug = dbg('browsochrones-example:example')

const BOSTON = [42.358056, -71.063611]
const BOSTON_COMMON = [42.355, -71.065556]
const LIFE_ALIVE = [42.366639, -71.105435]
const WORKER_VERSION = 'v1.5.0-65-g1c86762'

const API_KEY_ID="3158ID11NHODSZ2BZX1WY1R4G";
const API_KEY_SECRET = "5+XSmtvA6ZEL5wneeTtOnuk+S8bCVPZs0k2H55GTT7k";
const TRANSPORT_NETWORK_ID = "709b3861891d5ea98975ab8317f8f270";
const BASE_URL = "http://coaxs.mit.edu:9090/api/single";
const AUTH_URL = "http://coaxs.mit.edu/oauth/token";
const GRID_URL = "https://analyst-static.s3.amazonaws.com/grids/boston/Jobs_with_earnings__1250_per_month_or_less.grid";

/** how often will we allow the isochrone to update, in milliseconds */
const MAX_UPDATE_INTERVAL_MS = 20; // seems smooth on 2015 Macbook Pro

export default class BrowsochronesExample extends Component {
  /** This stores the data used to draw the map */
  state = {
    transitive: null,
    isochrone: null,
    isochroneCutoff: 60,
    key: null,
    loaded: false,
    origin: BOSTON_COMMON,
    destination: LIFE_ALIVE,
    staticRequest: {
      jobId: uuid.v4(),
      transportNetworkId: TRANSPORT_NETWORK_ID,
      request: {
        date: '2016-09-27',
        fromTime: 27000,
        toTime: 30600,
        accessModes: 'WALK',
        directModes: 'WALK',
        egressModes: 'WALK',
        transitModes: 'WALK,TRANSIT',
        walkSpeed: 1.3888888888888888,
        bikeSpeed: 4.166666666666667,
        carSpeed: 20,
        streetTime: 90,
        maxWalkTime: 20,
        maxBikeTime: 20,
        maxCarTime: 45,
        minBikeTime: 10,
        minCarTime: 10,
        suboptimalMinutes: 5,
        reachabilityThreshold: 0,
        bikeSafe: 1,
        bikeSlope: 1,
        bikeTime: 1,
        maxRides: 8,
        bikeTrafficStress: 4,
        boardingAssumption: 'RANDOM',
        monteCarloDraws: 220,
        scenario: process.env.SCENARIO || {
          id: uuid.v4(),
          modifications: []
        }
      }
    }
  };

  /** The browsochrones instance used to create isochrones */
  browsochrones = new Browsochrones();

  /** This fetches the stop trees and query metadata */
  fetchMetadata = async() => {
    let {staticRequest} = this.state;

    console.log(API_KEY_ID);
    // first get a token
    let response = await fetch(`${AUTH_URL}?key=${encodeURIComponent(API_KEY_ID)}&secret=${encodeURIComponent(API_KEY_SECRET)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    }).then(r => r.json());

    let accessToken = response.access_token;
    console.log(accessToken);

    this.setState({...this.state, accessToken});




    Promise.all([
      fetch(`${BASE_URL}?accessToken=${accessToken}`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'static-metadata',
          graphId: TRANSPORT_NETWORK_ID,
          workerVersion: WORKER_VERSION,
          request: staticRequest
        })
      }).then(res => {
        console.log(res);
        return res.json()}

      ),
      fetch(`${BASE_URL}?accessToken=${accessToken}`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'static-stop-trees',
          graphId: TRANSPORT_NETWORK_ID,
          workerVersion: WORKER_VERSION,
          request: staticRequest
        })
      }).then(res => {
        console.log(res);
        return res.arrayBuffer()}),
      fetch(GRID_URL).then(res => {
        console.log(res);
        return res.arrayBuffer()})
    ])
        .then(([metadata, stopTrees, grid]) => {
          Promise.all([
            this.browsochrones.setQuery(metadata),
            this.browsochrones.setStopTrees(stopTrees),
            this.browsochrones.setTransitiveNetwork(metadata.transitiveData),
            this.browsochrones.putGrid('grid', grid)
          ]).then(this.setState({...this.state, loaded: true}))
        })

  };


  moveOrigin = (e) => {
    let origin = e.target.getLatLng()
    let { x, y } = this.browsochrones.latLonToOriginPoint(origin)
    let { staticRequest, accessToken, isochroneCutoff } = this.state

    this.setState({...this.state, origin, isochrone: null, transitive: null, inVehicleTravelTime: null, travelTime: null, waitTime: null, accessibility: null})

    return fetch(`${BASE_URL}?accessToken=${accessToken}`, {
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
          await this.browsochrones.setOrigin(buff, { x, y })
          await this.browsochrones.generateSurface()
          let { isochrone, accessibility } = await this.getIsochroneAndAccessibility(isochroneCutoff)

          this.setState({...this.state, isochrone, key: uuid.v4(), origin, accessibility, transitive: null, inVehicleTravelTime: null, travelTime: null, waitTime: null})
        })
  }

  changeIsochroneCutoff = debounce(async (isochroneCutoff) => {
    isochroneCutoff = parseInt(isochroneCutoff)
    debug(`setting isochrone cutoff to ${isochroneCutoff}`)

    let data = await this.getIsochroneAndAccessibility(isochroneCutoff)
    debug(`${isochroneCutoff} accessibility: ${data.accessibility}`)
    this.setState({...this.state, ...data, isochroneCutoff})
  }, MAX_UPDATE_INTERVAL_MS)

  /** get an isochrone and an accessibility figure */
  async getIsochroneAndAccessibility (isochroneCutoff) {
    let [accessibility, isochrone] = await Promise.all([
      this.browsochrones.getAccessibilityForGrid('grid', isochroneCutoff),
      this.browsochrones.getIsochrone(isochroneCutoff)
    ])
    return { accessibility, isochrone, key: uuid.v4() }
  }

  moveDestination = async (e) => {
    let origin = e.target.getLatLng()
    let { x, y } = this.browsochrones.latLonToOriginPoint(origin)

    let { transitive, travelTime, waitTime, inVehicleTravelTime } = await this.browsochrones.generateDestinationData({ x, y })

    this.setState({ ...this.state, transitive, travelTime, waitTime, inVehicleTravelTime, key: uuid.v4() })
  }


  componentDidMount () {
    this.fetchMetadata()
  }

  render () {
    let { transitive, isochrone, key, origin, destination, travelTime, waitTime, inVehicleTravelTime, loaded, accessibility, isochroneCutoff } = this.state


    return <div className='map'>
      <LeafletMap center={BOSTON} zoom={13} detectRetina>
        <TileLayer
            url={`https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}${Browser.retina ? '@2x' : ''}.png`}
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        { isochrone && <GeoJson
            style={{ fill: '#dfe', fillOpacity: 0.5 }}
            data={isochrone}
            key={`iso-${key}`}
        />}

        { transitive && <TransitiveLayer data={transitive} key={`transitive-${key}`} /> }

        <Marker
            position={origin}
            draggable
            onDragend={this.moveOrigin}
        />
        <Marker
            position={destination}
            draggable
            onDragend={this.moveDestination}
        />
      </LeafletMap>

      { isochrone && <div className='floatingPanel'>
        <input type='range' min={0} max={120} value={isochroneCutoff} onChange={(e) => this.changeIsochroneCutoff(e.target.value)} /><br />
        Reachable within <u>{isochroneCutoff}</u> minutes<br />
        { accessibility && <span>Accessibility: {Math.round(accessibility / 100) * 100} </span>}<br />
        { transitive && <span>
          Total travel time: {travelTime} minutes<br />
          In-vehicle time: {inVehicleTravelTime} minutes<br />
          Wait time: {waitTime} minutes<br />
        </span> }
      </div> }

    </div>
  }
};
render(<BrowsochronesExample />, document.getElementById('root'));
