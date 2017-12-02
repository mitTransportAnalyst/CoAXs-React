/**
 * Created by xinzheng on 5/5/17.
 */

import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Cell} from "recharts";
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class GraphPTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isCompareMode && this.props.gridNumberNew !== undefined) {
      var data = [
        {name: 'Base Scenario', job: null},
        {name: 'New Scenario', job: null},
      ];
    }
    else {
      var data = [
        {name: 'Baseline Scenario', job: null},
      ];
    }

    data[0].job = this.props.gridNumberBase;
    if (this.props.isCompareMode && this.props.gridNumberNew !== undefined) {
      data[1].job = this.props.gridNumberNew;
    }

    const scale = 'ordinal';
    const tooltipFormatter = (value) => ( value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
    const tooltipforTravelTime = (
      <Tooltip id="tooltipforTravelTime"><strong> This represents the average of the total minutes of door to door
        travel time, including walking, waiting, and taking public transit, if someone were to leave any time between 7
        and 9am.</strong></Tooltip>
    );

    return (
      <div>
        <br/>
        <div style={{marginTop: -20, marginLeft: 8}}>
          <h5>Travel Time (minutes)
            <OverlayTrigger placement="bottom" overlay={tooltipforTravelTime}>
              <i className="fa fa-question-circle-o questionMark"/>
            </OverlayTrigger>
          </h5>
          <BarChart width={392} height={200} data={data} layout="vertical">
            <XAxis stroke="black" type="number" domain={[0, 200]} tickFormatter={tooltipFormatter}/>
            <YAxis dataKey="name" stroke="black" type="category"/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Bar dataKey="job" fill="#facd7a" isAnimationActive={false} label layout="vertical">
              {
                data.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a'} key={`cell-${index}`}/>
                ))
              }
            </Bar>
          </BarChart>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gridNumberBase: state.GridNumberStore.gridNumberBase,
    gridNumberNew: state.GridNumberStore.gridNumberNew,
    isCompareMode: state.isCompare.isCompare,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(GraphPTP);

