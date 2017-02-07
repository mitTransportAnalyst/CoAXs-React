/**
 * Created by xinzheng on 1/21/17.
 */


//Intro panel
/** Introduction title on the left
 * @type {string} IntroTitle
 */
export const IntroTitle = "CoAXs | Bus Priority";

/** Introduction description on the left
 * @type {string} IntroDescription
 */
export const IntroDescription = "Showing door-to-door travel, with MBTA weekday morning schedule as baseline.";

//Map
/** Center latitude of map
 * @type {number} MapLat
 */
export const MapLat = 42.36;

/** Center longitude of map
 * @type {number} MapLat
 */
export const MapLng = -71.1;

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
  "A": {"name": "Mass Ave", "color": "#555555", "id": "A"},
  "B": {"name": "N. Washington St", "color": "#7DD5ED", "id": "B"},
  "C": {"name": "HuntingTon Ave", "color": "#F3E05E", "id": "C"},
  "D": {"name": "Roslindale/Forest Hills", "color": "#E092DF", "id": "D"},
  "E": {"name": "Blue Hill Ave", "color": "#8D6AA8", "id": "E"},
};


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



