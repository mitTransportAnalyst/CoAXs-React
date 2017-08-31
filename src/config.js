/**
 * Created by xinzheng on 1/21/17.
 */


//Intro panel
/** Introduction title on the left
 * @type {string} IntroTitle
 */
export const IntroTitle = "CoAXs | Atlanta";

/** Introduction description on the left
 * @type {string} IntroDescription
 */
export const IntroDescription = "Showing door-to-door travel, with public transit Wednesday morning schedule as the baseline";

//Map
/** Center latitude of map
 * @type {number} MapLat
 */
export const MapLat =  33.7490;

/** Center longitude of map
 * @type {number} MapLat
 */
export const MapLng =  -84.387314;

/** zoom level of map
 * @type {number} ZoomLevel
 */
export const ZoomLevel = 12;

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
  "A": {"name": "Campbellton BRT", "color": "#2eadd3", "id": "A", fullName:"Campbellton BRT"},
  "B": {"name": "Northside Drive BRT", "color": "#555555", "id": "B",fullName:"Northside Drive BRT"},
  "C": {"name": "Streetcar Extension", "color": "#8d6aa8", "id": "C", fullName:"Streetcar Extension" },
  "D": {"name": "Green Line Infill Station", "color": "#37bf86", "id": "D", fullName:"Infill Station on Green Line" },
  "E": {"name": "Red Line Infill Station", "color": "#ed4267", "id": "E", fullName:"Infill Station on Red Line" },
};


export const FormControlID = {
  ptpEntry: "control28770765",
  singleEntry: "control28947061",
  exit: "control28766436",
};


//Browsochrone configuration
export const INIT_ORIGIN = [33.7490, -84.387314];
export const INIT_DESTINATION = [33.7290, -84.377314];
export const WORKER_VERSION = 'v2.4.0';
export const TRANSPORT_NETWORK_ID = "7bf4a07ac26442919e82427f1c5c7bf6";  // ATL

export const BASE_URL = "http://coaxs.mit.edu/enqueue/single";
export const AUTH_URL = "";
export const GRID_URL = "https://s3.amazonaws.com/coaxsus/ATL/ALTw_totjobs.grid";

//Service Editor
//Running Time (add more modification function)
export const RunningTime = true;
export const RunningTimeMin = 0;
export const RunningTimeMax = 60;


//Dwell Time
export const DwellTime = true;
export const DwellTimeMin = 0;
export const DwellTimeMax = 70;


//Headway
export const Headway = true;
export const HeadwayMin = 0;
export const HeadwayMax = 80;


