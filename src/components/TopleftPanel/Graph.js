/**
 * Created by xinzheng on 3/23/17.
 */

import React from "react";
import Fa from "react-fontawesome";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../reducers/action';


class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }



  render() {


    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined ){
      var data =[
        {name: 'Base Scenario', job:null},
        {name: 'New Scenario', job:null},
      ];
    }
    else{
      var data =[
        {name: 'New Scenario', job:null},
      ];
    }


    data[0].job = this.props.gridNumber;

    if (this.props.isCompareMode && this.props.gridNumber1 !== undefined ){
      data[0].job = this.props.gridNumber1;
      data[1].job = this.props.gridNumber;

    }


    const scale = 'ordinal';
    const tooltipFormatter = (value) => ( value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
    // function numberWithCommas(x) {
    //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    return (





    <div style={{fontcolor: "white"}}>

      { this.props.gridNumber != null ?
      <BarChart width={300} height={window.innerHeight * 0.55} data={data}
                margin={{top: 50, right: 30, left: 0, bottom: 5}} style={{color: "white"}}>
        <XAxis dataKey="name" stroke="white"/>
        <YAxis stroke="white" type="number" domain={[0, 400000]} tickFormatter={tooltipFormatter}/>

        <CartesianGrid strokeDasharray="3 3"/>
        {/*<Tooltip/>*/}
        {/*<Legend />*/}
        <Bar dataKey="job" fill="#facd7a" isAnimationActive={false}/>

      </BarChart> : null
      }


      {/*<Bar dataKey="job" fill="#2eadd3" isAnimationActive={false}/>*/}

    </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    gridNumber: state.GridNumberStore.gridNumber,
    gridNumber1: state.GridNumberStore.gridNumber1,

    isCompareMode: state.isCompare.isCompare,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Graph);

