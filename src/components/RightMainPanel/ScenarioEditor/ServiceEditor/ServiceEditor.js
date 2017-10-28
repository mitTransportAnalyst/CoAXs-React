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
      isOpen: true,
      resetAdjust: {},
      currentAdjust: {},
    };

    this.handlePlaceHolder = this.handlePlaceHolder.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.changeFeature = this.changeFeature.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentBusAlternative !== nextProps.currentBusAlternative) {
      let temp = cloneDeep(this.state.currentAdjust);
      for (let key in nextProps.currentBusAlternative) {
        temp[key].alternative = nextProps.currentBusAlternative[key];
      }
      this.setState({
        ...this.state,
        currentAdjust: temp
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentAdjust !== this.state.currentAdjust) {
      let tempScore = {A: 0, B: 0, C: 0};     // TODO: change to dynamic
      let tempHeadway = {A: 0, B: 0, C: 0};
      for (let key in tempScore) {
        tempScore[key] = ScoreCard[nextState.currentAdjust[key].alternative].totalTime / (ScoreCard[nextState.currentAdjust[key].alternative].baseHeadway * (1 - Number(nextState.currentAdjust[key].headway) / 100))
      }
      for (let key in tempHeadway) {
        tempHeadway[key] = ScoreCard[nextState.currentAdjust[key].alternative].baseHeadway * (1 - Number(nextState.currentAdjust[key].headway) / 100 )
      }
      this.props.changeHeadway(tempHeadway);
      this.props.changeScorecard(tempScore);
      this.props.saveScenario(nextState.currentAdjust);
    }
  }

  componentDidMount() {
    let tempScore = {A: 0, B: 0, C: 0};     // TODO: change to dynamic
    let tempHeadway = {A: 0, B: 0, C: 0};

    for (let key in tempScore) {
      tempScore[key] = ScoreCard[this.state.currentAdjust[key].alternative].totalTime / (ScoreCard[this.state.currentAdjust[key].alternative].baseHeadway * (1 - Number(this.state.currentAdjust[key].headway) / 100))
    }

    for (let key in tempHeadway) {
      tempHeadway[key] = ScoreCard[this.state.currentAdjust[key].alternative].baseHeadway * (1 - Number(this.state.currentAdjust[key].headway) / 100 )
    }
    this.props.changeScorecard(tempScore);
    this.props.changeHeadway(tempHeadway);
  }

  componentWillMount() {
    let model = {};
    Object.keys(CorridorInfo).map(
      (id) => {
        model[id] = {
          "headway": 0,
          "alternative": this.props.currentBusAlternative[id],
        }
      }
    );
    this.setState({
      "resetAdjust": model,
      "currentAdjust": model,
    });
  }

  handlePlaceHolder() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleSaveButton() {
    this.props.saveScenario(this.state.currentAdjust)

  }

  changeFeature(feature, value) {
    let temp = cloneDeep(this.state.currentAdjust);
    temp[this.props.currentCorridor][feature] = value;
    this.setState({
      currentAdjust: temp,
    })
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
                          value={this.state.currentAdjust[this.props.currentCorridor]["headway"]} step="5"
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
    currentCorridor: state.reducer.currentCor,
    currentMap: state.reducer.currentMap,
    currentBusAlternative: state.BuslineSelectedStore,
    headwayStore: state.HeadwayTime,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ServiceEditor);


