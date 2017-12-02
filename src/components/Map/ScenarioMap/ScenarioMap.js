import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer, GeoJson, ZoomControl, MapLayer} from 'react-leaflet';
import Leaflet from 'leaflet'

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
  isPTP,
  INIT_ORIGIN,
  INIT_DESTINATION,
  WORKER_VERSION,
  API_KEY_ID,
  API_KEY_SECRET,
  TRANSPORT_NETWORK_ID,
  BASE_URL,
  AUTH_URL,
  GRID_URL
} from '../../../config'

/** how often will we allow the isochrone to update, in milliseconds */
const MAX_UPDATE_INTERVAL_MS = 50; // seems smooth on 2017 Macbook Pro

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
      origin: {lat: MapLat, lng: MapLng},
      destination: INIT_DESTINATION,
      originGrid: null,

      preRequest: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2017-04-18',
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
          monteCarloDraws: 720,
          scenario: {id: 999},
        }
      },
      staticRequest: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2017-04-18',
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
          monteCarloDraws: 720,
          scenario: {
            id: uuid.v4(), modifications: Baseline.modifications
          },
        }
      },
      staticRequestBase: {
        jobId: uuid.v4(),
        transportNetworkId: TRANSPORT_NETWORK_ID,
        request: {
          date: '2017-04-18',
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
          monteCarloDraws: 720,
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

    this.bs = new Browsochrones({webpack: true});
    this.bs2 = new Browsochrones({webpack: true});
  }

  componentDidMount() {
    this.fetchMetadata();
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

  async fetchMetadata() {
    this.props.changeProgress(0.2);
    let {preRequest} = this.state;
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
      })
    ])
      .then(([metadata, stopTrees, grid]) => {
        Promise.all([
          this.bs2.setQuery(metadata),
          this.bs.setQuery(metadata),

          this.bs2.setStopTrees(stopTrees.slice(0)),
          this.bs.setStopTrees(stopTrees.slice(0)),

          this.bs2.setTransitiveNetwork(metadata.transitiveData),
          this.bs.setTransitiveNetwork(metadata.transitiveData),

          this.bs2.putGrid({id: 'jobs', grid: grid}),
          this.bs.putGrid({id: 'jobs', grid: grid}),
        ]).then(() => {
            console.log("done fetch");
            this.props.changeProgress(1);
            this.setState({...this.state, loaded: true});
          }
        )
      })
  };

  moveOrigin(e) {
    if (this.props.isCompareMode) {
      let origin = e.target.getLatLng();
      console.log(origin);
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


    let origin = e.target.getLatLng();
    console.log(origin);

    let {x, y} = this.bs.latLonToOriginPoint({lat: origin.lat, lon: origin.lng});

    console.log({x, y});
    let {staticRequestBase, isochroneCutoff} = this.state;
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
        <Map center={position} zoom={12} detectRetina zoomControl={false} ref='map' minZoom={12} maxZoom={15}>
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


