/**
 * Created by xinzheng on 1/21/17.
 */


//Intro panel
/** Introduction title on the left
 * @type {string} IntroTitle
 */
export const IntroTitle = "CoAXs | New Orleans";

/** Introduction description on the left
 * @type {string} IntroDescription
 */
// export const IntroDescription = "Showing door-to-door travel, with public transit Wednesday morning schedule as the baseline";

//Map
/** Center latitude of map
 * @type {number} MapLat
 */
export const MapLat = 29.971065;

/** Center longitude of map
 * @type {number} MapLat
 */
export const MapLng = -90.111533;

/** zoom level of map
 * @type {number} ZoomLevel
 */
export const ZoomLevel = 13;

/** Map base tile
 * @type {string} Tile
 */
export const Tile = 'https://api.mapbox.com/styles/v1/ctrob/civ2rkezr00042ilnogrj4zjm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Ryb2IiLCJhIjoiY2lrZTh5ajZkMDAzcnZmbHo4ZzBjdTBiaSJ9.vcZYiN_V3wV-VS3-KMoQdg';

//Corridor info
/** Corridor info
 * @type {object} CorridorInfo
 * @property {string} name - corridor name {string} color - corridor color on the map and corridor table {string} id - corridor ID
 */
export const CorridorInfo = {
  "A": {
    name: "16",
    color: "#555555",
    id: "A",
    fullName: "RTA #16 S. Claiborne",
    buslines: ["16A - Current Route", "16B - Ext to Ochsner", "16C - Ext to Clearview"],
  },
  "B": {
    name: "E3",
    color: "#2eadd3",
    id: "B",
    fullName: "JeT #E3 Kenner Local",
    buslines: ["E3A - Current route", "E3B - Ext to Orleans", "E3C - COA Re-route", "E3D - Short turn to Ochsner"],
  },
  "C": {
    name: "E5",
    color: "#8d6aa8",
    id: "C",
    fullName: "JeT #E5 Causeway ",
    buslines: ["E5A - Current route", "E5B - Ext to Ochsner"],
  },
};

export const BaselineBuses = {
  A: 2,
  B: 4,
  C: 3,
};

//Browsochrone configuration
export const INIT_ORIGIN = [29.951065, -90.071533];
export const INIT_DESTINATION = [29.951065, -90.078533];
export const WORKER_VERSION = 'v2.4.0';
export const TRANSPORT_NETWORK_ID = "43fd7623769a4419a7ab05937e7dd399";

export const BASE_URL = "https://analysis.conveyal.com/api/analysis";
export const AUTH_URL = "";
export const GRID_URL = "https://s3.amazonaws.com/coaxsus/NOLA/NOLAw_totjobs.grid";

//Conveyal API request configurations
export const baselineRequest = {
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
  "workerVersion": "v3.2.0",
  "projectId": "5a29eca1896fd005dc77a631",
  "variantIndex": 0
};

export const newScenarioRequest = {
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
  "workerVersion": "v3.2.0",
  "projectId": "5a29eca1896fd005dc77a631",
  "variantIndex": 0
};



