
import React from "react";
import "./TopleftPanel.css"
// import Graph from "../RightMainPanel/TimeFilter/Graph"
import {IntroTitle, IntroDescription} from "../../config.js"


class lefttopPanel extends React.Component {
  render() {
    return (
      <div className="topleft">
        <h4 className="topleftText">
          {IntroTitle}
        </h4>
      </div>
    );
  }
}

export default lefttopPanel
