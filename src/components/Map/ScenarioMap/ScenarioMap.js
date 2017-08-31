import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer, GeoJson, ZoomControl, MapLayer, Circle, CircleMarker} from 'react-leaflet';
import Leaflet from 'leaflet'

import s from "./ScenarioMap.css"

import GeojsonCampbellton from '../../../Data/busline/Campbellton.geojson'
import GeojsonNorthside from '../../../Data/busline/Northside.geojson'
import GeojsonStreetcar from '../../../Data/busline/Streetcar.geojson'

import GeojsonL3 from '../../../Data/busline/L3.geojson'
import GeojsonL6 from '../../../Data/busline/L6.geojson'
import GeojsonL7 from '../../../Data/busline/L7.geojson'
import GeojsonMNA from '../../../Data/busline/MetrotrenNA.geojson'
import GeojsonTele from '../../../Data/busline/Tele.geojson'
import GeojsonTLC from '../../../Data/busline/TranviaLC.geojson'


import Baseline from '../../../Data/scenario/Baseline.json'
import scenario2018 from "../../../Data/scenario/scenario2018.json"
import scenarioL7 from "../../../Data/scenario/scenarioL7.json"
import scenarioTLC from "../../../Data/scenario/scenarioTLC.json"
import scenarioTBi from "../../../Data/scenario/scenarioTBi.json"
import InfillRedSeed from "../../../Data/scenario/InfillRed.json"


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
  API_KEY_ID,
  API_KEY_SECRET,
  TRANSPORT_NETWORK_ID,
  BASE_URL,
  AUTH_URL,
  GRID_URL,
  GRID_URL_3060,
  GRID_URL_6075,
  GRID_URL_7590,
  GRID_URL_norank,
  GRID_URL_pri,
  GRID_URL_sec,
  GRID_URL_ter,
} from '../../../config'


