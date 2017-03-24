import React from "react";
import s from "./Scenario.css";
import _ from 'lodash';

//TODO for loop

import Ajson from "../../../Data/scenario/A.json"
import Bjson from "../../../Data/scenario/A.json"
import Cjson from "../../../Data/scenario/A.json"
import Djson from "../../../Data/scenario/A.json"
import Ejson from "../../../Data/scenario/A.json"

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
    this.handleClickCompare = this.handleClickCompare.bind(this);
    this.selectScenario = this.selectScenario.bind(this);
    this.handleUpdate= this.handleUpdate.bind(this);


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

  handleClickCompare() {
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
    const corridorObject = {"A": JSON.parse(JSON.stringify(Ajson)), "B": JSON.parse(JSON.stringify(Bjson)), "C": JSON.parse(JSON.stringify(Cjson)), "D": JSON.parse(JSON.stringify(Djson)), "E": JSON.parse(JSON.stringify(Ejson))};
    const selectScenarioNum = this.props.newScenario[this.state.selectedScenario];
    let firedScenario = [];

    //Running Time
    Object.keys(corridorObject).map((key) =>{
        corridorObject[key].modifications.forEach(function (route) {
        if (route.type === "adjust-speed") {
          route.scale = route.scale * (1 + 0.01 * Number(selectScenarioNum[key].runningTime));
          firedScenario.push(route);
        }
      })
    });

    //Dwell Time
    Object.keys(corridorObject).map((key) =>{
      corridorObject[key].modifications.forEach(function (route) {
        if (route.type === "adjust-dwell-time") {
          route.scale = route.scale * (0.01 * Number(selectScenarioNum[key].dwellTime));
          firedScenario.push(route);
        }
      })
    });

    //Headway
    Object.keys(corridorObject).map((key) =>{
      corridorObject[key].modifications.forEach(function (route) {
        if (route.type === "adjust-frequency") {
          route.entries.forEach((entry) => {
            entry.headwaySecs = entry.headwaySecs * Number(selectScenarioNum[key].headway);
          });
          firedScenario.push(route);
        }
      })
    });


    this.props.fireUpdate(firedScenario);







  }



  render() {


    let scenario = this.props.newScenario.map((scenario, index) => {
      return <ScenarioEntry data={scenario} index={index} key={index} name="scenario"
                            isCompareMode={this.state.isCompareMode} selectScenario={this.selectScenario} selectNum = {this.state.selectedScenario}/>
    });

    return (
      <div className="colBody" id="leftDynamic">
        <div className="colHead" onClick={this.handlePlaceHolder}>
          <i className="fa fa-random"/>
          <span>Scenario: Existing MBTA</span>
          {/*<span>*/}
          {/*Scenario<span> Comparison</span>:*/}
          {/*<span>*/}
          {/*<span>vs. </span>*/}
          {/*<span>vs...</span>*/}
          {/*</span>*/}
          {/*</span>*/}
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


        <div className="showToggle">

          <div className="btn-group btn-group-justified">

            {this.state.isCompareMode ? <label className="btn tiny" onClick={this.handleClickCompare}><i
              className="fa fa-balance-scale"/> Compare
            </label> : <label className="btn" style={{backgroundColor: "grey", color: "white"}}
                              onClick={this.handleClickCompare}><i
              className="fa fa-balance-scale"/> Compare
            </label>}


            <label className="btn" style={{backgroundColor: "grey", color: "white"}} onClick={this.handleUpdate}>
              <i className="fa fa-plus-square"/> Update
            </label>


          </div>

          <div className="scenariosTable" style={{marginTop: -18, paddingTop: 18}}>
            <div className="scenario" style={{position: "absolute", zIndex: 10, width: 24}}>

              {/*position:absolute;z-index:10;box-shadow:5px 0px 3px rgba(0,0,0,0.1);width:24px*/}

              <i className="fa fa-balance-scale" style={{position: "absolute", bottom: 40}}/>
            </div>

            <div className="scenarioEntries">
              {scenario}
            </div>

          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    newScenario: state.scenarioStore,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Scenario);


