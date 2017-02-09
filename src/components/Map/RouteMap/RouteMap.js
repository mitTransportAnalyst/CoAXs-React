import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer,GeoJSON } from 'react-leaflet';
import s from "./RouteMap.css"
import {MapLat, MapLng, ZoomLevel, Tile} from "../../../config"
import {TrunkByID} from '../../../Data/LoadData'

import TrunkData from '../../../Data/trunks.geojson'



class RouteMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: MapLat,
      lng: MapLng,
      zoom: ZoomLevel,
      marker: {
        lat: 42.355,
        lng: -71.065556,
      },
    };

    this.updatePosition = this.updatePosition.bind(this)
  }



  componentDidMount(){
    // console.log(this.refs.foo);

  }


  updatePosition ()  {
    console.log("fafaf");
    const { lat, lng } = this.refs.marker.leafletElement.getLatLng();
    this.setState({
      marker: {lat, lng},
    })
  }

  render() {
    const allTrunk = Object.values(TrunkByID);
    const position = [this.state.lat, this.state.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]

    return (
      <div >
        <Map ref="foo" center={position} zoom={ZoomLevel}>
          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />








          {allTrunk.map((value) => value )}


        </Map>
      </div>
    );
  }
}

export default RouteMap;
