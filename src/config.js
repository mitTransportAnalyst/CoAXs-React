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
export const IntroDescription = "Showing door-to-door travel, with public transit Wednesday morning schedule as the baseline";

//Map
/** Center latitude of map
 * @type {number} MapLat
 */
export const MapLat =  29.971065;

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

//Mode
/** Point to point mode switch
 * @type {boolean} PointToPoint - true: enable point to point mode, false: disable
 */
export const PointToPoint = true;

/** Accessibility mode switch
 * @type {boolean} Accessibility - true: enable accessibility mode, false: disable
 */
export const Accessibility = true;


//Corridor info
/** Corridor info
 * @type {object} CorridorInfo
 * @property {string} name - corridor name {string} color - corridor color on the map and corridor table {string} id - corridor ID
 */
export const CorridorInfo = {
  "A": {"name": "16", "color": "#555555", "id": "A", fullName:"RTA #16 S. Claiborne"},
  "B": {"name": "E3", "color": "#2eadd3", "id": "B",fullName:"JeT #E3 Kenner Local"},
  "C": {"name": "E5", "color": "#8d6aa8", "id": "C", fullName:"JeT #E5 Causeway " },
};

export const BaselineBuses = {
  A: 2,
  B: 4,
  C: 3,
};


export const FormControlID = {
  ptpEntry: "control28805034",
  singleEntry: "control28770612",
  exit: "control28766436",
};


//Browsochrone configuration
export const INIT_ORIGIN = [29.951065, -90.071533];
export const INIT_DESTINATION = [29.951065, -90.078533];
// export const LIFE_ALIVE = [42.366639, -71.105435];
export const WORKER_VERSION = 'v2.0.0-SNAPSHOT';

export const API_KEY_ID = "3158ID11NHODSZ2BZX1WY1R4G";
export const API_KEY_SECRET = "5+XSmtvA6ZEL5wneeTtOnuk+S8bCVPZs0k2H55GTT7k";
// export const TRANSPORT_NETWORK_ID = "709b3861891d5ea98975ab8317f8f270";    //boston
export const TRANSPORT_NETWORK_ID = "e2a7898e7c77962d8f747da221ee34dd";  // New Orlean
// export const TRANSPORT_NETWORK_ID = "29133beb7da12126d184c1ea771fc160";  // New Orlean2
// export const TRANSPORT_NETWORK_ID = "55d0ff78bbb333cac809636c87a973c1";  // SF
// export const TRANSPORT_NETWORK_ID = "fa8495a2edcfd9be96b809a06e587c29";  // ATLANTA




export const BASE_URL = "http://coaxs.mit.edu/api/single";
export const AUTH_URL = "http://coaxs.mit.edu/oauth/token";
export const GRID_URL = "https://s3.amazonaws.com/coaxsus/NOLA/NOLAw_totjobs.grid";



//Service Editor
//Running Time (add more modification function)
export const RunningTime = true;
export const RunningTimeMin = 0;
export const RunningTimeMax = 60;
export function modifySpeed(corridorId, scale, cb) {
  $http.get('/load/scenario/' + corridorId)
    .success(function (data, status) {
      var scenarioJSON = [];
      data.modifications.forEach(function (route) {
          if (route.type === "adjust-speed") {
            route.scale = scale;
            scenarioJSON.push(route);
          }
        }
      );
      cb(scenarioJSON)
    })
}

//Dwell Time
export const DwellTime = true;
export const DwellTimeMin = 0;
export const DwellTimeMax = 70;
export function ModifyDwells(corridorId, scale, cb) {
  $http.get('/load/scenario/' + corridorId)
    .success(function (data, status) {
      var scenarioJSON = [];
      data.modifications.forEach(function (route) {
          if (route.type === "adjust-dwell-time") {
            route.scale = scale;
            scenarioJSON.push(route);
          }
        }
      );
      cb(scenarioJSON)
    })
}

//Headway
export const Headway = true;
export const HeadwayMin = 0;
export const HeadwayMax = 80;
export function modifyHeadway(corridorId, scale, cb) {
  $http.get('/load/scenario/' + corridorId)
    .success(function (data, status) {
      var scenarioJSON = [];
      data.modifications.forEach(function (route) {
          if (route.type === "adjust-frequency") {
            route.entries.forEach(function (entry) {
              entry.headwaySecs = entry.headwaySecs * scale;
            });
            scenarioJSON.push(route);
          }
        }
      );
      cb(scenarioJSON)
    })
}



