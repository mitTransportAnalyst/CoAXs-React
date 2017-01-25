/**
 * Created by xinzheng on 1/21/17.
 */

//Intro panel
export const IntroTitle = "CoAXs | Bus Priority";
export const IntroDescription = "Showing door-to-door travel, with MBTA weekday morning schedule as baseline.";

//Map
export const MapLat = 42.36;
export const MapLng = -71;
export const ZoomLevel = 13;
export const Tile = 'https://api.mapbox.com/styles/v1/ctrob/civ2rkezr00042ilnogrj4zjm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Ryb2IiLCJhIjoiY2lrZTh5ajZkMDAzcnZmbHo4ZzBjdTBiaSJ9.vcZYiN_V3wV-VS3-KMoQdg';

//Mode
export const PointToPoint = true;
export const Accessibility = true;


//Service Editor
//Running Time
export const RunningTime = false;
export const RunningTimeMin = 0;
export const RunningTimeMax = 60;
export function modifySpeed(corridorId,scale,cb) {
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
export function ModifyDwells(corridorId,scale,cb){
  $http.get('/load/scenario/'+corridorId)
    .success(function (data, status) {
      var scenarioJSON = [];
      data.modifications.forEach(function(route){
          if (route.type === "adjust-dwell-time"){
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
export function modifyHeadway(corridorId,scale,cb) {
  $http.get('/load/scenario/'+corridorId)
    .success(function (data, status) {
      var scenarioJSON = [];
      data.modifications.forEach(function(route){
          if (route.type === "adjust-frequency"){
            route.entries.forEach(function (entry) {
              entry.headwaySecs = entry.headwaySecs*scale ;
            });
            scenarioJSON.push(route);
          }
        }
      );
      cb(scenarioJSON)
    })
};



