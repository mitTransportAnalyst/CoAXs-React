/**
 * @version 0.1.0
 */

import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import RightMainPanel from "./RightMainPanel/RightMainPanel"
import ScenarioMap from "./Map/ScenarioMap/ScenarioMap"
import Navbar from "./Teaching/Navbar/Navbar"
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
  componentDidMount() {
    // smartlook('tag', 'websiteName', 'NOLACoAXs-ACC');

    if (this.props.location.query[FormControlID.singleEntry] !== undefined) {
      this.props.addEmail(this.props.location.query[FormControlID.singleEntry]);
      // smartlook('tag', 'email', this.props.location.query[FormControlID.ptpEntry]);
    }

    fetch('https://api.mlab.com/api/1/databases/tdm/collections/log?apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "time": Date(),
        "email": this.props.emailStore,
        "ptp": false,
        "city": "NOLA",
        "type": "start"
      })
    });

    window.addEventListener("beforeunload", (ev) => {
      fetch('https://api.mlab.com/api/1/databases/tdm/collections/log?apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "time": Date(),
          "email": this.props.emailStore,
          "ptp": false,
          "city": "NOLA",
          "type": "exit",
          "navState": this.props.navState
        })
      });
    });
  }

  render() {
    return (
      <div className="page-home">
        <Navbar/>
        <TopleftPanel/>
        <MapLegend/>
        {/*{this.props.loadingProgress === 1 ? null : }*/}
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
    navState: state.navState,
    emailStore: state.emailStore,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Home);



