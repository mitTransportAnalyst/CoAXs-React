/**
 * Created by xinzheng on 5/5/17.
 */

import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import RightMainPanelPTP from "./RightMainPanel/RightMainPanelPTP"
import ScenarioMapPTP from "./Map/ScenarioMap/ScenarioMapPTP"
import NavbarPTP from "./Teaching/Navbar/NavbarPTP"
import LoadingPage from "./LoadingPage/LoadingPage"
import MapLegendPTP from "./Map/Legend/LegendPTP"
import {FormControlID} from "../config"

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../reducers/action';

/**
 * The main view which include TopleftPanel, map and RightMainPanel component
 */

class PointToPoint extends React.Component {
  componentDidMount() {
    // smartlook('tag', 'websiteName', 'NOLACoAXs-PTP');

    if (this.props.location.query[FormControlID.ptpEntry] !== undefined) {
      this.props.addEmail(this.props.location.query[FormControlID.ptpEntry]);
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
        "ptp": true,
        "city": "NOLA",
        "type": "start",
        "navState": this.props.navState
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
          "ptp": true,
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
        <NavbarPTP/>
        <TopleftPanel/>
        <MapLegendPTP/>
        <LoadingPage progress={this.props.loadingProgress}/>
        <ScenarioMapPTP />
        <RightMainPanelPTP/>
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

export default connect(mapStateToProps, mapDispachToProps)(PointToPoint);



