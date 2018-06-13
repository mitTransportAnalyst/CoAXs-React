import React from "react";
import s from "./Scenario.css";
import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep'
import classNames from "classnames"

// import json16A from "../../../Data/scenario/16A.json"
// import json16B from "../../../Data/scenario/16B.json"
// import json16C from "../../../Data/scenario/16C.json"
// import jsonE3A from "../../../Data/scenario/E3A.json"
// import jsonE3B from "../../../Data/scenario/E3B.json"
// import jsonE3C from "../../../Data/scenario/E3C.json"
// import jsonE3D from "../../../Data/scenario/E3D.json"
// import jsonE5A from "../../../Data/scenario/E5A.json"
// import jsonE5B from "../../../Data/scenario/E5B.json"

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

//import configuration file
import {CorridorInfo, BaselineBuses} from "../../../config"

import ScenarioEntry from "./ScenarioEntry"



class Scenario extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //
    //   baselineHeadwayTime: {},
    // };

// thiago - baselineHeadwayTime is read from config.js

      Object.values(CorridorInfo).map((corridor) => {
          let corridorId = corridor.id
          // let corridorBaselineHeadwayTime = corridor.baselineHeadwayTime
          // this.state.baselineHeadwayTime[corridorId] = corridorBaselineHeadwayTime
          //console.log(this.state.baselineHeadwayTime)
        })
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClickBaselineButton = this.handleClickBaselineButton.bind(this);
    this.handleClickCompareButton = this.handleClickCompareButton.bind(this);
  }

  handleClickCompareButton() {
    this.props.changeCompareMode();
  }

  handleClickBaselineButton() {
    this.props.changeCompareMode();
  }

  handleUpdate() {
    this.props.pushUpdateButton();
  }

  render() {
    const baselineButton = classNames({
      "btn": true,
      "btn-info": !this.props.isCompareMode,
      "btn-default": this.props.isCompareMode,
    });

    const compareButton = classNames({
      "btn": true,
      "btn-info": this.props.isCompareMode,
      "btn-default": !this.props.isCompareMode,
    });

    console.log(this.props.scenarioStore);

    return (
      <div className="scenarioDashboardPanel">
        <div className="colHead">
          <i className="fa fa-random"/>
          <span>Scenario Summary</span>
        </div>
        <div>
          <div className="scenariosTable">
            <div className="scenarioEntries">
              <ScenarioEntry data={this.props.scenarioStore[0]} index={0} key={0} name="scenario"
                             isCompareMode={this.props.isCompareMode}/>
              <ScenarioEntry data={this.props.scenarioStore[1]} index={1} key={1} name="scenario"
                             isCompareMode={this.props.isCompareMode}/>
            </div>

            <div >
              <div className={baselineButton} style={{width: "50%", height: "10%", padding: 2}}
                   onClick={this.handleClickBaselineButton}>
                <i className="fa fa-eye"/> View the Baseline
              </div>
              <div className={compareButton} style={{width: "50%", height: "10%", padding: 2}}
                   onClick={this.handleClickCompareButton}>
                <i className="fa fa-balance-scale"/> Compare with Baseline
              </div>
            </div>

            <div className="btn-group btn-group-justified" onClick={this.handleUpdate}>
              <div className="btn btn-info" style={{width: "100%", height: "10%", padding: 2}}>
                <i className="fa fa-refresh"/> Update
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    scenarioStore: state.scenarioStore,
    selectedBusline: state.BuslineSelectedStore,
    // headwayTime: state.HeadwayTime,
    // scorecardData: state.ScorecardData,
    showCompareScenarioModal: state.showCompareScenarioModal,
    isCompareMode: state.isCompare.isCompare,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Scenario);
