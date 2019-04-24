/**
 * Created by xinzheng on 1/21/17.
 */

// Geojson files
 // import Geojson16A from './Data/busline/16A.geojson'
 // import Geojson16B from './Data/busline/16B.geojson'
 // import Geojson16C from './Data/busline/16C.geojson'
 // import GeojsonE3A from './Data/busline/E3A.geojson'
 // import GeojsonE3B from './Data/busline/E3B.geojson'
 // import GeojsonE3C from './Data/busline/E3C.geojson'
 // import GeojsonE3D from './Data/busline/E3D.geojson'
 // import GeojsonE5A from './Data/busline/E5A.geojson'
 // import GeojsonE5B from './Data/busline/E5B.geojson'
 // import GeojsonJeT from './Data/busline/JeT.geojson'
 // import GeojsonNORTA from './Data/busline/NORTA.geojson'
import GeojsonExisting from './Data/busline/baseline_trunks.geojson'
import GeojsonExiFeeder from './Data/busline/baseline_feeders.geojson'
import Geojson2B from './Data/busline/Line2B.geojson'
import GeojsonF1 from './Data/busline/feeder1.geojson'
import GeojsonF2 from './Data/busline/feeder2.geojson'
import GeojsonF3 from './Data/busline/feeder3.geojson'
import GeojsonF4 from './Data/busline/feeder4.geojson'
import GeojsonF5 from './Data/busline/feeder5.geojson'
import GeojsonF6 from './Data/busline/feeder6.geojson'

import Geojson2Bstops from './Data/busline/Line2B_stops.geojson'
import GeojsonExiStops from './Data/busline/baseline_stops.geojson'
import GeojsonF1Stops from './Data/busline/feeder1_stops.geojson'
import GeojsonF2Stops from './Data/busline/feeder2_stops.geojson'
import GeojsonF3Stops from './Data/busline/feeder3_stops.geojson'
import GeojsonF4Stops from './Data/busline/feeder4_stops.geojson'
import GeojsonF5Stops from './Data/busline/feeder5_stops.geojson'
import GeojsonF6Stops from './Data/busline/feeder6_stops.geojson'
// Scenario files
 // import json16A from "./Data/scenario/16A.json"
 // import json16B from "./Data/scenario/16B.json"
 // import json16C from "./Data/scenario/16C.json"
 // import jsonE3A from "./Data/scenario/E3A.json"
 // import jsonE3B from "./Data/scenario/E3B.json"
 // import jsonE3C from "./Data/scenario/E3C.json"
 // import jsonE3D from "./Data/scenario/E3D.json"
 // import jsonE5A from "./Data/scenario/E5A.json"
 // import jsonE5B from "./Data/scenario/E5B.json"
import jsonExisting from "./Data/scenario/Existing.json"
import json2BMixed from "./Data/scenario/Line2B_Mixed.json"
import json2BROW from "./Data/scenario/Line2B_ROW.json"

const ENVIRONMENT = "PROD";    //"DEV" for development mode. change to "PROD" when you build and push to Heroku

/** Introduction title on the left
 * @type {string} IntroTitle
 */
export const IntroTitle = "CoAXs | Pretoria";

//Map
/** Center latitude of map
 * @type {number} MapLat
 */
export const MapLat = -25.747096; //Pretoria
// export const MapLat = 29.971065; //NOLA

/** Center longitude of map
 * @type {number} MapLat
 */
export const MapLng = 28.228373; //Pretoria
// export const MapLng = -90.111533; //NOLA

/** zoom level of map
 * @type {number} ZoomLevel
 */
export const ZoomLevel = 13;

/** Map base tile
 * @type {string} Tile
 */
export const Tile = 'https://api.mapbox.com/styles/v1/ctrob/cjivrlmdj13zm2rpfz067fvex/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Ryb2IiLCJhIjoiY2lrZTh5ajZkMDAzcnZmbHo4ZzBjdTBiaSJ9.vcZYiN_V3wV-VS3-KMoQdg';

