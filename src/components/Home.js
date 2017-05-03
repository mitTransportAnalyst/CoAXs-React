/**
 * @version 0.1.0
 */

import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import RightMainPanel from "./RightMainPanel/RightMainPanel"
import RouteMap from "./Map/RouteMap/RouteMap"
import ScenarioMap from "./Map/ScenarioMap/ScenarioMap"
import Navbar from "./Teaching/Navbar/Navbar"
import LoadingPage from "./LoadingPage/LoadingPage"


//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../reducers/action';

/**
 * The main view which include TopleftPanel, map and RightMainPanel component
 */

class Home extends React.Component {

  render() {
    smartlook('tag', 'websiteName', 'NOLACoAXs');

    return (
      <div className="page-home">
        <Navbar/>
        <TopleftPanel/>
        {/*{this.props.loadingProgress === 1 ? null : <LoadingPage progress={this.props.loadingProgress}/>}*/}
        {/*change map when click subhead*/}
        {/*{this.props.currentMap ? <RouteMap /> : <ScenarioMap />}*/}
        {/*<div className={this.props.currentMap ? "" : 'hidden2' }>*/}
          {/*<RouteMap  />*/}
        {/*</div>*/}
        <div className={this.props.currentMap ? 'hidden2' : ""}>
          <ScenarioMap />
        </div>
        <RightMainPanel/>
      </div>

    );
  }
}


//bind store and function to props
function mapStateToProps(state) {
  return {
    currentMap: state.reducer.currentMap,
    loadingProgress: state.loadingProgress,

  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Home);



