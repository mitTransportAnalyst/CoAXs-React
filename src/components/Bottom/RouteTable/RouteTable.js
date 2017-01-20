import React from "react";
import s from "./RouteTable.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'


class RouteTable extends React.Component {
  render() {
    return (
      <div className="colBody routeTable">
        <div className="colHead">
        </div>

        <div className="placeHolder">
        </div>

        <div className="showToggle">

          <div className="btn-group btn-group-justified">
            <label className="btn" style={{color: "white", backgroundColor:"grey"}} >
              {/*style="background-color: {{variants[tabnav].color}}; color: #FFF"*/}
              <i className="fa fa-line-chart"></i>
              {/*<span >Hide Data</span>*/}
              <span >Show Data</span>
            </label>
          </div>

          <label className="btn btn-xs card">

          </label>

          <div className="bottomFixed">
          </div>
        </div>
      </div>

    );
  }
}

export default RouteTable