// export const GRID_REGION_ID = "ae8ce7fb-3967-4910-af09-5cc93ecaf60e";
//
// export const GRID_NAME = "Jobs_Jobs_0326";//Get this from Conveyal analysis, use the file name when click "download .grid file"
// Use the _id value for the desired opportunity dataset, which  can be determined by inspecting the response to a request to load the Opportunity Dataset page in Conveyal Analysis.
export const OPPORTUNITY_DATASET_ID = "5b6afe1f50c63e060453b252"

export const PROJECT_ID = "5ab914c5896fd02e6b156a9d"; //Pretoria_0326
// export const PROJECT_ID = "5a9ea55c896fd02e4fd761c4"; //Pretoria_0307

//Thiago - Network info
/** Network info
 * @type {object} NetworkInfo
 * @property {string} name - corridor name {string} color - corridor color on the map and corridor table {string} id - corridor ID
 */

// export const NetworkInfo = {
//    "JeT": {
//      name: "JeT",
//      color: "#f1d3e9",
//      weight: 1,
//      opacity: 0.5,
//      data: GeojsonJeT
//    },
//    "NORTA": {
//      name: "NORTA",
//      color: "#f1d3e9",
//      weight: 1,
//      opacity: 0.5,
//      data: GeojsonNORTA
//    }
//  }

 export const NetworkInfo = {
    "Existing BRT Trunk": {
      name: "Existing BRT Trunks",
      color: "#60879b",
      weight: 4,
      opacity: 0.75,
      data: GeojsonExisting,
      data_s: GeojsonExiStops
    },
    "Existing BRT Feeders": {
      name: "Existing Feeders",
      color: "#8aafbe",
      weight: 2,
      opacity: 0.75,
      data: GeojsonExiFeeder
    }
  }

 //Corridor info
 /** Corridor info
  * @type {object} CorridorInfo
  * @property {string} name - corridor name {string} color - corridor color on the map and corridor table {string} id - corridor ID
  */
  export const CorridorInfo = {
    A: {
      name: "2B Trunk",
      color: "#8f85b5",
      id: "A",
      fullName: "Line2B Trunk",
      buslines: [
        { key: "Existing", name: "No Line2B", data: null, data_s: null},
        { key: "2BM", name: "2B - Mixed Traffic", data: Geojson2B, data_s: Geojson2Bstops},
        { key: "2BR", name: "2B - Dedicated Lane", data: Geojson2B, data_s: Geojson2Bstops}],
      baselineBuses: 2,
      baselineHeadwayTime: 30,
      weightOn: 6,
      weightOff: 3,
      opacityOn: 1,
      opacityOff: 0.5
    },
    B: {
      name: "2B Feeders",
      color: "#c48bcb",
      id: "B",
      fullName: "Line2B Feeders",
      buslines: [
        { key: "F1", name: "Feeder 1", data: GeojsonF1, data_s: GeojsonF1Stops},
        { key: "F2", name: "Feeder 2", data: GeojsonF2, data_s: GeojsonF2Stops},
        { key: "F3", name: "Feeder 3", data: GeojsonF3, data_s: GeojsonF3Stops},
        { key: "F4", name: "Feeder 4", data: GeojsonF4, data_s: GeojsonF4Stops},
        { key: "F5", name: "Feeder 5", data: GeojsonF5, data_s: GeojsonF5Stops},
        { key: "F6", name: "Feeder 6", data: GeojsonF6, data_s: GeojsonF6Stops}],
      baselineBuses: 4,
      baselineHeadwayTime: 24,
      weightOn: 4,
      weightOff: 2,
      opacityOn: 1,
      opacityOff: 0.5
    }
  }
