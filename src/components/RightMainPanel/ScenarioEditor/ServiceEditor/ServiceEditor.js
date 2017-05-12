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


//import pictures
import runningPic from '../../../../img/runningtime.png'
import dwellPic from '../../../../img/dwelltime.png'
import headwayPic from '../../../../img/frequency.png'


import {Tooltip, OverlayTrigger} from 'react-bootstrap';


//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../../reducers/action';


class ServiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAdjust: {},
    };

    this.changeFeature = this.changeFeature.bind(this);


  }



  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentAdjust !== this.state.currentAdjust) {
      this.props.saveScenario(nextState.currentAdjust);
    }
  }



  componentWillMount() {
    let model = {};
    Object.keys(CorridorInfo).map(
      (id)=> {
        model[id] = {
          "headway": 0,
          "speed": 0,
        }
      }
    );
    this.setState({
      "currentAdjust": model,
    });


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
                          />
                </div>
              </div>
            </div>
          </div>


          <div className="setTimesTitle">
            <OverlayTrigger placement="bottom" overlay={tooltipforHeadway}>
              <div className="subHead">
                Bus Speed
              </div>
            </OverlayTrigger>

            <div>
              <div style={{paddingTop: 1, marginLeft: 10,}}>


                <div style={{width: "96%", display: "inline-block", marginTop: 2}}>
                  <Slider name="speed" min={RunningTimeMin} max={RunningTimeMax}
                          value={this.state.currentAdjust[this.props.currentCorridor]["speed"]} step="5"
                          className="right" changeFunction={this.changeFeature}
                          />
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
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ServiceEditor);


