/**
 * @version 0.1.0
 */

import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import RightMainPanel from "./RightMainPanel/RightMainPanel"
import ScenarioMap from "./Map/ScenarioMap/ScenarioMap"
// import Navbar from "./Teaching/Navbar/Navbar"
import LoadingPage from "./LoadingPage/LoadingPage"
import MapLegend from "./Map/Legend/Legend"
import {FormControlID} from "../config"

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../reducers/action';

/**
 * The main view which include TopleftPanel, map and RightMainPanel component
 */

class Home extends React.Component {

  render() {
    return (
      <div className="page-home">
        {/* <Navbar/> */}
        <TopleftPanel/>
        <MapLegend/>
        <LoadingPage progress={this.props.loadingProgress}/>
        <ScenarioMap/>
        <RightMainPanel/>
      </div>
    );
  }
}

//bind store and function to props
function mapStateToProps(state) {
  return {
    loadingProgress: state.loadingProgress,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Home);



