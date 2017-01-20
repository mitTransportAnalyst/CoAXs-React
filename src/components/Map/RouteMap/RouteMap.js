import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import s from "./RouteMap.css"


class RouteMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 5,
      lng: 5,
      zoom: 13,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} className={s.map}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

      </Map>
    );
  }
}

export default RouteMap;
