import React from "react";
import s from "./Scenario.css";
import _ from 'lodash';

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
      selectedScenario: [],
    };

    this.handlePlaceHolder = this.handlePlaceHolder.bind(this);
    this.handleClickCompare = this.handleClickCompare.bind(this);
    this.selectScenario = this.selectScenario.bind(this);


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
    this.setState({
      isCompareMode: !this.state.isCompareMode,
    })
  }

  selectScenario(scenarioID) {
    let newSelectedScenario = [...this.state.selectedScenario];

    if (this.state.isCompareMode === true) {
      if (_.includes(newSelectedScenario, scenarioID)) {
        _.pull(newSelectedScenario, scenarioID);
      }
      else {
        newSelectedScenario.push(scenarioID);
      }
    }
    else{
      newSelectedScenario = [scenarioID];
    }
    this.setState(
      {...this.state, selectedScenario: newSelectedScenario}
    )

  }

  render() {


    let scenario = this.props.newScenario.map((scenario, index) => {
      return <ScenarioEntry data={scenario} index={index} key={index} name="scenario"
                            isCompareMode={this.state.isCompareMode} selectScenario={this.selectScenario} />
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

        { this.state.isOpen ?
          <div className="placeHolder" onClick={this.handlePlaceHolder}>
            <div className="bigText">
              <i className="fa fa-random"/>
            </div>
          </div>
          :
          null
        }


        <div className="showToggle">

          <div className="btn-group btn-group-justified">

            {this.state.isCompareMode ? <label className="btn tiny" onClick={this.handleClickCompare}><i
              className="fa fa-balance-scale"/> Compare
            </label> : <label className="btn" style={{backgroundColor: "grey", color: "white"}}
                              onClick={this.handleClickCompare}><i
              className="fa fa-balance-scale"/> Compare
            </label>}


            <label className="btn" style={{backgroundColor: "grey", color: "white"}}><i
              className="fa fa-plus-square"/> Rename
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


