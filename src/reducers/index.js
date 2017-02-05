import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";



const initialState = {currentCor:"A", currentMap: 0};



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




// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  reducer
  // your reducer here
});
