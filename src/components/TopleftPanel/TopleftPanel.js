
import React from "react";
import "./TopleftPanel.css"
import Graph from "./Graph"
import {IntroTitle, IntroDescription} from "../../config.js"


class lefttopPanel extends React.Component {
  render() {
    return (
      <div className="topleft">
        <h4 className="topleftText">
          {IntroTitle}
        </h4>
        <div className="topinfo container">
          <div>
            <h5>{IntroDescription}</h5>
          </div>
          <Graph/>

        </div>
      </div>
    );
  }
}

export default lefttopPanel
