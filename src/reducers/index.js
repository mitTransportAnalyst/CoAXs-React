import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";


/**
 * reducer
 *
 */


/**
 * initialState
 * @type {object}
 * @property {string} currentCor - initial clicked corridor {number} currentMap - initial map displayed 0: scenario map 1: route map
 */
const initialState = {currentCor:"A", currentMap: 0};


/**
 * main reducer
 * @param {object} state {string} action - dispatched in component
 * @return {object} store - new store
 */
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'clickCorridor':
      return {
        ...state,
        // "currentCor": JSON.parse(action.res)
        "currentCor": action.res
      };
    case 'changeMap':
      return {
        ...state,
        // "currentCor": JSON.parse(action.res)
        "currentMap": action.res
      };
    default:
      return state
  }
}

/**
 * scenario reducer
 * @param {object} state {string} action - dispatched in component
 * @return {object} store - new scenario store
 */
function scenarioStore(state = [{A: {
  runningTime: '0',
  dwellTime: '0',
  headway: 0
},
  B: {
    runningTime: 0,
    dwellTime: 0,
    headway: 0
  },
  C: {
    runningTime: 0,
    dwellTime: 0,
    headway: 0
  },
  D: {
    runningTime: 0,
    dwellTime: 0,
    headway: 0
  },
  E: {
    runningTime: 0,
    dwellTime: 0,
    headway: 0
  }}], action)
  {
  switch (action.type) {
    case 'saveScenario':
      return [...state, action.res];
        // "currentCor": JSON.parse(action.res)

    default:
      return state
  }
}


function timeFilterStore(state = [], action) {
  switch (action.type) {
    case 'changeTimeFilter':
      return {...state,
        "currentTimeFilter": action.res,
      };
    default:
      return state
  }
}

function modeStore(state = [], action) {
  switch (action.type) {
    case 'changeMode':
      return {
        "mode": action.res,
      };
    default:
      return state
  }
}

function GridNumberStore(state = [], action) {
  switch (action.type) {
    case 'changeGridNumber':
      return {
        "gridNumber": action.res[0],
        "gridNumber1": action.res[1],

      };
    default:
      return state
  }
}


function fireUpdate(state = [], action) {
  switch (action.type) {
    case 'fireUpdate':
      return {
        "fireScenario": action.res,
      };
    default:
      return state
  }
}

function isCompare(state = false, action) {
  switch (action.type) {
    case 'isCompare':
      return {
        "isCompare": action.res,
      };
    default:
      return state
  }
}



export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  reducer,
  scenarioStore,
  timeFilterStore,
  modeStore,
  GridNumberStore,
  fireUpdate,
  isCompare,
});
