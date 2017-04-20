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
} from "../../../config"

//import slider component
import Slider from "../Common/Slider/Slider"


//import pictures
import runningPic from '../../../img/runningtime.png'
import dwellPic from '../../../img/dwelltime.png'
import headwayPic from '../../../img/frequency.png'

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';


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
      for (let key in nextProps.currentBusAlternative){
        temp[key].alternative = nextProps.currentBusAlternative[key];
      }
      this.setState({
        ...this.state,
        currentAdjust: temp

      })


    }
  }

  componentWillMount() {
    let model = {};
    Object.keys(CorridorInfo).map(
      (id)=> {
        model[id] = {
          "headway": 0,
          "alternative":this.props.currentBusAlternative[id],
        }
      }
    );
    this.setState({
      "resetAdjust": model,
      "currentAdjust": model,
    })


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
    return (
      <div className="colBody" id="service-tab">
        <div className="colHead" onClick={
          () => {
            this.handlePlaceHolder();
            this.props.changeMap(!this.props.currentMap);
          }}>
          <i className="fa fa-pencil-square-o"/>
          Service Editor - Editing Route {CorridorInfo[this.props.currentCorridor].name}
        </div>


        {/*{ this.state.isOpen ?*/}
          {/*<div className="placeHolder" onClick={*/}
            {/*() => {*/}
              {/*this.handlePlaceHolder();*/}
              {/*this.props.changeMap(!this.props.currentMap);*/}
            {/*}}>*/}
            {/*<div className="bigText">*/}
              {/*<i className="fa fa-pencil-square-o"/>*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*:*/}
          {/*null*/}
        {/*}*/}

        <div className="btn-group btn-group-justified">
          <div >
            {/*style="width:300px; color:{{variants[tabnav].color}}; background-color:{{variants[tabnav].color}}"*/}
            {/*<i className="fa fa-level-down "/>*/}
          </div>

          <div className="btn btn-info" style={{width: 150, position: "absolute", right: 0}}
               onClick={this.handleSaveButton}>
            <i className="fa fa-save"/> Save
          </div>
        </div>



        <div style={{marginTop: 35}}>

          <div className="setTimesTitle">

            <div className="subHead">
              Headway change
            </div>

            <div>
              <div style={{paddingTop: 1}}>
                <div style={{width: 60, display: "inline-block"}}>
                  <img src={headwayPic} style={{height: 35}}/>
                </div>
                <i className="fa fa-arrow-down" style={{color: "black"}}/>

                <div style={{width: "75%", display: "inline-block", marginTop: 2}}>
                  <Slider name="headway" min={HeadwayMin} max={HeadwayMax} value={this.state.currentAdjust[this.props.currentCorridor]["headway"]}  step="5" className="right" changeFunction={this.changeFeature}/>
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
    currentBusAlternative: state.changeBusline,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ServiceEditor);


