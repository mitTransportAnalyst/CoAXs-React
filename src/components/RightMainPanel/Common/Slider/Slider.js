import React from "react";
import "./Slider.css";

/**
 * slider component
 */
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.min};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if (this.props.changeFunction){
      this.props.changeFunction(this.props.name,event.target.value)
    }
  }

  render() {
    if (this.props.name === "timeSlider"){
      return (
        <div>
          <span style={{color: "black"}}> {this.props.value} min <input type="range" name={this.props.name}  value={this.props.value} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.handleChange} className="isosRange"/></span>
        </div>
      );
    }
    else{
    return (
      <div>
        <span style={{color: "black"}}>{Math.ceil(this.props.headwayTime)} min   <input type="range" name={this.props.name}  value={this.props.value} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.handleChange} className="isosRange"/></span>
      </div>
    );
    }
  }
}

export default Slider
