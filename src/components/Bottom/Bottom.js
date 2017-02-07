import React from "react";
import "./Bottom.css"
import TimeFilter from "./TimeFilter/TimeFilter"
import Scenario from "./Scenario/Scenario"
import RouteSelector from "./RouteSelector/RouteSelector"
import RouteTable from "./RouteTable/RouteTable"
import ServiceEditor from "./ServiceEditor/ServiceEditor"

class Bottom extends React.Component {
  render() {
    return (
      <div className="bottomCol">
        <TimeFilter/>
        <Scenario/>
        <RouteSelector/>
        <RouteTable/>
        <ServiceEditor/>
      </div>
    );
  }
}

export default Bottom
