import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";


/**
 * reducer
 *
 */


/**
 * initialState
 * @type {object}
 * @property {string} currentCor - initial clicked corridor {number} currentMap - initial map displayed 0: scenario map 1: route map
 */
const initialState = {currentCor: "A", currentMap: 0};


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
function scenarioStore(state = [{
  A: {
    headway: 0,
    alternative: "16A"
  },
  B: {
    headway: 0,
    alternative: "E3A"

  },
  C: {
    headway: 0,
    alternative: "E5A"

  },
}, {
  A: {
    headway: 0,
    alternative: "16A"
  },
  B: {
    headway: 0,
    alternative: "E3A"

  },
  C: {
    headway: 0,
    alternative: "E5A"

  },
}], action) {
  switch (action.type) {
    case 'saveScenario':

      return [state[0], action.res];
    // "currentCor": JSON.parse(action.res)

    default:
      return state
  }
}


function timeFilterStore(state = [], action) {
  switch (action.type) {
    case 'changeTimeFilter':
      return {
        ...state,
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


function updateButtonState(state = true, action) {
  switch (action.type) {
    case 'pushUpdateButton':
      return !state;
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

const initialBuslineState = {A: "16A", B: "E3A", C: "E5A"};

function BuslineSelectedStore(state = initialBuslineState, action) {
  switch (action.type) {
    case 'changeBusline':
      return {
        ...state,
        [action.res.corridor]: action.res.busline.slice(0, 3),
      };
    default:
      return state
  }
}


const initialNavState = {
  isdonePreSurvey: false,
  isdoneOneScenario: false,
  isdoneCompareScenario: false,
  isdoneExitSurvey: false
};

function navState(state = initialNavState, action) {
  switch (action.type) {
    case 'doneOneScenario':
      return {
        ...state,
        isdoneOneScenario: true,
      };
    case 'doneCompareScenario':
      return {
        ...state,
        isdoneCompareScenario: true,
      };
    case 'doneExitSurvey':
      return {
        ...state,
        isdoneExitSurvey: true,
      };
    case 'donePreSurvey':
      return {
        ...state,
        isdonePreSurvey: true,
      };
    default:
      return state
  }
}

function loadingProgress(state = 0, action) {
  switch (action.type) {
    case 'changeProgress':
      return action.res;
    default:
      return state
  }
}


function ScorecardData(state = 0, action) {
  switch (action.type) {
    case 'changeScorecard':
      return action.res;
    default:
      return state
  }
}


function HeadwayTime(state = 0, action) {
  switch (action.type) {
    case 'changeHeadway':
      return action.res;
    default:
      return state
  }
}

function showCompareScenarioModal(state = false, action) {
  switch (action.type) {
    case 'fireCompareScenarioModal':
      return true;
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
  updateButtonState,
  isCompare,
  navState,
  BuslineSelectedStore,
  loadingProgress,
  ScorecardData,
  HeadwayTime,
  showCompareScenarioModal,
});
