import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer, GeoJson, ZoomControl} from 'react-leaflet';
import {
  responseToSurface,
  computeIsochrone,
  computeSingleValuedSurface,
  changeIsochroneCutoff,
  computeAccessibility,
  processGrid,
} from "./utils"

import s from "./ScenarioMap.css"

//import busline Geojson
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

import uuid from 'uuid'
import Browsochrones from 'browsochrones'

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
  WORKER_VERSION,
  TRANSPORT_NETWORK_ID,
  BASE_URL,
  GRID_URL,
  GRID_REGION_ID,
  GRID_NAME,
  BaselineRequest,
  NewScenarioRequest,
} from '../../../config'

class ScenarioMap extends React.Component {
  constructor() {
    super();
    this.state = {
      surface: null,
      grid: null,
      singleValuedSurface: null,
      isochrone: null,
      isochrone2: null,
      key: null,
      key2: null,
      origin: {lat: MapLat, lng: MapLng},
      originGrid: null,
      opportunityValue: null,
      opportunityValueForNew: null,
    };

    this.moveOrigin = this.moveOrigin.bind(this);
    this.updateScneario = this.updateScneario.bind(this);

    this.bs = new Browsochrones({webpack: true});
    this.bs2 = new Browsochrones({webpack: true});
  }

  componentDidMount() {
    // fetch the opportunity grid file
    fetch("http://localhost:8000/grid", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          gridRegionID: GRID_REGION_ID,
          gridName: GRID_NAME,
        }
      )
    })
      .then(res => res.json())
      .then(res => fetch(res.url, {method: 'GET',}))
      .then(res => res.arrayBuffer())
      .then(grid => this.setState({grid: processGrid(grid)}))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentTimeFilter !== nextProps.currentTimeFilter && this.state.key !== null) {
      let isochrone = changeIsochroneCutoff(nextProps.currentTimeFilter, this.state.singleValuedSurface);
      let opportunityValue = computeAccessibility(this.state.surface, this.props.currentTimeFilter, this.state.grid);
      this.setState({isochrone, opportunityValue, key: uuid.v4()});
      this.props.changeGridNumber([this.state.opportunityValue, this.state.opportunityValueForNew]);
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

      //TODO
    }

    let origin = e.target.getLatLng();
    this.setState({
      ...this.state,
      origin,
      isochrone: null,
      opportunityValue: null,
    });

    fetch("http://localhost:8000/api", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          ...BaselineRequest,
          fromLat: origin.lat,
          fromLon: origin.lng,
        }
      )
    })
      .then(res => res.arrayBuffer())
      .then(buff => responseToSurface(buff))
      .then(surface => {
        let singleValuedSurface = computeSingleValuedSurface(surface);
        let opportunityValue = computeAccessibility(surface, this.props.currentTimeFilter, this.state.grid);
        this.setState({
          surface,
          singleValuedSurface,
          isochrone: computeIsochrone(singleValuedSurface, 20),
          opportunityValue,
          key: uuid.v4()
        });
        this.props.changeGridNumber([this.state.opportunityValue, this.state.opportunityValueForNew]);
      })
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
          inVehicleTravelTime: null,
          travelTime: null,
          waitTime: null
        });

        this.props.changeProgress(1);
      });


  };

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


