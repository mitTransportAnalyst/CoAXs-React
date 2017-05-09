/**
 * Created by xinzheng on 5/5/17.
 */



import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import RightMainPanelPTP from "./RightMainPanel/RightMainPanelPTP"
import RouteMap from "./Map/RouteMap/RouteMap"
import ScenarioMapPTP from "./Map/ScenarioMap/ScenarioMapPTP"
import Navbar from "./Teaching/Navbar/Navbar"
import LoadingPage from "./LoadingPage/LoadingPage"
import MapLegend from "./Map/Legend/Legend"


//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../reducers/action';

/**
 * The main view which include TopleftPanel, map and RightMainPanel component
 */

class PointToPoint extends React.Component {

  render() {

    //TODO Smartlook
    // smartlook('tag', 'websiteName', 'NOLACoAXs');

    return (
      <div className="page-home">
        <Navbar/>
        <TopleftPanel/>
        <MapLegend/>
        {this.props.loadingProgress === 1 ? null : <LoadingPage progress={this.props.loadingProgress}/>}
        {/*change map when click subhead*/}
        {/*{this.props.currentMap ? <RouteMap /> : <ScenarioMap />}*/}
        {/*<div className={this.props.currentMap ? "" : 'hidden2' }>*/}
        {/*<RouteMap  />*/}
        {/*</div>*/}
        <div className={this.props.currentMap ? 'hidden2' : ""}>
          <ScenarioMapPTP />
        </div>
        <RightMainPanelPTP/>
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


export default connect(mapStateToProps, mapDispachToProps)(PointToPoint);



