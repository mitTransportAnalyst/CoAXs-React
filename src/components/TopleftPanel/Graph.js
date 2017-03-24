/**
 * Created by xinzheng on 3/23/17.
 */

import React from "react";
import Fa from "react-fontawesome";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "Recharts";


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

    let data =[
      {name: 'Job A', job:null},
      {name: ''},
    ];

    data[0].job = this.props.gridNumber;

    const scale = 'ordinal';
    return (
    <div style={{fontcolor: "white"}}>
      { this.props.gridNumber != null ?
      <BarChart width={300} height={500} data={data}
                margin={{top: 50, right: 30, left: 0, bottom: 5}} style={{color: "white"}}>
        <XAxis dataKey="name" stroke="white"/>
        <YAxis stroke="white" type="number" domain={[0, 200000]}/>
        <CartesianGrid strokeDasharray="3 3"/>
        {/*<Tooltip/>*/}
        {/*<Legend />*/}
        <Bar dataKey="job" fill="#facd7a" isAnimationActive={false}/>
      </BarChart> : null
      }
    </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    gridNumber: state.GridNumberStore.gridNumber,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Graph);

