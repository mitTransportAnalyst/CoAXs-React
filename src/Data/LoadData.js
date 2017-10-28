/**
 * Created by xinzheng on 2/1/17.
 */

import React from 'react';
import CorridorData from './corridors.json'

import {CorridorInfo} from '../config'

//load bus routes and push them into a dict by corridor ID
const corridorInfo = CorridorInfo ;
const RouteByID = {};
for (let key of Object.keys(CorridorData)){
  RouteByID[key] = CorridorData[key];
}

export {RouteByID, corridorInfo};




