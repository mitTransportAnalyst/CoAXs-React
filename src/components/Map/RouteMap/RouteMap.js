import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import s from "./RouteMap.css"

class RouteMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 42.36,
      lng: -71,
      zoom: 13,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className={s.map}>
        <Map center={position} zoom={13}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/ctrob/civ2rkezr00042ilnogrj4zjm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Ryb2IiLCJhIjoiY2lrZTh5ajZkMDAzcnZmbHo4ZzBjdTBiaSJ9.vcZYiN_V3wV-VS3-KMoQdg'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

        </Map>
      </div>
    );
  }
}

export default RouteMap;
