import React from "react";
import s from "./Scenario.css";
import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep'
import classNames from "classnames"


import json16A from "../../../Data/scenario/16A.json"
import json16B from "../../../Data/scenario/16B.json"
import json16C from "../../../Data/scenario/16C.json"
import jsonE3A from "../../../Data/scenario/E3A.json"
import jsonE3B from "../../../Data/scenario/E3B.json"
import jsonE3C from "../../../Data/scenario/E3C.json"
import jsonE3D from "../../../Data/scenario/E3D.json"
import jsonE5A from "../../../Data/scenario/E5A.json"
import jsonE5B from "../../../Data/scenario/E5B.json"


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
    this.state = {
      isOpen: true,
      baseScenario: {},
      isCompareMode: false,
      selectedScenario: false,
      firedScenario: [],
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClickBaselineButton = this.handleClickBaselineButton.bind(this);
    this.handleClickCompareButton = this.handleClickCompareButton.bind(this);


  }

  //Set base scenario
  componentWillMount() {
    let model = {};
    Object.keys(CorridorInfo).map(
      (id)=> {
        model[id] = {
          "runningTime": 0,
          "dwellTime": 0,
          "headway": 0,
        }
      }
    );
    this.setState({
      "baseScenario": model,
    })
  }


  handleClickCompareButton() {
    this.props.isCompare(!this.state.isCompareMode);
    this.setState({
      isCompareMode: !this.state.isCompareMode,
      selectedScenario: !this.state.selectedScenario,
    })
  }

  handleClickBaselineButton() {
    this.props.isCompare(!this.state.isCompareMode);
    this.setState({
      isCompareMode: !this.state.isCompareMode,
      selectedScenario: !this.state.selectedScenario,
    })
  }


  handleUpdate() {
    this.props.pushUpdateButton();
  }


  componentWillUpdate(nextProps, nextState) {
    // if (this.props.scenarioStore !== nextProps.scenarioStore) {
    //   const corridorObject = {
    //     "16A": JSON.parse(JSON.stringify(json16A)),
    //     "16B": JSON.parse(JSON.stringify(json16B)),
    //     "16C": JSON.parse(JSON.stringify(json16C)),
    //     "E3A": JSON.parse(JSON.stringify(jsonE3A)),
    //     "E3B": JSON.parse(JSON.stringify(jsonE3B)),
    //     "E3C": JSON.parse(JSON.stringify(jsonE3C)),
    //     "E3D": JSON.parse(JSON.stringify(jsonE3D)),
    //     "E5A": JSON.parse(JSON.stringify(jsonE5A)),
    //     "E5B": JSON.parse(JSON.stringify(jsonE5B)),
    //   };
    //   const selectScenarioNum = nextProps.scenarioStore[1];
    //   let firedScenario = [];
    //
    //   for (let key in selectScenarioNum) {
    //     let temp = cloneDeep(corridorObject[selectScenarioNum[key].alternative].modifications);
    //     temp.forEach(function (route) {
    //       if (route.type === "adjust-frequency") {
    //         route.entries.forEach((entry) => {
    //           entry.headwaySecs = entry.headwaySecs * (1 - 0.01 * Number(selectScenarioNum[key].headway));
    //         });
    //       }
    //       firedScenario.push(route);
    //     })
    //   }
    //
    //   this.props.fireUpdate(firedScenario);
    // }

    if (this.props.showCompareScenarioModal !== nextProps.showCompareScenarioModal) {
      this.handleClickCompareButton();
    }
  }

  render() {
    const baselineButton = classNames({
      "btn": true,
      "btn-info": !this.state.isCompareMode,
      "btn-default": this.state.isCompareMode,
    });

    const compareButton = classNames({
      "btn": true,
      "btn-info": this.state.isCompareMode,
      "btn-default": !this.state.isCompareMode,
    });


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
                             isCompareMode={this.state.isCompareMode}
                             selectedScenario={this.state.selectedScenario}/>
              <ScenarioEntry data={this.props.scenarioStore[1]} index={1} key={1} name="scenario"
                             isCompareMode={this.state.isCompareMode}
                             selectedScenario={this.state.selectedScenario}/>

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
    headwayTime: state.HeadwayTime,
    showCompareScenarioModal: state.showCompareScenarioModal,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Scenario);


