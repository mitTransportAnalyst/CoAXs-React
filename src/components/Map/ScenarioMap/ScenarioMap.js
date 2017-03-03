import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer, GeoJson} from 'react-leaflet';
import s from "./ScenarioMap.css"
import {MapLat, MapLng, ZoomLevel, Tile} from "../../../config"
import TransitiveLayer from './transitive-layer'
import uuid from 'uuid'
import Browsochrones from 'browsochrones'
import debounce from 'debounce'


//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

//import configuration file
import {INIT_ORIGIN, INIT_DESTINATION, WORKER_VERSION, API_KEY_ID, API_KEY_SECRET, TRANSPORT_NETWORK_ID, BASE_URL, AUTH_URL, GRID_URL  } from '../../../config'


/** how often will we allow the isochrone to update, in milliseconds */
const MAX_UPDATE_INTERVAL_MS = 20; // seems smooth on 2015 Macbook Pro


class ScenarioMap extends React.Component {


  constructor() {
    super();
    this.state = {
      transitive: null,
      isochrone: null,
      isochroneCutoff: 5,
      key: null,
      loaded: false,
      origin: INIT_ORIGIN,
      destination: INIT_DESTINATION,
      staticRequest: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2015-10-19',
          fromTime: 25200,
          toTime: 32400,
          accessModes: 'WALK',
          directModes: 'WALK',
          egressModes: 'WALK',
          transitModes: 'WALK,TRANSIT',
          walkSpeed: 1.3888888888888888,
          bikeSpeed: 4.166666666666667,
          carSpeed: 20,
          streetTime: 90,
          maxWalkTime: 60,
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
          monteCarloDraws: 120,
          scenario: {id: 999},
        }
      }
    };


    this.fetchMetadata = this.fetchMetadata.bind(this);
    this.moveOrigin = this.moveOrigin.bind(this);
    this.getIsochroneAndAccessibility = this.getIsochroneAndAccessibility.bind(this);
    // this.changeIsochroneCutoffDebounce = debounce(this.changeIsochroneCutoff,MAX_UPDATE_INTERVAL_MS);
    this.changeIsochroneCutoff = this.changeIsochroneCutoff.bind(this);

    this.bs = new Browsochrones({webpack: true});
    // this.bs2 = new Browsochrones({webpack: true});


  }


  async changeIsochroneCutoff(isochroneCutoff) {
    isochroneCutoff = parseInt(isochroneCutoff);
    console.log(isochroneCutoff);
    let data = await this.getIsochroneAndAccessibility(isochroneCutoff);
    this.setState({...this.state, ...data, isochroneCutoff})
  };


  async fetchMetadata() {


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
          return res.json()
        }
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
        return res.arrayBuffer()
      }),
      fetch(GRID_URL).then(res => {
        console.log(res);
        return res.arrayBuffer()
      })
    ])
      .then(([metadata, stopTrees, grid]) => {

        Promise.all([
          this.bs.setQuery(metadata),
          this.bs.setStopTrees(stopTrees),
          this.bs.setTransitiveNetwork(metadata.transitiveData),
          this.bs.putGrid('grid', grid)
        ]).then(() => {
            console.log("done fetch");

            this.setState({...this.state, loaded: true});
          }
        )
      })
  };


  moveOrigin(e) {
    let origin = e.target.getLatLng();
    let {x, y} = this.bs.latLonToOriginPoint(origin);
    let {staticRequest, accessToken, isochroneCutoff} = this.state;

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
      .then(async(buff) => {
        console.log("generate surface");
        await this.bs.setOrigin(buff, {x, y});
        await this.bs.generateSurface("grid");
        let {isochrone, accessibility} = await this.getIsochroneAndAccessibility(isochroneCutoff);


        console.log("done isochrone and accessibility");

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
        })
      })
  };


  /** get an isochrone and an accessibility figure */
  async getIsochroneAndAccessibility(isochroneCutoff) {
    let [accessibility, isochrone] = await Promise.all([
      this.bs.getAccessibilityForGrid('grid', isochroneCutoff),
      this.bs.getIsochrone(isochroneCutoff)
    ]);
    return {accessibility, isochrone, key: uuid.v4()}
  }


  componentDidMount() {
    //  const browsochrones = new Browsochrones();
    this.fetchMetadata();

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.currentTimeFilter !== nextProps.currentTimeFilter) {
      this.changeIsochroneCutoff(nextProps.currentTimeFilter);
    }
  }


  render() {
    let {transitive, isochrone, key, origin, destination, travelTime, waitTime, inVehicleTravelTime, loaded, accessibility, isochroneCutoff} = this.state;

    const position = [MapLat, MapLng];
    return (
      <div className={s.map}>
        <Map center={position} zoom={13} detectRetina>
          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />


          { isochrone && <GeoJson
            style={{fill: '#dfe', fillOpacity: 0.1}}
            data={isochrone}
            key={`iso-${key}`}
          />}

          { isochrone && <GeoJson
            style={{fill: '#ceb', fillOpacity: 0.1}}
            data={isochrone}
            key={`iso2-${key}`}
          />}


          { transitive && <TransitiveLayer data={transitive} key={`transitive-${key}`}/> }


          <Marker
            position={origin}
            draggable={true}
            onDragend={this.moveOrigin}
            ref='marker'
          />


        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTimeFilter: state.timeFilterStore.currentTimeFilter,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ScenarioMap);


