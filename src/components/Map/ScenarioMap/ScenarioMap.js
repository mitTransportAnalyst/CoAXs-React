import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer, GeoJson} from 'react-leaflet';
import Leaflet from 'leaflet'

import s from "./ScenarioMap.css"
import {MapLat, MapLng, ZoomLevel, Tile} from "../../../config"
// import TransitiveLayer from './transitive-map-layer'
// import transitiveStyle from './transitive-style'
import uuid from 'uuid'
import Browsochrones from 'browsochrones'
import debounce from 'debounce'


//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

//import configuration file
import {isPTP, INIT_ORIGIN, INIT_DESTINATION, WORKER_VERSION, API_KEY_ID, API_KEY_SECRET, TRANSPORT_NETWORK_ID, BASE_URL, AUTH_URL, GRID_URL  } from '../../../config'


/** how often will we allow the isochrone to update, in milliseconds */
const MAX_UPDATE_INTERVAL_MS = 50; // seems smooth on 2015 Macbook Pro


class ScenarioMap extends React.Component {


  constructor() {
    super();
    this.state = {
      isPTP: false,
      transitive: null,
      isochrone: null,
      transitive2: null,
      isochrone2: null,
      isochroneCutoff: 30,
      key: null,
      key2: null,
      loaded: false,
      origin: INIT_ORIGIN,
      destination: INIT_DESTINATION,

      preRequest: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2015-10-19',
          fromTime: 25200,
          toTime: 32400,
          accessModes: 'WALK',
          directModes: 'WALK',
          egressModes: 'WALK',
          transitModes: 'TRANSIT',
          walkSpeed: 1.11,
          bikeSpeed: 4.1,
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
      },
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
          transitModes: 'TRANSIT',
          walkSpeed: 1.11,
          bikeSpeed: 4.1,
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
          scenario: {id: uuid.v4(),modifications: []},
        }
      },
      staticRequestBase: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2015-10-19',
          fromTime: 25200,
          toTime: 32400,
          accessModes: 'WALK',
          directModes: 'WALK',
          egressModes: 'WALK',
          transitModes: 'TRANSIT',
          walkSpeed: 1.11,
          bikeSpeed: 4.1,
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
          scenario: {id: uuid.v4(),modifications: []},
        }
      },
    };


    this.fetchMetadata = this.fetchMetadata.bind(this);
    this.moveOrigin = this.moveOrigin.bind(this);
    this.moveDestination = this.moveDestination.bind(this);

    this.getIsochroneAndAccessibility = this.getIsochroneAndAccessibility.bind(this);
    this.changeIsochroneCutoffDebounce = debounce(this.changeIsochroneCutoff,MAX_UPDATE_INTERVAL_MS);
    this.changeIsochroneCutoff = this.changeIsochroneCutoff.bind(this);

    this.bs = new Browsochrones({webpack: true});
    this.bs2 = new Browsochrones({webpack: true});


  }



  async changeIsochroneCutoff(isochroneCutoff) {
    isochroneCutoff = parseInt(isochroneCutoff);
    if (this.props.isCompareMode){
      var data = await this.getIsochroneAndAccessibility(isochroneCutoff, true);
    }
    var data1 = await this.getIsochroneAndAccessibility(isochroneCutoff, false);

    this.setState({...this.state, ...data,...data1, isochroneCutoff})
  };


  async fetchMetadata() {

    if (true){

      let {preRequest} = this.state;

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
            request: preRequest
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
            request: preRequest
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
            this.bs2.setQuery(metadata),
            this.bs2.setStopTrees(stopTrees),
            this.bs2.setTransitiveNetwork(metadata.transitiveData),
            this.bs2.putGrid('grid', grid),

          ]).then(() => {
              console.log("done fetch");
              this.setState({...this.state, loaded: true});
            }
          )
        })

    }


    let {preRequest} = this.state;

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
          request: preRequest
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
          request: preRequest
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
          this.bs.putGrid('grid', grid),

        ]).then(() => {
            console.log("done fetch");
            this.setState({...this.state, loaded: true});
          }
        )
      })
  };


  moveOrigin(e) {
    if (this.props.isCompareMode){
      let origin = e.target.getLatLng();
      let {x, y} = this.bs.latLonToOriginPoint(origin);
      let {staticRequestBase, accessToken, isochroneCutoff} = this.state;

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


      // return fetch(`${BASE_URL}?accessToken=${accessToken}`, {
      fetch(`${BASE_URL}?accessToken=${accessToken}`, {
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
        .then(async(buff) => {
          console.log("generate surface");
          await this.bs2.setOrigin(buff, {x, y});
          await this.bs2.generateSurface("grid");
          let {isochrone2, accessibility2} = await this.getIsochroneAndAccessibility(isochroneCutoff, true);


          console.log("done isochrone and accessibility");

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


    // return fetch(`${BASE_URL}?accessToken=${accessToken}`, {
    fetch(`${BASE_URL}?accessToken=${accessToken}`, {
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
        let {isochrone, accessibility} = await this.getIsochroneAndAccessibility(isochroneCutoff, false);


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
  async getIsochroneAndAccessibility(isochroneCutoff, isBased) {
    if (isBased){
      let [accessibility2, isochrone2] = await Promise.all([
        this.bs2.getAccessibilityForGrid('grid', isochroneCutoff),
        this.bs2.getIsochrone(isochroneCutoff)
      ]);
      return {accessibility2, isochrone2, key2: uuid.v4()}
    }

    else{
      let [accessibility, isochrone] = await Promise.all([
        this.bs.getAccessibilityForGrid('grid', isochroneCutoff),
        this.bs.getIsochrone(isochroneCutoff)
      ]);
      return {accessibility, isochrone, key: uuid.v4()}
    }

  }


  async moveDestination(e) {
    let destination = e.target.getLatLng();
    let zoom = e.target._map._zoom;
    // let { x, y } = this.bs.latLonToOriginPoint(destination);

    // const point = this.bs.pixelToOriginPoint(destination, zoom);
    const point = this.bs.pixelToOriginPoint(Leaflet.CRS.EPSG3857.latLngToPoint(destination, zoom), zoom);

    console.log(point);

    // let { transitive, travelTime, waitTime, inVehicleTravelTime } = await this.bs.generateDestinationData(point);

    let { transitive, travelTime, waitTime, inVehicleTravelTime } = await this.bs.generateDestinationData({from: this.state.origin, to:point});

    console.log(await this.bs.generateDestinationData({from: this.state.origin, to:point}));
    // let { transitive, travelTime, waitTime, inVehicleTravelTime } = await this.bs.generateDestinationData({from: this.state.origin, to:{x, y}});


    this.setState({ ...this.state, transitive, travelTime, waitTime, inVehicleTravelTime, key: uuid.v4() })
  }


  componentWillMount(){
    let mode = false;
    fetch('https://api.mlab.com/api/1/databases/tdm/collections/user?q={"city":"Boston"}&apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC',{method:'GET', })
      .then(res => res.json())
      .then(res => {if (res[0].count % 2 === 0){  mode = false; } else {  mode = true;} })
      .then(this.setState({...this.state, isPTP: mode}));
  }

  componentDidMount() {
    //  const browsochrones = new Browsochrones();
    this.fetchMetadata();
    fetch('https://api.mlab.com/api/1/databases/tdm/collections/user?q={"city":"Boston"}&apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC',{method:'GET', })
      .then(res => res.json())
      .then(res => {this.setState({...this.state, isPTP: res[0].count % 2 === 1}); console.log(this.state.isPTP) })
      .then(fetch('https://api.mlab.com/api/1/databases/tdm/collections/user?q={"city":"Boston"}&apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC',{method:'PUT',    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body:JSON.stringify({"$inc":{"count":1}})}));
    //

  }

  componentDidUpdate(nextState){
    if (this.state.accessibility !== nextState.accessibility) {
      this.props.changeGridNumber([this.state.accessibility,this.state.accessibility2])
    }

}


  componentWillReceiveProps(nextProps) {
    if (this.props.currentTimeFilter !== nextProps.currentTimeFilter & this.state.key != null) {
      this.changeIsochroneCutoff(nextProps.currentTimeFilter);
    }
    if (this.props.fireScenario !== nextProps.fireScenario ) {
      this.state.staticRequest.request.scenario.modifications = nextProps.fireScenario
    }


  }


  render() {
    let {transitive, transitive2, isochrone, isochrone2, key, key2, origin, destination, travelTime, waitTime, inVehicleTravelTime, loaded, accessibility, accessibility2, isochroneCutoff} = this.state;

    const position = [MapLat, MapLng];
    return (
      <div className={s.map}>
        <Map center={position} zoom={13} detectRetina>
          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />


          { isochrone && <GeoJson
            style={{fill: '#dfe', fillOpacity: 0.5}}
            data={isochrone}
            key={`iso-${key}`}
          />}


          { isochrone2 && <GeoJson
            style={{fill: 'black', fillOpacity: 0.5}}
            data={isochrone2}
            key={`iso-${key2}`}
          />}


          {/*{ transitive && <TransitiveLayer data={transitive} styles={transitiveStyle} key={`transitive-${key}`}/> }*/}


          <Marker
            position={origin}
            draggable={true}
            onDragend={this.moveOrigin}
            ref='markerOrigin'
          />

          <Marker
            position={destination}
            draggable = {true}
            onDragend={this.moveDestination}
            ref='markerDestination'
          />
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTimeFilter: state.timeFilterStore.currentTimeFilter,
    fireScenario : state.fireUpdate.fireScenario,
    isCompareMode: state.isCompare.isCompare,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ScenarioMap);