// export const CorridorInfo = {
//   A: {
//     name: "16",
//     color: "#555555",
//     id: "A",
//     fullName: "RTA #16 S. Claiborne",
//     buslines: [
//       { key: "16A", name: "16A - Current Route", data: Geojson16A, scenarioData: json16A },
//       { key: "16B", name: "16B - Ext to Ochsner", data: Geojson16B, scenarioData: json16B },
//       { key: "16C", name: "16C - Ext to Clearview", data: Geojson16C, scenarioData: json16C }],
//     baselineBuses: 2,
//     baselineHeadwayTime: 30,
//     weightOn: 8,
//     weightOff: 5,
//     opacityOn: 1,
//     opacityOff: 0.5
//     },
//   B: {
//     name: "E3",
//     color: "#2eadd3",
//     id: "B",
//     fullName: "JeT #E3 Kenner Local",
//     buslines: [
//       { key: "E3A", name: "E3A - Current Route", data: GeojsonE3A, scenarioData: jsonE3A },
//       { key: "E3B", name: "E3B - Ext ot Orleans", data: GeojsonE3B, scenarioData: jsonE3B },
//       { key: "E3C", name: "E3C - COA Re-route", data: GeojsonE3C, scenarioData: jsonE3C },
//       { key: "E3D", name: "E3D - Short turn to Ochsner", data: GeojsonE3D, scenarioData: jsonE3D }],
//     baselineBuses: 4,
//     baselineHeadwayTime: 24,
//     weightOn: 8,
//     weightOff: 5,
//     opacityOn: 1,
//     opacityOff: 0.5
//     },
//   C: {
//     name: "E5",
//     color: "#8d6aa8",
//     id: "C",
//     fullName: "JeT #E5 Causeway ",
//     buslines: [
//       { key: "E5A", name: "E5A - Current route", data: GeojsonE5A, scenarioData: jsonE5A },
//       { key: "E5B", name: "E5B - Ext to Ochsner", data: GeojsonE5B, scenarioData: jsonE5B }],
//     baselineBuses: 3,
//     baselineHeadwayTime: 27,
//     weightOn: 8,
//     weightOff: 5,
//     opacityOn: 1,
//     opacityOff: 0.5
//     }
// }

// to be deprecated
export const BaselineBuses = {
  A: 2,
  B: 4,
  C: 3,
};

//Conveyal API request configurations
export const API_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/api" : "/api";
export const GRID_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/grid" : "/grid";
export const GET_MODIFICATIONS_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/getModifications" : "/getModifications";
export const UPDATE_MODIFICATIONS_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/updateModifications" : "/updateModifications";

export const BaselineRequest = {
  "date": "2018-03-26",
  "fromTime": 25200,
  "toTime": 32400,
  "accessModes": "WALK",
  "directModes": "WALK",
  "egressModes": "WALK",
  "transitModes": "BUS,TRAM,RAIL,SUBWAY",
  "walkSpeed": 1.3888888888888888,
  "bikeSpeed": 4.166666666666667,
  "monteCarloDraws": 200,
  "maxRides": 4,
  "fromLat": 29.98646043083785,
  "fromLon": -90.13526916503908,
  "percentiles": [5, 25, 50, 75, 95],
  "workerVersion": "v4.0.0",
  "projectId": PROJECT_ID,
  "variantIndex": 0, //-1: baseline on Analysis, 0: Scenario 1, 1: Scenario 2
};

export const NewScenarioRequest = {
  "date": "2018-03-26",
  "fromTime": 25200,
  "toTime": 32400,
  "accessModes": "WALK",
  "directModes": "WALK",
  "egressModes": "WALK",
  "transitModes": "BUS,TRAM,RAIL,SUBWAY",
  "walkSpeed": 1.3888888888888888,
  "bikeSpeed": 4.166666666666667,
  "monteCarloDraws": 200,
  "maxRides": 4,
  "fromLat": 29.98646043083785,
  "fromLon": -90.13526916503908,
  "percentiles": [5, 25, 50, 75, 95],
  "workerVersion": "v4.0.0",
  "projectId": PROJECT_ID,
  "variantIndex": 1,
};



// GeoJSON files for Buslines
