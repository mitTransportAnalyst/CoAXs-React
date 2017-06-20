/**
 * Created by xinzheng on 3/23/17.
 */

import React from "react";
import Fa from "react-fontawesome";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Cell,Tooltip} from "recharts";
import GraphLabel from "./GraphLabel"
import { OverlayTrigger} from 'react-bootstrap';


//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';


class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {


    // const tooltipforJob = (
    //   <Tooltip id="tooltipforJob"><strong>The total number of jobs that can be reached is based on U.S. census
    //     data</strong></Tooltip>
    // );


    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined) {
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


    data[0].job = this.props.gridNumber;

    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined) {
      data[1].job = this.props.gridNumber1;
    }


    //EDU
    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined) {
      var dataedu = [
        {name: 'Base Scenario', edu3060: null, edu6075: null, edu7590: null, edunorank: null, },
        {name: 'New Scenario', edu3060: null, edu6075: null, edu7590: null, edunorank: null,},
      ];
    }
    else {
      var dataedu = [
        {name: 'Baseline Scenario', edu3060: null, edu6075: null, edu7590: null, edunorank: null,},
      ];
    }
    dataedu[0].edu3060 = this.props.edu3060;
    dataedu[0].edu6075 = this.props.edu6075;
    dataedu[0].edu7590 = this.props.edu7590;
    dataedu[0].edunorank = this.props.edunorank;

    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined) {
      dataedu[1].edu3060 = this.props.edu30601;
      dataedu[1].edu6075 = this.props.edu60751;
      dataedu[1].edu7590 = this.props.edu75901;
      dataedu[1].edunorank = this.props.edunorank1;    }

    //Health
    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined) {
      var datahet = [
        {name: 'Base Scenario', hetpri: null, hetsec: null, hetter: null, },
        {name: 'New Scenario', hetpri: null, hetsec: null, hetter: null, },
      ];
    }
    else {
      var datahet = [
        {name: 'Baseline Scenario', hetpri: null, hetsec: null, hetter: null, },
      ];
    }
    datahet[0].hetpri = this.props.hetpri;
    datahet[0].hetsec = this.props.hetsec;
    datahet[0].hetter = this.props.hetter;

    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined) {
      datahet[1].hetpri = this.props.hetpri1;
      datahet[1].hetsec = this.props.hetsec1;
      datahet[1].hetter = this.props.hetter1;
    }





    // for test
    // var data = [
    //   {name: 'Base Scenario', job: 150000},
    //   {name: 'New Scenario', job: 200000},
    // ];


    const scale = 'ordinal';
    const axisFormatter = (value) => (value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));


    return (
      <div >
        <br/>
        <div style={{marginTop: -20, marginLeft: 8}}>

          <h5>Jobs Reachable
            {/*<OverlayTrigger placement="bottom" overlay={tooltipforJob}>*/}
              {/*<i className="fa fa-question-circle-o questionMark"/>*/}
            {/*</OverlayTrigger>*/}

          </h5>



          {/*JOB*/}
          <BarChart width={392} height={200} data={data} layout="vertical">

            <XAxis stroke="black" type="number" domain={[0, 70000]} tickFormatter={axisFormatter}/>
            <YAxis dataKey="name" stroke="black" type="category"/>

            <CartesianGrid strokeDasharray="3 3"/>

            <Bar dataKey="job" fill="#facd7a" isAnimationActive={false} label={<GraphLabel/>} layout="vertical">
              {
                data.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell-${index}`}/>
                ))
              }
            </Bar>

          </BarChart>


          <h5>Education Reachable
            {/*<OverlayTrigger placement="bottom" overlay={tooltipforJob}>*/}
            {/*<i className="fa fa-question-circle-o questionMark"/>*/}
            {/*</OverlayTrigger>*/}

          </h5>

          {/*EDU*/}

          <BarChart width={392} height={200} data={dataedu} layout="vertical">

            <XAxis stroke="black" type="number" domain={[0, 10000]} tickFormatter={axisFormatter}/>
            <YAxis dataKey="name" stroke="black" type="category"/>

            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            {/*<Legend />*/}

            <Bar dataKey="edu3060" stackId="a"  fill="#696969" isAnimationActive={false}  >
              {
                dataedu.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell2-${index}`}/>
                ))
              }
            </Bar>

            <Bar dataKey="edu6075" stackId="a"  fill="#696969" isAnimationActive={false}  >
              {
                dataedu.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell3-${index}`}/>
                ))
              }
            </Bar>

            <Bar dataKey="edu7590" stackId="a"  fill="#696969" isAnimationActive={false}  >
              {
                dataedu.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell4-${index}`}/>
                ))
              }
            </Bar>


            <Bar dataKey="edunorank" stackId="a"  fill="#696969" isAnimationActive={false} >
              {
                data.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell5-${index}`}/>
                ))
              }
            </Bar>

          </BarChart>



          <h5>Health Reachable
            {/*<OverlayTrigger placement="bottom" overlay={tooltipforJob}>*/}
            {/*<i className="fa fa-question-circle-o questionMark"/>*/}
            {/*</OverlayTrigger>*/}

          </h5>

          {/*HEALTH*/}

          <BarChart width={392} height={200} data={datahet} layout="vertical">

            <XAxis stroke="black" type="number" domain={[0, 1000]} tickFormatter={axisFormatter}/>
            <YAxis dataKey="name" stroke="black" type="category"/>

            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            {/*<Legend />*/}

            <Bar dataKey="hetpri" stackId="a"  fill="#696969" isAnimationActive={false}  >
              {
                datahet.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell6-${index}`}/>
                ))
              }
            </Bar>

            <Bar dataKey="hetsec" stackId="a"  fill="#696969" isAnimationActive={false}  >
              {
                datahet.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell7-${index}`}/>
                ))
              }
            </Bar>

            <Bar dataKey="hetter" stackId="a"  fill="#696969" isAnimationActive={false}  >
              {
                datahet.map((entry, index) => (
                  <Cell fill={index === 0 ? '#2eadd3' : '#facd7a' } key={`cell8-${index}`}/>
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
    gridNumber: state.GridNumberStore.gridNumber,
    gridNumber1: state.GridNumberStore.gridNumber1,
    edu3060: state.GridNumberStore.edu3060,
    edu30601: state.GridNumberStore.edu30601,
    edu6075: state.GridNumberStore.edu6075,
    edu60751: state.GridNumberStore.edu60751,
    edu7590: state.GridNumberStore.edu7590,
    edu75901: state.GridNumberStore.edu75901,
    edunorank: state.GridNumberStore.edunorank,
    edunorank1: state.GridNumberStore.edunorank1,
    hetpri: state.GridNumberStore.hetpri,
    hetpri1: state.GridNumberStore.hetpri1,
    hetsec: state.GridNumberStore.hetsec,
    hetsec1: state.GridNumberStore.hetsec1,
    hetter: state.GridNumberStore.hetter,
    hetter1: state.GridNumberStore.hetter1,
    isCompareMode: state.isCompare.isCompare,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Graph);

