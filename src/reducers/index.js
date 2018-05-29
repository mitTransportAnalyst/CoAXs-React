import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";

/**
 * reducer
 *
 */

//Initialization
const initialCorridor = {currentCor: "A"};
const initialOpp = {currentOpp: "A"};

const initialScenario = [{
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
    headway: 30,
    alternative: "16A"
  },
  B: {
    headway: 24,
    alternative: "E3A"
  },
  C: {
    headway: 27,
    alternative: "E5A"
  },
}];

const initialBuslineState = {A: "16A", B: "E3A", C: "E5A"};

const initialNavState = {
  isdonePreSurvey: true,
  isdoneOneScenario: false,
  isdoneCompareScenario: false,
  isdoneExitSurvey: false
};

function currentOppStore(state = initialOpp, action) {
  switch (action.type) {
    case 'clickOpp':
      return {
        ...state,
        "currentOpp": action.res
      };
    default:
      return state
  }
}

function currentCorridorStore(state = initialCorridor, action) {
  switch (action.type) {
    case 'clickCorridor':
      return {
        ...state,
        "currentCor": action.res
      };
    default:
      return state
  }
}

function scenarioStore(state = initialScenario, action) {
  switch (action.type) {
    case 'saveScenario':
      return [state[0], action.res];
    default:
      return state
  }
}

function timeFilterStore(state = {currentTimeFilter: 30}, action) {
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

function GridNumberStore(state = [], action) {
  switch (action.type) {
    case 'changeGridNumber':
      return {
        "gridNumberBase": action.res[0],
        "gridNumberNew": action.res[1],
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

function isCompare(state = {isCompare: false}, action) {
  switch (action.type) {
    case 'changeCompareMode':
      return {
        "isCompare": !state.isCompare,
      };
    default:
      return state
  }
}

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

function emailStore(state = null, action) {
  switch (action.type) {
    case 'addEmail':
      return action.res;
    default:
      return state
  }
}

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

export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  currentOppStore,
  currentCorridorStore,
  scenarioStore,
  timeFilterStore,
  GridNumberStore,
  updateButtonState,
  isCompare,
  navState,
  BuslineSelectedStore,
  loadingProgress,
  ScorecardData,
  HeadwayTime,
  showCompareScenarioModal,
  emailStore,
});
