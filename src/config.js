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
export const MapLat =  37.773972;

/** Center longitude of map
 * @type {number} MapLat
 */
export const MapLng = -122.431297;

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
  "A": {"name": "VN", "color": "#555555", "id": "A", fullName:"Van Ness"},
  "B": {"name": "GR", "color": "#2eadd3", "id": "B",fullName:"Geary"},
  "C": {"name": "GN", "color": "#8d6aa8", "id": "C", fullName:"Geneva" },
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
export const INIT_ORIGIN = [37.773972, -122.431297];
export const INIT_DESTINATION = [37.783972, -122.421297];
export const WORKER_VERSION = 'v2.0.0-SNAPSHOT';
export const API_KEY_ID = "3158ID11NHODSZ2BZX1WY1R4G";
export const API_KEY_SECRET = "5+XSmtvA6ZEL5wneeTtOnuk+S8bCVPZs0k2H55GTT7k";
export const TRANSPORT_NETWORK_ID = "b421029057a917b425caeea3f902fb9f";  // SF



export const BASE_URL = "http://coaxs.mit.edu/api/single";
export const AUTH_URL = "http://coaxs.mit.edu/oauth/token";
export const GRID_URL = "https://s3.amazonaws.com/coaxsus/SF/SFw_totjobs.grid";



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


