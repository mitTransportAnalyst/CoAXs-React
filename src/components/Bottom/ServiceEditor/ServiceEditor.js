import React from "react";
import s from "./ServiceEditor.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import Slider from "../Common/Slider/Slider"
import {
  RunningTime,
  Headway,
  DwellTime,
  RunningTimeMin,
  RunningTimeMax,
  DwellTimeMin,
  DwellTimeMax,
  HeadwayMin,
  HeadwayMax
} from "../../../config"


import runningPic from '../../../img/runningtime.png'
import dwellPic from '../../../img/dwelltime.png'
import headwayPic from '../../../img/frequency.png'


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';


class ServiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };

    this.handlePlaceHolder = this.handlePlaceHolder.bind(this)

  }

  handlePlaceHolder() {
    this.setState({
      isOpen : !this.state.isOpen
    })
  }

  render() {
    return (
      <div className="colBody" id="service-tab">
        <div className="colHead" onClick={
          () => {
            this.handlePlaceHolder();
        this.props.changeMap(!this.props.currentMap);
        }}>
          <i className="fa fa-pencil-square-o"></i>
          Service Editor
        </div>


        { this.state.isOpen ?
          <div className="placeHolder">
            <div className="bigText">
              <i className="fa fa-pencil-square-o"></i>
            </div>
          </div>
          :
          null
        }

        <div className="btn-group btn-group-justified">
          <div className="btn">
            {/*style="width:300px; color:{{variants[tabnav].color}}; background-color:{{variants[tabnav].color}}"*/}
            <i className="fa fa-level-down "/>
          </div>

          <div className="btn btn-info" style={{width: 150, position: "absolute", right: 0}}>
            <i className="fa fa-save"/> Save
          </div>
        </div>


        <div>

          <div className="setTimesTitle" style={RunningTime ? null : {display: "none"}}>
            <div className="subHead">
              Running time change (segment only)
            </div>
            <div>
              <div style={{marginTop: -2}}>

                <div style={{width: 60, display: "inline-block"}}>
                  <img src={runningPic} style={{height: 35}}/>
                </div>
                <i className="fa fa-arrow-down" style={{color: "black"}}></i>

                <div style={{width: "75%", display: "inline-block", marginTop: 2}}>
                  <Slider name="running" min={RunningTimeMin} max={RunningTimeMax} value="0" step="5"
                          className="right"/>

                  {/*<input type="range" min="0" max="60" value="0" step="5" style="margin-top: 10px;" className="right"/>*/}
                  {/*{{currentParam[tabnav].runningTime}}%*/}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={DwellTime ? {marginTop: 1} : {display: "none"}}>

          <div className="setTimesTitle">

            <div className="subHead">
              Dwell time change (all stops for all corridor routes)
            </div>

            <div>
              <div style={{paddingTop: 1}}>
                <div style={{width: 60, display: "inline-block"}}>
                  <img src={dwellPic} style={{height: 30}}/>
                </div>
                <i className="fa fa-arrow-down" style={{color: "black"}}></i>

                <div style={{width: "75%", display: "inline-block", marginTop: 2}}>
                  <Slider name="dwell" min={DwellTimeMin} max={DwellTimeMax} value="0" step="5" className="right"/>

                  {/*{{currentParam[tabnav].dwell}}%*/}
                </div>
              </div>
            </div>


          </div>

        </div>

        <div style={Headway ? {marginTop: 1} : {display: "none"}}>

          <div className="setTimesTitle">

            <div className="subHead">
              Headway change (all corridor routes)
            </div>

            <div>
              <div style={{paddingTop: 1}}>
                <div style={{width: 60, display: "inline-block"}}>
                  <img src={headwayPic} style={{height: 35}}/>
                </div>
                <i className="fa fa-arrow-down" style={{color: "black"}}></i>

                <div style={{width: "75%", display: "inline-block", marginTop: 2}}>
                  <Slider name="headway" min={HeadwayMin} max={HeadwayMax} value="0" step="5" className="right"/>
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
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ServiceEditor);


