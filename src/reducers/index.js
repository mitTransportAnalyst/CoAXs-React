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
function scenarioStore(state = [], action) {
  switch (action.type) {
    case 'saveScenario':
      return [...state, action.res];
        // "currentCor": JSON.parse(action.res)

    default:
      return state
  }
}


export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  reducer,
  scenarioStore,
});
