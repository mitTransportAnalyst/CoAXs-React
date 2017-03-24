import React from "react";
import Fa from "react-fontawesome";
import "./TimeFilter.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import Slider from "../Common/Slider/Slider"
import {PointToPoint, Accessibility} from "../../../config"


//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';


class TimeFilter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: true,
      currentTimeFilter:30,
      pointToPointSelect : false,
    };

    this.handlePlaceHolder = this.handlePlaceHolder.bind(this);
    this.changeFeature = this.changeFeature.bind(this)


  }



  changeFeature(feature, value) {
    this.setState({
      currentTimeFilter: value,
    });
    this.props.changeTimeFilter(value);
  }

  renderMode(){
    if (PointToPoint && Accessibility){
      return <div style={{color:"black", marginTop:30}}>
        Point-to-point mode:
        {this.state.pointToPointSelect?  <i className="fa fa-check-square" onClick={() => {this.setState({pointToPointSelect:!this.state.pointToPointSelect}); this.props.changeMode("pointToPoint")}}/> : null }
        {this.state.pointToPointSelect? null : <i style={{color:"white"}} className="fa fa-square" onClick={() => {this.setState({pointToPointSelect:!this.state.pointToPointSelect}); this.props.changeMode("accessibility") }}/>}
      </div>
    }
  }

  handlePlaceHolder(){
    this.setState({
      isOpen : !this.state.isOpen
    })
  }

  render() {
    return (
      <div className="colBody">
        <div className="colHead" onClick={this.handlePlaceHolder}>
          <i><Fa name="clock-o"/></i>
          Time Map
        </div>

        {/*{ this.state.isOpen?*/}
          {/*<div className="placeHolder" onClick={this.handlePlaceHolder}>*/}
            {/*<div className="bigText">*/}
              {/*<i className="fa fa-clock-o"/>*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*:*/}
          {/*null*/}
        {/*}*/}


        <div className="showToggle">

          <ButtonGroup className="updateStart">
            <Button bsStyle="info" className="update">
              <i><Fa name="refresh"/></i>
              <span> Update</span>
            </Button>

            <Button className="start">
              <i><Fa name="play"/></i>
              <span> Start</span>
            </Button>
          </ButtonGroup>

          <div className="slideContainer">
            <div className="text-center">
              <span>
             <Slider name="timeSlider" min={5} max={115} value={this.state.currentTimeFilter} step={5}
                     className="right" changeFunction={this.changeFeature}  />
                <div>
                  <span style={{position: "absolute", left:10, color:"black"}}>
                    <i><Fa name="step-backward" size="2x"/></i>
                  </span>

                  <span style={{position: "absolute", right:10, color:"black"}}>
                    <i><Fa name="step-forward" size="2x"/></i>
                  </span>

                </div>
              </span>
            </div>
          </div>

          {/*{this.renderMode()}*/}

        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(TimeFilter);

