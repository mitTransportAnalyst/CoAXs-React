import React from "react";
import s from "./RouteSelector.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'


class RouteSelector extends React.Component {
  render() {
    return (
      <div className="colBody routeSelector">

        <div className="colHead">
          <div className="fa-stack" >
            <i className="fa-stack" style={{color: "black"}}></i>
          </div>
        </div>

        {/*<div className="placeHolder">*/}
          {/*<div className="bigText">*/}
          {/*</div>*/}
        {/*</div>*/}

        <div className="showToggle">

          <div>
            <label className="btn tiny"  style={{backgroundColor:"grey", width: "100%"}}>
              <i className="fa fa-level-down fa-flip-horizontal" ></i>
            </label>
            {/*<div className="smallColVal" style="color:#FFF;background-color:{{variant.color}};font-size: 16px; padding: 8px;">*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default RouteSelector
