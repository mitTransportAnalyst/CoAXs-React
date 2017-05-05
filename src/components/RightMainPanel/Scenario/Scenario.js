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
import {CorridorInfo} from "../../../config"

import ScenarioEntry from "./ScenarioEntry"

class Scenario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      baseScenario: {},
      isCompareMode: false,
      selectedScenario: 0,
      firedScenario: [],
    };

    this.handlePlaceHolder = this.handlePlaceHolder.bind(this);
    this.selectScenario = this.selectScenario.bind(this);
    this.handleUpdate= this.handleUpdate.bind(this);
    this.handleClickBaselineButton= this.handleClickBaselineButton.bind(this);
    this.handleClickCompareButton= this.handleClickCompareButton.bind(this);



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

  handlePlaceHolder() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleClickCompareButton() {
    this.props.isCompare(!this.state.isCompareMode);
    this.setState({
      isCompareMode: !this.state.isCompareMode,
    })
  }

  handleClickBaselineButton(){
    this.props.isCompare(!this.state.isCompareMode);
    this.setState({
      isCompareMode: !this.state.isCompareMode,
    })
  }



  selectScenario(scenarioID) {
    let newSelectedScenario = [...this.state.selectedScenario];

    newSelectedScenario = scenarioID;

    this.setState(
      {...this.state, selectedScenario: newSelectedScenario}
    )

  }




  handleUpdate(){
    this.props.pushUpdateButton();
  }



  componentWillUpdate(nextProps, nextState){
    if (this.props.scenarioStore !== nextProps.scenarioStore){
      const corridorObject = {
        "16A": JSON.parse(JSON.stringify(json16A)),
        "16B": JSON.parse(JSON.stringify(json16B)),
        "16C": JSON.parse(JSON.stringify(json16C)),
        "E3A": JSON.parse(JSON.stringify(jsonE3A)),
        "E3B": JSON.parse(JSON.stringify(jsonE3B)),
        "E3C": JSON.parse(JSON.stringify(jsonE3C)),
        "E3D": JSON.parse(JSON.stringify(jsonE3D)),
        "E5A": JSON.parse(JSON.stringify(jsonE5A)),
        "E5B": JSON.parse(JSON.stringify(jsonE5B)),
      };
      const selectScenarioNum = nextProps.scenarioStore[1];
      let firedScenario = [];

      for (let key in selectScenarioNum){
        let temp = cloneDeep(corridorObject[selectScenarioNum[key].alternative].modifications);
        temp.forEach(function (route) {
          if (route.type === "adjust-frequency") {
            route.entries.forEach((entry) => {
              entry.headwaySecs = entry.headwaySecs * (1 - 0.01 * Number(selectScenarioNum[key].headway));
            });
          }
          firedScenario.push(route);
        })
      }

      this.props.fireUpdate(firedScenario);

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

    // let scenario = this.props.newScenario.map((scenario, index) => {
    //   return <ScenarioEntry data={scenario} index={index} key={index} name="scenario"
    //                         isCompareMode={this.state.isCompareMode} selectScenario={this.selectScenario} selectNum = {this.state.selectedScenario}/>
    // });

    return (
      <div className="scenarioDashboardPanel" >
        <div className="colHead" >
          <i className="fa fa-random"/>
          <span>Scenario Dashboard</span>
        </div>

        {/*{ this.state.isOpen ?*/}
          {/*<div className="placeHolder" onClick={this.handlePlaceHolder}>*/}
            {/*<div className="bigText">*/}
              {/*<i className="fa fa-random"/>*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*:*/}
          {/*null*/}
        {/*}*/}


        <div>

          {/*<div className="btn-group btn-group-justified">*/}

            {/*{this.state.isCompareMode ? <label className="btn tiny" style={{backgroundColor: "grey", color: "white", border:"3px solid #eec16f"}} onClick={this.handleClickCompare}><i*/}
              {/*className="fa fa-balance-scale"/> Compare*/}
            {/*</label> : <label className="btn" style={{backgroundColor: "grey", color: "white"}}*/}
                              {/*onClick={this.handleClickCompare}><i*/}
              {/*className="fa fa-balance-scale"/> Compare*/}
            {/*</label>}*/}


            {/*<label className="btn" style={{backgroundColor: "grey", color: "white"}} onClick={this.handleUpdate}>*/}
              {/*<i className="fa fa-plus-square"/> Update*/}
            {/*</label>*/}


          {/*</div>*/}

          <div className="scenariosTable" >
            {/*<div className="scenario" style={{position: "absolute", zIndex: 10, width: 24}}>*/}

              {/*/!*position:absolute;z-index:10;box-shadow:5px 0px 3px rgba(0,0,0,0.1);width:24px*!/*/}

              {/*/!*<i className="fa fa-balance-scale" style={{position: "absolute", bottom: 40}}/>*!/*/}
            {/*</div>*/}



            <div className="scenarioEntries">

              <ScenarioEntry data={this.props.scenarioStore[0]} index={0} key={0} name="scenario"
                             isCompareMode={this.state.isCompareMode}  />
              <ScenarioEntry data={this.props.scenarioStore[1]} index={1} key={1} name="scenario"
                             isCompareMode={this.state.isCompareMode} />

            </div>

            <div >

              <div className={baselineButton} style={{width: "50%", height: "10%",padding: 2}} onClick={this.handleClickBaselineButton}>
                <i className="fa fa-eye"/> View the Baseline
              </div>
              <div className={compareButton} style={{width: "50%", height: "10%",padding: 2}} onClick={this.handleClickCompareButton}>
                <i className="fa fa-balance-scale"/> Compare with Baseline
              </div>
            </div>


            <div className="btn-group btn-group-justified" onClick={this.handleUpdate} >

              <div className="btn btn-info" style={{width: "100%", height: "10%",padding: 2}}>
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
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Scenario);


