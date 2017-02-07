/**
 * @version 0.1.0
 */

import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import Bottom from "./Bottom/Bottom"
import RouteMap from "./Map/RouteMap/RouteMap"
import ScenarioMap from "./Map/ScenarioMap/ScenarioMap"

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../reducers/action';

/**
 * The main view which include TopleftPanel, map and Bottom component
 */

class Home extends React.Component {


  render() {
    return (
      <div className="page-home">
        <TopleftPanel/>
        {/*change map when click subhead*/}
        {this.props.currentMap ? <RouteMap style={{height:500, width:500}}/> : <ScenarioMap style={{height:500, width:500}}/>}
        <Bottom/>
      </div>

    );
  }
}


//bind store and function to props
function mapStateToProps(state) {
  return {
    currentMap: state.reducer.currentMap,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Home);



