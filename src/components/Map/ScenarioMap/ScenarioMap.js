import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, TileLayer, GeoJson, ZoomControl} from 'react-leaflet';
import {
  responseToSurface,
  computeIsochrone,
  computeSingleValuedSurface,
  changeIsochroneCutoff,
  computeAccessibility,
  processGrid,
  updateModification,
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

import uuid from 'uuid';

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
  PROJECT_ID,
  GRID_REGION_ID,
  GRID_NAME,
  BaselineRequest,
  NewScenarioRequest,
  API_URL,
  GRID_URL,
} from '../../../config'

class ScenarioMap extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: null,
      modifications: null,
      origin: {lat: MapLat, lng: MapLng},
      surface: null,
      surface2: null,
      singleValuedSurface: null,
      singleValuedSurface2: null,
      isochrone: null,
      isochrone2: null,
      key: null,
      key2: null,
      opportunityValue: null,
      opportunityValue2: null,
    };

    this.moveOrigin = this.moveOrigin.bind(this);
    this.updateScneario = this.updateScneario.bind(this);
  }

  componentDidMount() {
    // fetch the opportunity grid file first
    this.props.changeProgress(0.2);
    fetch(GRID_URL, {
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
      .then(res => {
        this.props.changeProgress(0.6);
        return res.json();
      })
      .then(res => fetch(res.url, {method: 'GET',}))
      .then(res => {
        this.props.changeProgress(0.8);
        return res.arrayBuffer();
      })
      .then(grid => {
        this.setState({grid: processGrid(grid)});
        this.props.changeProgress(1);
      });
  }

  componentWillReceiveProps(nextProps) {
    // when time cut off change
    if (this.props.currentTimeFilter !== nextProps.currentTimeFilter && this.state.key !== null) {
      let isochrone = changeIsochroneCutoff(nextProps.currentTimeFilter, this.state.singleValuedSurface);
      let opportunityValue = computeAccessibility(this.state.surface, this.props.currentTimeFilter, this.state.grid);
      this.setState({isochrone, opportunityValue, key: uuid.v4()});
      if (this.props.isCompareMode) {
        let isochrone2 = changeIsochroneCutoff(nextProps.currentTimeFilter, this.state.singleValuedSurface2);
        let opportunityValue2 = computeAccessibility(this.state.surface2, this.props.currentTimeFilter, this.state.grid);
        this.setState({isochrone2, opportunityValue2, key2: uuid.v4()});
      }
      this.props.changeGridNumber([this.state.opportunityValue, this.state.opportunityValue2]);
    }

    // when toggle between the "view the baseline" and "compare with baseline"
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

    // when push the update button
    if (this.props.updateButtonState !== nextProps.updateButtonState) {
      this.updateScneario();
    }
  }


  moveOrigin(e) {
    let origin = e.target.getLatLng();
    this.setState({
      ...this.state,
      origin,
      surface: null,
      surface2: null,
      isochrone: null,
      isochrone2: null,
      opportunityValue: null,
      opportunityValue2: null,
    });

    if (this.props.isCompareMode) {
      this.props.changeProgress(0.2);
      updateModification(PROJECT_ID, this.props.headwayStore)
        .then(() => {
          this.props.changeProgress(0.4);
          return fetch(API_URL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                ...NewScenarioRequest,
                fromLat: origin.lat,
                fromLon: origin.lng,
              }
            )
          })
        })
        .then(res => res.arrayBuffer())
        .then(buff => responseToSurface(buff))
        .then(surface => {
          this.props.changeProgress(0.7);
          let singleValuedSurface2 = computeSingleValuedSurface(surface);
          let opportunityValue2 = computeAccessibility(surface, this.props.currentTimeFilter, this.state.grid);
          this.setState({
            surface2: surface,
            singleValuedSurface2,
            isochrone2: computeIsochrone(singleValuedSurface2, this.props.currentTimeFilter),
            opportunityValue2,
            key2: uuid.v4()
          });
          this.props.changeGridNumber([this.state.opportunityValue, this.state.opportunityValue2]);
          this.props.changeProgress(1);
        })
    }

    fetch(API_URL, {
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
          isochrone: computeIsochrone(singleValuedSurface, this.props.currentTimeFilter),
          opportunityValue,
          key: uuid.v4()
        });
        this.props.changeGridNumber([this.state.opportunityValue, this.state.opportunityValue2]);
      })
  };

  updateScneario() {
    let {origin} = this.state;
    this.setState({
      ...this.state,
      surface: null,
      surface2: null,
      isochrone: null,
      isochrone2: null,
      opportunityValue: null,
      opportunityValue2: null,
    });

    if (this.props.isCompareMode) {
      this.props.changeProgress(0.2);
      updateModification(PROJECT_ID, this.props.headwayStore)
        .then(() => {
          this.props.changeProgress(0.4);
          return fetch(API_URL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                ...NewScenarioRequest,
                fromLat: origin.lat,
                fromLon: origin.lng,
              }
            )
          })
        })
        .then(res => res.arrayBuffer())
        .then(buff => responseToSurface(buff))
        .then(surface => {
          this.props.changeProgress(0.7);
          let singleValuedSurface2 = computeSingleValuedSurface(surface);
          let opportunityValue2 = computeAccessibility(surface, this.props.currentTimeFilter, this.state.grid);
          this.setState({
            surface2: surface,
            singleValuedSurface2,
            isochrone2: computeIsochrone(singleValuedSurface2, this.props.currentTimeFilter),
            opportunityValue2,
            key2: uuid.v4()
          });
          this.props.changeGridNumber([this.state.opportunityValue, this.state.opportunityValue2]);
          this.props.changeProgress(1);
        })
    }

    fetch(API_URL, {
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
          isochrone: computeIsochrone(singleValuedSurface, this.props.currentTimeFilter),
          opportunityValue,
          key: uuid.v4()
        });
        this.props.changeGridNumber([this.state.opportunityValue, this.state.opportunityValue2]);
      })
  };

  render() {
    let {isochrone, isochrone2, key, key2, origin} = this.state;

    return (
      <div className={s.map}>
        <Map center={[MapLat, MapLng]} zoom={ZoomLevel} detectRetina zoomControl={false} ref='map' minZoom={12}
             maxZoom={15}>
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
    isCompareMode: state.isCompare.isCompare,
    currentCorridor: state.currentCorridorStore.currentCor,
    currentBusline: state.BuslineSelectedStore,
    updateButtonState: state.updateButtonState,
    emailStore: state.emailStore,
    headwayStore: state.HeadwayTime,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ScenarioMap);


