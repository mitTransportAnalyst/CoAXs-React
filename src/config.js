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

//For online survey contact123
export const FormControlID = {
  ptpEntry: "control28805034",
  singleEntry: "control28770612",
  exit: "control28766436",
};

//Browsochrone configuration
export const INIT_ORIGIN = [29.951065, -90.071533];
export const INIT_DESTINATION = [29.951065, -90.078533];
export const WORKER_VERSION = 'v2.4.0';
export const TRANSPORT_NETWORK_ID = "43fd7623769a4419a7ab05937e7dd399";

export const BASE_URL = "http://coaxs.mit.edu/enqueue/single";
export const AUTH_URL = "";
export const GRID_URL = "https://s3.amazonaws.com/coaxsus/NOLA/NOLAw_totjobs.grid";

//Service Editor
//Running Time (add more modification function)
// export const RunningTime = true;
// export const RunningTimeMin = 0;
// export const RunningTimeMax = 60;

//Dwell Time
// export const DwellTime = true;
// export const DwellTimeMin = 0;
// export const DwellTimeMax = 70;

//Headway
// export const Headway = true;
// export const HeadwayMin = 0;
// export const HeadwayMax = 80;




