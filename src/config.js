/**
 * Created by xinzheng on 1/21/17.
 */


//Intro panel
/** Introduction title on the left
 * @type {string} IntroTitle
 */
export const IntroTitle = "CoAXs | Santiago";

/** Introduction description on the left
 * @type {string} IntroDescription
 */
export const IntroDescription = "Showing door-to-door travel, with public transit Wednesday morning schedule as the baseline";

//Map
/** Center latitude of map
 * @type {number} MapLat
 */
export const MapLat =  -33.4489;

/** Center longitude of map
 * @type {number} MapLat
 */
export const MapLng =  -70.5993;

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
  "A": {"name": "2018", "color": "#2eadd3", "id": "A", fullName:"2018"},
  "B": {"name": "L7", "color": "#555555", "id": "B",fullName:"L7"},
  "C": {"name": "TLC", "color": "#8d6aa8", "id": "C", fullName:"TLC" },
  "D": {"name": "TBi", "color": "#37bf86", "id": "D", fullName:"TBi" }
};


export const FormControlID = {
  ptpEntry: "control28770765",
  singleEntry: "control28947061",
  exit: "control28766436",
};


//Browsochrone configuration
export const INIT_ORIGIN = [-33.4489, -70.5993];
export const INIT_DESTINATION = [-33.4889, -70.5393];
export const WORKER_VERSION = 'v2.0.0-SNAPSHOT';
export const API_KEY_ID = "3158ID11NHODSZ2BZX1WY1R4G";
export const API_KEY_SECRET = "5+XSmtvA6ZEL5wneeTtOnuk+S8bCVPZs0k2H55GTT7k";
// export const TRANSPORT_NETWORK_ID = "b421029057a917b425caeea3f902fb9f";  // SF
// export const TRANSPORT_NETWORK_ID = "1c39a5be72ec603982833f880a785aa7";  // ATL
export const TRANSPORT_NETWORK_ID = "e696afc57b8b4ca6f18f8c74944e16c4";  // STG




export const BASE_URL = "http://coaxs.mit.edu/api/single";
export const AUTH_URL = "http://coaxs.mit.edu/oauth/token";
export const GRID_URL = "https://s3.amazonaws.com/coaxsus/STG/stgJobjobs_sum.grid";
// export const GRID_URL = "https://s3.amazonaws.com/coaxsus/ATL/ALTr_totjobs.grid";



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


