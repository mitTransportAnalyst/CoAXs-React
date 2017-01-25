import React from "react";
import "./Slider.css";


class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
      <span style={{color: "black"}}>{this.state.value}</span>
       <span> <input type="range" name={this.props.name} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.handleChange} className="isosRange"/></span>

      </div>
    );
  }
}

export default Slider