/** how often will we allow the isochrone to update, in milliseconds */
const MAX_UPDATE_INTERVAL_MS = 50; // seems smooth on 2015 Macbook Pro


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

      preRequest: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2017-06-08',
          fromTime: 25200,
          toTime: 27900,
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
          monteCarloDraws: 180,
          scenario: {id: 999},
        }
      },
      staticRequest: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2017-06-08',
          fromTime: 25200,
          toTime: 27900,
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
          monteCarloDraws: 180,
          scenario: {
            id: uuid.v4(), modifications: Baseline.modifications
          },
        }
      },
      staticRequestBase: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2017-06-08',
          fromTime: 25200,
          toTime: 27900,
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
          monteCarloDraws: 180,
          scenario: {id: uuid.v4(), modifications: Baseline.modifications},
        }
      },
    };


    this.fetchMetadata = this.fetchMetadata.bind(this);
    this.moveOrigin = this.moveOrigin.bind(this);

    this.getIsochroneAndAccessibility = this.getIsochroneAndAccessibility.bind(this);
    this.changeIsochroneCutoffDebounce = debounce(this.changeIsochroneCutoff, MAX_UPDATE_INTERVAL_MS);
    this.changeIsochroneCutoff = this.changeIsochroneCutoff.bind(this);
    this.updateScneario = this.updateScneario.bind(this);
    this.updateRequest = this.updateRequest.bind(this);


    this.bs = new Browsochrones({webpack: true});
    this.bs2 = new Browsochrones({webpack: true});


  }


  async changeIsochroneCutoff(isochroneCutoff) {
    isochroneCutoff = parseInt(isochroneCutoff);

    if (this.props.isCompareMode && this.state.isochrone2 !== null) {
      var data = await this.getIsochroneAndAccessibility(isochroneCutoff, true);
    }
    var data1 = await this.getIsochroneAndAccessibility(isochroneCutoff, false);
    this.setState({...this.state, ...data, ...data1, isochroneCutoff})
  };


  async fetchMetadata() {

    let {preRequest} = this.state;
    this.props.changeProgress(0.2);
    // first get a token
    // let response = await fetch(`${AUTH_URL}?key=${encodeURIComponent(API_KEY_ID)}&secret=${encodeURIComponent(API_KEY_SECRET)}`, {
      // method: 'POST',
      // headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      // },
      // body: 'grant_type=client_credentials'
    // }).then(r => r.json());

    // let accessToken = response.access_token;
    // console.log(accessToken);

    // this.setState({...this.state, accessToken});

    this.props.changeProgress(0.4);
    Promise.all([
      fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'static-metadata',
          graphId: TRANSPORT_NETWORK_ID,
          workerVersion: WORKER_VERSION,
          request: preRequest
        })
      }).then(res => {
          console.log(res);
          this.props.changeProgress(0.6);
          return res.json()
        }
      ),
      fetch(BASE_URL, {
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
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      }),
      fetch(GRID_URL_3060).then(res => {
        console.log(res);
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      }),
      fetch(GRID_URL_6075).then(res => {
        console.log(res);
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      }),
      fetch(GRID_URL_7590).then(res => {
        console.log(res);
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      }),
      fetch(GRID_URL_norank).then(res => {
        console.log(res);
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      }),
      fetch(GRID_URL_pri).then(res => {
        console.log(res);
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      }),
      fetch(GRID_URL_sec).then(res => {
        console.log(res);
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      }),
      fetch(GRID_URL_ter).then(res => {
        console.log(res);
        this.props.changeProgress(0.7);
        return res.arrayBuffer()
      })
    ])
      .then(([metadata, stopTrees, grid, grid3060, grid6075, grid7590, gridnorank, gridpri, gridsec, gridter]) => {


        Promise.all([
          this.bs2.setQuery(metadata),
          this.bs.setQuery(metadata),


          this.bs2.setStopTrees(stopTrees.slice(0)),
          this.bs.setStopTrees(stopTrees.slice(0)),

          this.bs2.setTransitiveNetwork(metadata.transitiveData),
          this.bs.setTransitiveNetwork(metadata.transitiveData),

          this.bs2.putGrid({id: 'jobs', grid: grid}),
          this.bs.putGrid({id: 'jobs', grid: grid}),

          this.bs2.putGrid({id: 'edu3060', grid: grid3060}),
          this.bs.putGrid({id: 'edu3060', grid: grid3060}),

          this.bs2.putGrid({id: 'edu6075', grid: grid6075}),
          this.bs.putGrid({id: 'edu6075', grid: grid6075}),

          this.bs2.putGrid({id: 'edu7590', grid: grid7590}),
          this.bs.putGrid({id: 'edu7590', grid: grid7590}),

          this.bs2.putGrid({id: 'edunorank', grid: gridnorank}),
          this.bs.putGrid({id: 'edunorank', grid: gridnorank}),

          this.bs2.putGrid({id: 'hetpri', grid: gridpri}),
          this.bs.putGrid({id: 'hetpri', grid: gridpri}),

          this.bs2.putGrid({id: 'hetsec', grid: gridsec}),
          this.bs.putGrid({id: 'hetsec', grid: gridsec}),

          this.bs2.putGrid({id: 'hetter', grid: gridter}),
          this.bs.putGrid({id: 'hetter', grid: gridter}),



        ]).then(() => {
            console.log("done fetch");
            this.props.changeProgress(1);
            this.setState({...this.state, loaded: true});
          }
        )
      })

  };


  moveOrigin(e) {
    // fetch('https://api.mlab.com/api/1/databases/tdm/collections/log?apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC',{method:'POST',    headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // }, body:JSON.stringify({"time":Date(), "email":this.props.emailStore, "ptp": false,"city":"ATL", origin:this.state.origin, "type":"moveOrigin", "scenario": this.props.scenarioStore, "isCompare": this.props.isCompareMode})});


    this.updateRequest();

    if (this.props.isCompareMode) {
      let origin = e.target.getLatLng();
      console.log(origin)
      let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});
      this.setState({
        ...this.state,
        originGrid: {x, y}
      });

      let {staticRequest, isochroneCutoff,} = this.state;

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


      // return fetch(BASE_URL, {
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
        .then(async(buff) => {
          console.log("generate surface");
          await this.bs2.setOrigin({data: buff, point: {x, y}});
          await this.bs2.generateSurface({gridId: 'jobs'});
          let {accessibility2, isochrone2, accessibility23060, accessibility26075, accessibility27590,
            accessibility2norank, accessibility2pri, accessibility2sec, accessibility2ter} = await this.getIsochroneAndAccessibility(isochroneCutoff, true);


          console.log("done isochrone and accessibility");
          this.props.doneCompareScenario(" ");

          this.setState({
            ...this.state,
            accessibility2, isochrone2, accessibility23060, accessibility26075, accessibility27590,
            accessibility2norank, accessibility2pri, accessibility2sec, accessibility2ter,
            key2: uuid.v4(),
            origin,
            transitive2: null,
            inVehicleTravelTime2: null,
            travelTime2: null,
            waitTime2: null
          })
        })

    }


    let origin = e.target.getLatLng();
    console.log(origin)

    let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});

    console.log({x, y})
    let {staticRequestBase, accessToken, isochroneCutoff} = this.state;
    this.setState({
      ...this.state,
      originGrid: {x, y}
    });

    this.setState({
      ...this.state,
      origin,
      isochrone: null,
      transitive: null,
      inVehicleTravelTime: null,
      travelTime: null,
      waitTime: null,
      accessibility: null,
      accessibility3060: null, accessibility6075: null, accessibility7590: null,
      accessibilitynorank: null, accessibilitypri: null, accessibilitysec: null, accessibilityter: null,
    });

    this.props.changeProgress(0.2);


    // return fetch(BASE_URL, {
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
      .then(async(buff) => {
        console.log("generate surface");
        this.props.changeProgress(0.6);

        await this.bs.setOrigin({data: buff, point: {x, y}});
        await this.bs.generateSurface({gridId: 'jobs'});
        let {accessibility, isochrone, accessibility3060, accessibility6075, accessibility7590,
          accessibilitynorank, accessibilitypri, accessibilitysec, accessibilityter} = await this.getIsochroneAndAccessibility(isochroneCutoff, false);

        this.props.changeProgress(0.9);

        console.log("done isochrone and accessibility");
        this.props.doneOneScenario(" ");

        this.setState({
          ...this.state,
          accessibility, isochrone, accessibility3060, accessibility6075, accessibility7590,
          accessibilitynorank, accessibilitypri, accessibilitysec, accessibilityter,
          key: uuid.v4(),
          origin,
          transitive: null,
          inVehicleTravelTime: null,
          travelTime: null,
          waitTime: null
        });

        this.props.changeProgress(1);

      });


  };

  updateScneario() {
    // fetch('https://api.mlab.com/api/1/databases/tdm/collections/log?apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC',{method:'POST',    headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // }, body:JSON.stringify({"time":Date(), "email":this.props.emailStore, "ptp": false, "city":"ATL", origin:this.state.origin, "type":"updateScenario", "scenario": this.props.scenarioStore, "isCompare": this.props.isCompareMode})});

    if (this.props.isCompareMode) {
      let origin = this.state.origin;
      let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});
      let {staticRequest, accessToken, isochroneCutoff} = this.state;

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


      // return fetch(BASE_URL, {
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
        .then(async(buff) => {
          console.log("generate surface");
          await this.bs2.setOrigin({data: buff, point: {x, y}});
          await this.bs2.generateSurface({gridId: 'jobs'});
          let {accessibility2, isochrone2, accessibility23060, accessibility26075, accessibility27590,
            accessibility2norank, accessibility2pri, accessibility2sec, accessibility2ter} = await this.getIsochroneAndAccessibility(isochroneCutoff, true);


          console.log("done isochrone and accessibility");
          this.props.doneCompareScenario(" ");

          this.setState({
            ...this.state,
            accessibility2, isochrone2, accessibility23060, accessibility26075, accessibility27590,
            accessibility2norank, accessibility2pri, accessibility2sec, accessibility2ter,
            key2: uuid.v4(),
            origin,
            transitive2: null,
            inVehicleTravelTime2: null,
            travelTime2: null,
            waitTime2: null
          })
        })

    }


    let origin = this.state.origin;
    let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});
    let {staticRequestBase, accessToken, isochroneCutoff} = this.state;

    this.setState({
      ...this.state,
      origin,
      isochrone: null,
      transitive: null,
      inVehicleTravelTime: null,
      travelTime: null,
      waitTime: null,
      accessibility: null,
      accessibility3060: null, accessibility6075: null, accessibility7590: null,
      accessibilitynorank: null, accessibilitypri: null, accessibilitysec: null, accessibilityter: null,
    });

    this.props.changeProgress(0.2);


    // return fetch(BASE_URL, {
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
      .then(async(buff) => {
        console.log("generate surface");
        this.props.changeProgress(0.6);

        await this.bs.setOrigin({data: buff, point: {x, y}});
        await this.bs.generateSurface({gridId: 'jobs'});
        let {accessibility, isochrone, accessibility3060, accessibility6075, accessibility7590,
          accessibilitynorank, accessibilitypri, accessibilitysec, accessibilityter} = await this.getIsochroneAndAccessibility(isochroneCutoff, false);

        this.props.changeProgress(0.9);

        console.log("done isochrone and accessibility");
        this.props.doneOneScenario(" ");

        this.setState({
          ...this.state,
          accessibility, isochrone, accessibility3060, accessibility6075, accessibility7590,
          accessibilitynorank, accessibilitypri, accessibilitysec, accessibilityter,
          key: uuid.v4(),
          origin,
          transitive: null,
          inVehicleTravelTime: null,
          travelTime: null,
          waitTime: null
        });

        this.props.changeProgress(1);

      });


  };


  /** get an isochrone and an accessibility figure */
  async getIsochroneAndAccessibility(isochroneCutoff, isBased) {
    // console.log(isochroneCutoff, isBased);
    if (isBased) {
      let [accessibility2, isochrone2, accessibility23060, accessibility26075, accessibility27590,
        accessibility2norank, accessibility2pri, accessibility2sec, accessibility2ter] = await Promise.all([
        this.bs2.getAccessibilityForGrid({gridId: 'jobs', cutoff: isochroneCutoff}),
        this.bs2.getIsochrone({cutoff: isochroneCutoff}),
        this.bs2.getAccessibilityForGrid({gridId: 'edu3060', cutoff: isochroneCutoff}),
        this.bs2.getAccessibilityForGrid({gridId: 'edu6075', cutoff: isochroneCutoff}),
        this.bs2.getAccessibilityForGrid({gridId: 'edu7590', cutoff: isochroneCutoff}),
        this.bs2.getAccessibilityForGrid({gridId: 'edunorank', cutoff: isochroneCutoff}),
        this.bs2.getAccessibilityForGrid({gridId: 'hetpri', cutoff: isochroneCutoff}),
        this.bs2.getAccessibilityForGrid({gridId: 'hetsec', cutoff: isochroneCutoff}),
        this.bs2.getAccessibilityForGrid({gridId: 'hetter', cutoff: isochroneCutoff}),
      ]);
      return {accessibility2, isochrone2, accessibility23060, accessibility26075, accessibility27590,
        accessibility2norank, accessibility2pri, accessibility2sec, accessibility2ter, key2: uuid.v4()}
    }

    else {
      let [accessibility, isochrone, accessibility3060, accessibility6075, accessibility7590,
        accessibilitynorank, accessibilitypri, accessibilitysec, accessibilityter] = await Promise.all([
        this.bs.getAccessibilityForGrid({gridId: 'jobs', cutoff: isochroneCutoff}),
        this.bs.getIsochrone({cutoff: isochroneCutoff}),
        this.bs.getAccessibilityForGrid({gridId: 'edu3060', cutoff: isochroneCutoff}),
        this.bs.getAccessibilityForGrid({gridId: 'edu6075', cutoff: isochroneCutoff}),
        this.bs.getAccessibilityForGrid({gridId: 'edu7590', cutoff: isochroneCutoff}),
        this.bs.getAccessibilityForGrid({gridId: 'edunorank', cutoff: isochroneCutoff}),
        this.bs.getAccessibilityForGrid({gridId: 'hetpri', cutoff: isochroneCutoff}),
        this.bs.getAccessibilityForGrid({gridId: 'hetsec', cutoff: isochroneCutoff}),
        this.bs.getAccessibilityForGrid({gridId: 'hetter', cutoff: isochroneCutoff}),
      ]);
      return {accessibility, isochrone, accessibility3060, accessibility6075, accessibility7590,
        accessibilitynorank, accessibilitypri, accessibilitysec, accessibilityter, key: uuid.v4()}
    }

  }


  componentDidMount() {
    this.fetchMetadata();
  }

  componentDidUpdate(nextState) {
    if (this.state.accessibility !== nextState.accessibility) {
      this.props.changeGridNumber([this.state.accessibility, this.state.accessibility2, this.state.accessibility3060,
        this.state.accessibility23060, this.state.accessibility6075, this.state.accessibility26075, this.state.accessibility7590, this.state.accessibility27590,
        this.state.accessibilitynorank, this.state.accessibility2norank, this.state.accessibilitypri, this.state.accessibility2pri, this.state.accessibilitysec, this.state.accessibility2sec, this.state.accessibilityter, this.state.accessibility2ter])
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.currentTimeFilter !== nextProps.currentTimeFilter & this.state.key != null) {
      this.changeIsochroneCutoff(nextProps.currentTimeFilter);
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
        accessibility3060: null, accessibility6075: null, accessibility7590: null,
        accessibilitynorank: null, accessibilitypri: null, accessibilitysec: null, accessibilityter: null,
        accessibility23060: null, accessibility26075: null, accessibility27590: null,
        accessibility2norank: null, accessibility2pri: null, accessibility2sec: null, accessibility2ter: null,
        accessibility2: null,
      });
    }

    if (this.props.updateButtonState !== nextProps.updateButtonState) {
      this.updateRequest();
      this.updateScneario();
    }
  }


  updateRequest() {
    let staticRequest = this.state.staticRequest;
    let scenarioJSON = [];
    let scenarioStore = this.props.scenarioStore[1];

    if (!scenarioStore.A.active){
      scenario2018.modifications.forEach(function (route) {
        scenarioJSON.push(route);
      });
    }

    if (!scenarioStore.B.active){
      scenarioL7.modifications.forEach(function (route) {
        scenarioJSON.push(route);
      });
    }

    if (!scenarioStore.C.active){
      scenarioTLC.modifications.forEach(function (route) {
        scenarioJSON.push(route);
      });
    }

    if (!scenarioStore.D.active){
      scenarioTBi.modifications.forEach(function (route) {
        scenarioJSON.push(route);
      });
    }



    staticRequest.request.scenario.modifications = scenarioJSON;
    staticRequest.request.scenario.id = uuid.v4();

    this.setState({
      staticRequest,
    });

  }


  render() {
    let {isochrone, isochrone2, key, key2, origin} = this.state;

    const position = [MapLat, MapLng];
    return (
      <div className={s.map}>
        <Map center={position} zoom={12} detectRetina zoomControl={false} ref='map' minZoom={10} maxZoom={15}>
          <ZoomControl position="bottomleft"/>


          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />


          { isochrone && <GeoJson
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


          { this.props.isCompareMode && isochrone2 && <GeoJson
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
          this.props.scenarioStore[1].A.active  &&
          <GeoJson data={GeojsonL3} key={"L3"} style={{
          color: CorridorInfo["A"].color,
          weight: 8,
          opacity: 1
          }}
          />
          }

          {
            this.props.scenarioStore[1].A.active  &&
            <GeoJson data={GeojsonL6} key={"L6"} style={{
              color: CorridorInfo["A"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }


          {
            this.props.scenarioStore[1].A.active  &&
            <GeoJson data={GeojsonMNA} key={"MNA"} style={{
              color: CorridorInfo["A"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }



          {
            this.props.scenarioStore[1].B.active  &&
            <GeoJson data={GeojsonL7} key={"L7"} style={{
              color: CorridorInfo["B"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }

          {
            this.props.scenarioStore[1].C.active  &&
            <GeoJson data={GeojsonTLC} key={"TLC"} style={{
              color: CorridorInfo["C"].color,
              weight: 8,
              opacity: 1
            }}
            />
          }

          {
            this.props.scenarioStore[1].D.active  &&
            <GeoJson data={GeojsonTele} key={"Tele"} style={{
              color: CorridorInfo["D"].color,
              weight: 8,
              opacity: 1
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
    currentCorridor: state.reducer.currentCor,
    currentBusline: state.BuslineSelectedStore,
    updateButtonState: state.updateButtonState,
    scenarioStore: state.scenarioStore,
    emailStore: state.emailStore,

  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ScenarioMap);


