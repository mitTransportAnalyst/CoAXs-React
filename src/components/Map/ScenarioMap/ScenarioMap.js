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
  NetworkInfo,
  CorridorInfo,
  PROJECT_ID,
  GRID_REGION_ID,
  GRID_NAME,
  BaselineRequest,
  NewScenarioRequest,
  API_URL,
  GRID_URL
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
      // this.props.changeProgress(0.2);
      // updateModification(PROJECT_ID, this.props.headwayStore)
      //   .then(() => {
      //     this.props.changeProgress(0.4);
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
          // })
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
        <Map id='coaxsmap' center={[MapLat, MapLng]} zoom={ZoomLevel} detectRetina zoomControl={false} ref='map' minZoom={12}
             maxZoom={15}>
          <ZoomControl position="bottomleft"/>
          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {//thiago - retrieves style information directly from settings within config.js
            Object.values(NetworkInfo).map((network, idx1) => {
                var currNetworkData = network.data
                return (<GeoJson data={currNetworkData} key={network.name} style={{
                  color: network.color,
                  weight: network.weight,
                  opacity: network.opacity
                }}
              />)
            })
          }
          {//jleape display corridors
            Object.values(CorridorInfo).map((corridor, idx1) => {
              // var currCorridorData = corridor[idx1].data
              console.log(corridor.data);
              return (<GeoJson data={corridor.data} key={corridor.name} style={{
                color: corridor.color,
                weight: corridor.weightOn,
                opacity: corridor.opacityOn
              }}
            />)
          })
          }
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
          {/* { //thiago - retrieves style information directly from settings within config.js
            Object.values(CorridorInfo).map((corridor, idx1) => {
              // let geojsonBusLines = ''
              // let geojsonBusLinesInc = ''
              // return (corridor.buslines.map((busline, idx2) => {
              return (corridor.map((corridor, idx2) => {
              let currCorridor = corridor[idx2].key
              let currCorridorData = corridor.buslines[idx2].data
              //console.log(this.props.currentCorridor, corridor.id, this.props.currentBusline[corridor.id], currBusLine);
              if (this.props.currentCorridor === corridor.id) //jleape && this.props.currentBusline[corridor.id] === currBusLine)
                {
                  //jleape let currBusLineKey = currBusLine + "1"
                  //console.log(currBusLineData)
                  //console.log(currBusLine)
                    return (<GeoJson data={currBusLineData} key={currBusLineKey} style={{
                    color: corridor.color,
                    weight: corridor.weightOn,
                    opacity: corridor.opacityOn
                  }}
                />)
                }
                else {
                  let currBusLineKey = currBusLine + "2"
                  return(<GeoJson data={currBusLineData} key={currBusLineKey} style={{
                    color: corridor.color,
                    weight: corridor.weightOff,
                    opacity: corridor.opacityOff
                  }}
                />)
              }
            }))
            })
          } */}



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
