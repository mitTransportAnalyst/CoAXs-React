

import React from "react";
import Fa from "react-fontawesome";
import "./TimeFilter.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import Slider from "../Common/Slider/Slider"


class TimeFilter extends React.Component {
  render() {
    return (
      <div className="colBody">
        <div className="colHead">
          <i><Fa name="clock-o"></Fa></i>
          Time Map
        </div>


        {/*<div className="placeHolder">*/}
        {/*<div className="bigText">*/}
        {/*<i className="fa fa-clock-o"></i>*/}
        {/*</div>*/}
        {/*</div>*/}


        <div className="showToggle">
          <ButtonGroup className="updateStart">
            <Button bsStyle="info" className="update">
              <i><Fa name="refresh"></Fa></i>
              <span> Update</span>
            </Button>

            <Button className="start">
              <i><Fa name="play"></Fa></i>
              <span> Start</span>
            </Button>
          </ButtonGroup>

          <div className="slideContainer">
            <div className="text-center">
              <span>
                <Slider name="timeSlider" min={5} max={115} step={5}/>

                <div>
                  <span style={{position: "absolute", left:10, color:"black"}}>
                    <i><Fa name="step-backward" size="2x"></Fa></i>
                  </span>

                  <span style={{position: "absolute", right:10, color:"black"}}>
                    <i><Fa name="step-forward" size="2x"></Fa></i>
                  </span>

                </div>
              </span>
            </div>
          </div>

          <div style={{color:"black", marginTop:30}}>
            Point-to-point mode:
            {/*<i className="fa fa-check-square"></i>*/}
            <i style={{color:"white", paddingLeft:6}} className="fa fa-square"></i>
          </div>

        </div>
      </div>

    );
  }
}

export default TimeFilter
