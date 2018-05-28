/**
 * Created by xinzheng on 1/21/17.
 */

// Geojson files
import GeojsonGTFS from './Data/busline/GTFS.geojson'
import GeojsonBase from './Data/busline/Base.geojson'
import GeojsonEscenario1 from './Data/busline/Escenario1.geojson'

// 1. Talcahuano - Hualpén Tramo 1
// 2. Talcahuano - Hualpén Tramo 2
// 3. Talcahuano - Hualpén Tramo 3
// 4. Talcahuano - Hualpén Tramo 4
// 5. Autopista CCP - THNO
// 6. Palcaví
// 7. Pedro Aguirre Cerda
// 8. Corredor Coronel Tramo 1
// 9. Corredor Coronel Tramo 2
// 10. Corredor Coronel Tramo 3
// 11. Corredor Coronel Tramo 4
// 12. Corredor Chiguayante
// 13. Corredor Collao
// 14. Ruta 150
// 15. Ruta 160
// 16. Avenida Carrera
// 17. Calle O'Higgins
// 18. Calle Prat
// 19. Camilo Henríquez

// Scenario files
 import jsonBase from "./Data/scenario/Base.json"
 import jsonEscenario1 from "./Data/scenario/Escenario1.json"

const ENVIRONMENT = "DEV";    //"DEV" for development mode. change to "PROD" when you build and push to Heroku

/** Introduction title on the left
 * @type {string} IntroTitle
 */
export const IntroTitle = "CoAXs | Concepción";

//Map
/** Center latitude of map
 * @type {number} MapLat
 */
export const MapLat = -36.801566;

/** Center longitude of map
 * @type {number} MapLat
 */
export const MapLng = -73.067919;

/** zoom level of map
 * @type {number} ZoomLevel
 */
export const ZoomLevel = 13;

/** Map base tile
 * @type {string} Tile
 */
export const Tile = 'https://api.mapbox.com/styles/v1/ctrob/civ2rkezr00042ilnogrj4zjm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Ryb2IiLCJhIjoiY2lrZTh5ajZkMDAzcnZmbHo4ZzBjdTBiaSJ9.vcZYiN_V3wV-VS3-KMoQdg';

export const GRID_REGION_ID = "5ab9046b896fd02e6b156a5f";

export const GRID_NAME = "FactorExpa_Conce_trabajos"; //see analysis.conveyal.com > web inspector > Network > analysis > opportunityDatasetKey

export const PROJECT_ID = "5b037c2837ed81159a8e5db9";

//Thiago - Network info
/** Network info
 * @type {object} NetworkInfo
 * @property {string} name - corridor name {string} color - corridor color on the map and corridor table {string} id - corridor ID
 */

export const NetworkInfo = {
   "GTFS": {
     name: "GTFS",
     color: "#f1d3e9",
     weight: 1,
     opacity: 0.5,
     data: GeojsonGTFS
   }
 }

 //Corridor info
 /** Corridor info
//   * @type {object} CorridorInfo
//   * @property {string} name - corridor name {string} color - corridor color on the map and corridor table {string} id - corridor ID
//   */

export const CorridorInfo = {
  A: {
    name: "Base",
    color: "#97ceed",
    id: "A",
    fullName: "Base",
    buslines: [
      { key: "Base", name: "Base", data: GeojsonBase, scenarioData: jsonBase }],
    baselineBuses: 2,
    baselineHeadwayTime: 30,
    weightOn: 8,
    weightOff: 5,
    opacityOn: 1,
    opacityOff: 0.5
    },
  B: {
    name: "Escenario1",
    color: "#f4ba44",
    id: "B",
    fullName: "Escenario 1",
    buslines: [
      { key: "Escenario1", name: "Escenario1", data: GeojsonEscenario1, scenarioData: jsonEscenario1 }],
    baselineBuses: 4,
    baselineHeadwayTime: 24,
    weightOn: 8,
    weightOff: 5,
    opacityOn: 1,
    opacityOff: 0.5
    },
  // C: {
  //   name: "Escenario2",
  //   color: "#FFFFF",
  //   id: "C",
  //   fullName: "Escenario 2",
  //   buslines: [
  //     { key: "Escenario2", name: "Escenario2", data: GeojsonEscenario1, scenarioData: jsonEscenario1 }],
  //   baselineBuses: 4,
  //   baselineHeadwayTime: 24,
  //   weightOn: 8,
  //   weightOff: 5,
  //   opacityOn: 1,
  //   opacityOff: 0.5
  //   }
}

// to be deprecated
export const BaselineBuses = {
  A: 2,
  B: 4,
  // C: 6,
};

//Conveyal API request configurations
export const API_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/api" : "/api";
export const GRID_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/grid" : "/grid";
export const GET_MODIFICATIONS_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/getModifications" : "/getModifications";
export const UPDATE_MODIFICATIONS_URL = ENVIRONMENT === "DEV" ? "http://localhost:8000/updateModifications" : "/updateModifications";

export const BaselineRequest = {
  "date": "2017-11-10",
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
  "fromLat": -36.801566,
  "fromLon": -73.067919,
  "percentiles": [5, 25, 50, 75, 95],
  "workerVersion": "v4.0.0",
  "projectId": PROJECT_ID,
  "variantIndex": -1,
};

export const NewScenarioRequest = {
  "date": "2017-11-10",
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
  "fromLat": -36.801566,
  "fromLon": -73.067919,
  "percentiles": [5, 25, 50, 75, 95],
  "workerVersion": "v4.0.0",
  "projectId": PROJECT_ID,
  "variantIndex": 0,
};

