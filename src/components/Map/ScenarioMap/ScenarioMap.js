import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer, GeoJSON} from 'react-leaflet';
import s from "./ScenarioMap.css"
import {MapLat, MapLng, ZoomLevel, Tile} from "../../../config"

import uuid from 'uuid'
import Browsochrones from 'browsochrones'




const BOSTON = [42.358056, -71.063611];
const BOSTON_COMMON = [42.355, -71.065556];
const LIFE_ALIVE = [42.366639, -71.105435];
const WORKER_VERSION = 'v1.5.0-65-g1c86762';

const API_KEY_ID = "3158ID11NHODSZ2BZX1WY1R4G";
const API_KEY_SECRET = "5+XSmtvA6ZEL5wneeTtOnuk+S8bCVPZs0k2H55GTT7k";
const TRANSPORT_NETWORK_ID = "709b3861891d5ea98975ab8317f8f270";
const BASE_URL = "http://coaxs.mit.edu:9090/api/single";
const AUTH_URL = "http://coaxs.mit.edu/oauth/token";
const GRID_URL = "https://analyst-static.s3.amazonaws.com/grids/boston/Jobs_with_earnings__1250_per_month_or_less.grid";

/** how often will we allow the isochrone to update, in milliseconds */
const MAX_UPDATE_INTERVAL_MS = 20; // seems smooth on 2015 Macbook Pro


class ScenarioMap extends React.Component {
  constructor() {
    super();
    this.state = {
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
    this.fetchMetadata = this.fetchMetadata.bind(this)
  }


  async fetchMetadata() {

    const bs = new Browsochrones();


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
          bs.setQuery(metadata),
          bs.setStopTrees(stopTrees),
          bs.setTransitiveNetwork(metadata.transitiveData),
          bs.putGrid('grid', grid)
        ]).then(this.setState({...this.state, loaded: true}))
      })
  };






  componentDidMount() {
    //  const browsochrones = new Browsochrones();
    this.fetchMetadata();

  }

  render() {
    let { transitive, isochrone, key, origin, destination, travelTime, waitTime, inVehicleTravelTime, loaded, accessibility, isochroneCutoff } = this.state

    const position = [MapLat, MapLng];
    return (
      <div className={s.map}>
        <Map ref="foo" center={position} zoom={13} detectRetina>
          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          { isochrone && <GeoJson
            style={{ fill: '#dfe', fillOpacity: 0.5 }}
            data={isochrone}
            key={`iso-${key}`}
          />}

          { transitive && <TransitiveLayer data={transitive} key={`transitive-${key}`} /> }

        </Map>
      </div>
    );
  }
}

export default ScenarioMap;
