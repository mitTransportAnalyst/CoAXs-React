
import React from "react";
import "./TopleftPanel.css"
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
        </div>
      </div>
    );
  }
}

export default lefttopPanel
