

import React from "react";
import "./Slider.css";


class Slider extends React.Component {
  render() {
    return (
      <input type="range" name={this.props.name} min={this.props.min} max={this.props.max} step={this.props.step} className="isosRange"/>
    );
  }
}

export default Slider
