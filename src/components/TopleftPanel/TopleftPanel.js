
import React from "react";
import "./TopleftPanel.css"

class lefttopPanel extends React.Component {
  render() {
    return (
      <div className="topleft">
        <h4 className="topleftText">
          <b>CoAXs</b> | Bus Priority
        </h4>
        <div className="topinfo container">
          <div>
            <h5>Showing door-to-door travel, with MBTA weekday morning schedule as baseline.</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default lefttopPanel
