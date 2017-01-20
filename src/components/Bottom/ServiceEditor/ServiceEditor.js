import React from "react";
import s from "./ServiceEditor.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import Slider from "../Common/Slider/Slider"


class ServiceEditor extends React.Component {
  render() {
    return (
      <div className="colBody" id="service-tab">
        <div className="colHead">
          <i className="fa fa-pencil-square-o"></i>
          Service Editor
        </div>


        {/*// <div className="placeHolder">*/}
        {/*//   <div className="bigText">*/}
        {/*//   <i className="fa fa-pencil-square-o"></i>*/}
        {/*//   </div>*/}
        {/*//   </div>*/}

        {/*// <div className="showToggle">*/}


        <div className="btn-group btn-group-justified">
          <div className="btn" >
            {/*style="width:300px; color:{{variants[tabnav].color}}; background-color:{{variants[tabnav].color}}"*/}
            <i className="fa fa-level-down "/>
          </div>

          <div className="btn btn-info" style={{width: 150, position: "absolute", right: 0}}>
            <i className="fa fa-save"/> Save
          </div>
        </div>


        <div>

          <div className="setTimesTitle">
            <div className="subHead">
              Running time change (segment only)
            </div>
            <div>
              <div style={{marginTop: -2}}>

                <div style={{width: 60, display: "inline-block"}}>
                  {/*<img src="public/media/runningtime.png" style={{height: 35}}/>*/}
                </div>
                <div style={{width: "75%", display: "inline-block", marginTop: 2}}>
                  <Slider name="running" min="0" max="60" value = "0" step="5" className="right"/>

                  {/*<input type="range" min="0" max="60" value="0" step="5" style="margin-top: 10px;" className="right"/>*/}
                  <i className="fa fa-arrow-down"></i>
                  {/*{{currentParam[tabnav].runningTime}}%*/}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={{marginTop: 1}}>

          <div className="setTimesTitle">

            <div className="subHead">
              Dwell time change (all stops for all corridor routes)
            </div>

            <div>
              <div style={{paddingTop: 1}}>
                <div style={{width: 60, display: "inline-block"}}>
                  {/*<img src="public/media/dwelltime.png" style="height:35px"/>*/}
                </div>
                <div style={{width: "75%", display: "inline-block", marginTop: 2}}>
                  <Slider name="dwell" min="0" max="75" value = "0" step="5" className="right"/>

                  <i className="fa fa-arrow-down"></i>
                  {/*{{currentParam[tabnav].dwell}}%*/}
                </div>
              </div>
            </div>


          </div>

        </div>

        <div style={{marginTop: 1}}>

          <div className="setTimesTitle">

            <div className="subHead">
              Headway change (all corridor routes)
            </div>

            <div>
              <div style={{paddingTop: 1}}>
                <div style={{width: 60, display: "inline-block"}}>
                  {/*<img src="public/media/frequency.png" style={{height: 35}}/>*/}
                </div>
                <div style={{width: "75%", display: "inline-block", marginTop: 2}}>
                  <Slider name="dwell" min="0" max="75" value = "0" step="5" className="right"/>

                  <i className="fa fa-arrow-down"></i>
                  {/*{{currentParam[tabnav].headway}}%*/}
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>





    );
  }
}

export default ServiceEditor
