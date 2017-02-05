import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import Bottom from "./Bottom/Bottom"
import RouteMap from "./Map/RouteMap/RouteMap"
import ScenarioMap from "./Map/ScenarioMap/ScenarioMap"




import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../reducers/action';


class Home extends React.Component {


  render() {
    return (
      <div className="page-home">
        <TopleftPanel/>
        {this.props.currentMap ? <RouteMap style={{height:500, width:500}}/> : <ScenarioMap style={{height:500, width:500}}/>}
        <Bottom/>
      </div>

    );
  }
}



function mapStateToProps(state) {
  return {
    currentMap: state.reducer.currentMap,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Home);



