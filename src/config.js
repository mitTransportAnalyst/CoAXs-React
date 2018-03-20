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
import GeojsonExisting from './Data/busline/Existing.geojson'
import Geojson2B from './Data/busline/Line2B.geojson'

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

const ENVIRONMENT = "DEV";    //"DEV" for development mode. change to "PROD" when you build and push to Heroku

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
export const Tile = 'https://api.mapbox.com/styles/v1/ctrob/civ2rkezr00042ilnogrj4zjm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Ryb2IiLCJhIjoiY2lrZTh5ajZkMDAzcnZmbHo4ZzBjdTBiaSJ9.vcZYiN_V3wV-VS3-KMoQdg';

export const GRID_REGION_ID = "ae8ce7fb-3967-4910-af09-5cc93ecaf60e";

export const GRID_NAME = "TZjobs_Tot_Jobs";//Get this from Conveyal analysis, use the file name when click "download .grid file"

export const PROJECT_ID = "5a9ea55c896fd02e4fd761c4";

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
    "Existing": {
      name: "Existing",
      color: "#f1d3e9",
      weight: 1,
      opacity: 0.5,
      data: GeojsonExisting
    },
    "Line2B": {
      name: "Line2B",
      color: "#f1d3e9",
      weight: 1,
      opacity: 0.5,
      data: Geojson2B
    }
  }

 //Corridor info
 /** Corridor info
  * @type {object} CorridorInfo
  * @property {string} name - corridor name {string} color - corridor color on the map and corridor table {string} id - corridor ID
  */
  export const CorridorInfo = {
    A: {
      name: "2B",
      color: "#555555",
      id: "A",
      fullName: "Line2B Scenarios",
      buslines: [
        { key: "Existing", name: "No Line2B", data: GeojsonExisting, scenarioData: jsonExisting },
        { key: "2BM", name: "2B - Mixed Traffic", data: Geojson2B, scenarioData: json2BMixed },
        { key: "2BR", name: "2B - Dedicated Lane", data: Geojson2B, scenarioData: json2BROW }],
      baselineBuses: 2,
      baselineHeadwayTime: 30,
      weightOn: 8,
      weightOff: 5,
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
  "date": "2017-12-08",
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
  "workerVersion": "v3.4.1",
  "projectId": PROJECT_ID,
  "variantIndex": -1,
};

export const NewScenarioRequest = {
  "date": "2017-12-08",
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
  "workerVersion": "v3.4.1",
  "projectId": PROJECT_ID,
  "variantIndex": 0,
};



// GeoJSON files for Buslines
