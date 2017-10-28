import React from "react";
import "./TimeFilter.css";
import Slider from "../Common/Slider/Slider"
import Graph from "./Graph"

import {PointToPoint, Accessibility} from "../../../config"

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class TimeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimeFilter: 30,
    };

    this.changeFeature = this.changeFeature.bind(this)
  }

  changeFeature(feature, value) {
    this.setState({
      currentTimeFilter: value,
    });
    this.props.changeTimeFilter(value);
  }

  render() {
    return (
      <div className="timeFilterPanel">
        <div className="colHead">
          <i className="fa fa-clock-o"/>
          Time Map
        </div>

        <div>
          <div className="" style={{margin: 8}}>
            <div className="">
              <span >
             <Slider name="timeSlider" min={5} max={90} value={this.state.currentTimeFilter} step={5}
                     className="right" changeFunction={this.changeFeature}/>
                <div>
                </div>
              </span>
            </div>
          </div>
          {this.props.gridNumber !== undefined ? <Graph/> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gridNumber: state.GridNumberStore.gridNumber,
    gridNumber1: state.GridNumberStore.gridNumber1,

  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(TimeFilter);

