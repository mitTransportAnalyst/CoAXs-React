/**
 * Created by xinzheng on 2/1/17.
 */

import React from 'react';
import { render } from 'react-dom';
import {GeoJson} from 'react-leaflet';
import ProposedData from './proposed.geojson'
import TrunkData from './trunks.geojson'
import CorridorData from './corridors.json'

import {CorridorInfo} from '../config'

const corridorInfo = CorridorInfo ;

//load trunk and push them into a dict by corridor ID
const TrunkByID = {};
let counter = 0;
for (let trunk of TrunkData.features){
    TrunkByID[trunk.properties.corridorId] =
    <GeoJson data={trunk} key = {counter} style={{
      color : corridorInfo[trunk.properties.corridorId].color,
      weight: 10,
      opacity: 0.4 }}
    />;
  counter++;
}



//load bus routes and push them into a dict by corridor ID
const RouteByID = {};
for (let key of Object.keys(CorridorData)){
  RouteByID[key] = CorridorData[key];
}


export {TrunkByID, RouteByID, corridorInfo};




