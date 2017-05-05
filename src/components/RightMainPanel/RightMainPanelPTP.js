/**
 * Created by xinzheng on 5/5/17.
 */
import React from "react";
import s from "./RightMainPanel.css"
import TimeFilterPTP from "./TimeFilter/TimeFilterPTP"
import Scenario from "./Scenario/Scenario"
import ScenarioEditor from "./ScenarioEditor/ScenarioEditor"

class RightMainPanelPTP extends React.Component {
  render() {
    return (
      <div className="rightMainPanel">
        <ScenarioEditor/>
        <Scenario/>
        <TimeFilterPTP/>

      </div>
    );
  }
}

export default RightMainPanelPTP;
