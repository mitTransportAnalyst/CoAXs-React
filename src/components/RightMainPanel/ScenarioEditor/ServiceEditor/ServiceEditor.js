import React from "react";
import s from "./ServiceEditor.css";
import cloneDeep from 'lodash/cloneDeep'

//import configuration file
import {
  RunningTime,
  Headway,
  DwellTime,
  RunningTimeMin,
  RunningTimeMax,
  DwellTimeMin,
  DwellTimeMax,
  HeadwayMin,
  HeadwayMax,
  CorridorInfo,
} from "../../../../config"

import ScoreCard from "../../../../Data/Scorecard.json"

//import slider component
import Slider from "../../Common/Slider/Slider"
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../../reducers/action';

class ServiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScenario: {},
    };

    this.changeFeature = this.changeFeature.bind(this);
  }

  //Initialize the scenario
  componentWillMount() {
    const initialScenario = {};
    const initialScore = {};
    const initialHeadway = {};

    Object.keys(CorridorInfo).map(
      (key) => {
        initialScenario[key] = {
          "headway": 0,
          "alternative": this.props.selectedBusline[key],
        };
        initialScore[key] = ScoreCard[this.props.selectedBusline[key]].totalTime / (ScoreCard[this.props.selectedBusline[key]].baseHeadway);
        initialHeadway[key] = ScoreCard[this.props.selectedBusline[key]].baseHeadway;
      }
    );
    this.setState({
      "currentScenario": initialScenario,
    });
    this.props.changeScorecard(initialScore);
    this.props.changeHeadway(initialHeadway);
  }

  //When busline change
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedBusline !== nextProps.selectedBusline) {
      let nextScenario = cloneDeep(this.state.currentScenario);
      for (let key in nextProps.selectedBusline) {
        nextScenario[key].alternative = nextProps.selectedBusline[key];
      }
      this.setState({
        ...this.state,
        currentScenario: nextScenario
      })
    }
  }

  //When headway change
  changeFeature(feature, value) {
    let nextScenario = cloneDeep(this.state.currentScenario);
    nextScenario[this.props.currentCorridor][feature] = value;
    this.setState({
      currentScenario: nextScenario,
    })
  }

  // When scenario change (headway or busline), update the score, headway and save scenario
  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentScenario !== this.state.currentScenario) {
      const nextScore = {};
      const nextHeadway = {};
      Object.keys(CorridorInfo).map(
        (key) => {
          nextScore[key] = ScoreCard[nextState.currentScenario[key].alternative].totalTime / (ScoreCard[nextState.currentScenario[key].alternative].baseHeadway * (1 - Number(nextState.currentScenario[key].headway) / 100));
          nextHeadway[key] = ScoreCard[nextState.currentScenario[key].alternative].baseHeadway * (1 - Number(nextState.currentScenario[key].headway) / 100 );
        }
      );
      this.props.changeHeadway(nextHeadway);
      this.props.changeScorecard(nextScore);
      this.props.saveScenario(nextState.currentScenario);
    }
  }

  render() {
    let currentCorridor = CorridorInfo[this.props.currentCorridor];
    const tooltipforHeadway = (
      <Tooltip id="tooltipforHeadway"><strong>Refers to the average amount of time between buses at a
        stop</strong></Tooltip>
    );

    return (
      <div className="serviceEditorPanel">
        <div>
          <div className="setTimesTitle">
            <OverlayTrigger placement="bottom" overlay={tooltipforHeadway}>
              <div className="subHead">
                Time Between Buses
              </div>
            </OverlayTrigger>
            <div>
              <div style={{paddingTop: 1, marginLeft: 10,}}>
                <div style={{width: "96%", display: "inline-block", marginTop: 2}}>
                  <Slider name="headway" min={HeadwayMin} max={HeadwayMax}
                          value={this.state.currentScenario[this.props.currentCorridor]["headway"]} step="5"
                          className="right" changeFunction={this.changeFeature}
                          headwayTime={this.props.headwayStore[this.props.currentCorridor]}/>
                </div>
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
    currentCorridor: state.currentCorridorStore.currentCor,
    selectedBusline: state.BuslineSelectedStore,
    headwayStore: state.HeadwayTime,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ServiceEditor);


