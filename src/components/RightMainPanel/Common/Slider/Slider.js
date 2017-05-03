import React from "react";
import "./Slider.css";


/**
 * slider component
 */
class Slider extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    /**
     * @type {object}
     * @property {number} [value=this.props.min] - save the slider value, set it to minimal at default
     */
    this.state = {value: this.props.min};
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * handle move the slider
   * @param {SytheticEvent} event
   */
  handleChange(event) {
    this.setState({value: event.target.value});
    if (this.props.changeFunction){
      this.props.changeFunction(this.props.name,event.target.value)
    }
  }

  /**
   * render
   * @return {ReactElement} input slider
   */
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
        <span style={{color: "black"}}>{this.props.value}%   <input type="range" name={this.props.name}  value={this.props.value} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.handleChange} className="isosRange"/></span>
      </div>
    );
    }
  }
}

export default Slider
