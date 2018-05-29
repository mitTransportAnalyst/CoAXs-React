/**
 * Created by xinzheng on 3/23/17.
 */

import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Cell} from "recharts";
import GraphLabel from "./GraphLabel"
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tooltipforJob = (
      <Tooltip id="tooltipforJob"><strong>The total number of jobs that can be reached is based on U.S. census
        data</strong></Tooltip>
    );

    let data = [
    //   {name: 'Base', job: this.props.gridNumberBase},
    // ];

    // if (this.props.isCompareMode && this.props.gridNumberNew !== undefined) {
    //   data = [
        {name: 'Base', job: this.props.gridNumberBase},
        {name: 'Escenario', job: this.props.gridNumberNew},
      ];
    // }

    const scale = 'ordinal';
    const axisFormatter = (value) => (value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    return (
      <div>
        <br/>
        <div style={{marginTop: -20, marginLeft: 8}}>

          <h5>Oportunidades Accesibles
            {/* <OverlayTrigger placement="bottom" overlay={tooltipforJob}>
              <i className="fa fa-question-circle-o questionMark"/>
            </OverlayTrigger> */}
          </h5>

          <BarChart width={392} height={200} data={data} layout="vertical">
            <XAxis stroke="black" type="number" domain={[0, 400000]} tickFormatter={axisFormatter}/>
            <YAxis dataKey="name" stroke="black" type="category"/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Bar dataKey="job" fill="#facd7a" isAnimationActive={false} label={<GraphLabel/>} layout="vertical">
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

export default connect(mapStateToProps, mapDispachToProps)(Graph);

