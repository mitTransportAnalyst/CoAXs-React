import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import s from "./RouteMap.css"
import {MapLat, MapLng, ZoomLevel, Tile} from "../../../config"

class RouteMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: MapLat,
      lng: MapLng,
      zoom: ZoomLevel,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className={s.map}>
        <Map center={position} zoom={ZoomLevel}>
          <TileLayer
            url={Tile}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

        </Map>
      </div>
    );
  }
}

export default RouteMap;
