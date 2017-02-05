/**
 * Created by xinzheng on 2/1/17.
 */

import React from 'react';
import { render } from 'react-dom';
import {GeoJson} from 'react-leaflet';
import ProposedData from './proposed.geojson'
import TrunkData from './trunks.geojson'
import CorridorData from './corridors.json'



const corridorInfo = {
  "A" : {"name" : "Mass Ave", "color":"#555555", "id":"A"},
  "B" : {"name" : "N. Washington St", "color":"#7DD5ED", "id":"B"},
  "C" : {"name" : "HuntingTon Ave", "color":"#F3E05E", "id":"C"},
  "D" : {"name" : "Roslindale/Forest Hills", "color":"#E092DF", "id":"D"},
  "E" : {"name" : "Blue Hill Ave", "color":"#8D6AA8", "id":"E"},
};


const corridorColor = {
  "A" : "#555555",
  "B" : "#7DD5ED",
  "C" : "#F3E05E",
  "D" : "#E092DF",
  "E" : "#8D6AA8",
};



//load trunk and push them into a dict by corridor ID
const TrunkByID = {};
let counter = 0;
for (let trunk of TrunkData.features){
    TrunkByID[trunk.properties.corridorId] =
    <GeoJson data={trunk} key = {counter} style={{
      color : corridorColor[trunk.properties.corridorId],
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


export {TrunkByID, RouteByID, corridorInfo, corridorColor};




