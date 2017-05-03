import React from "react";
import s from "./RouteTable.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../../reducers/action';

import {RouteByID} from '../../../../Data/LoadData'


class RouteTable extends React.Component {

  constructor(props) {
    super(props);
    this.handleBuslineClick = this.handleBuslineClick.bind(this);

  }



  handleBuslineClick(busline){
    this.props.changeBusline({corridor: this.props.currentCorridor, busline: busline})
  }

  render() {
    let totalbuses = 0;
    for (let key in this.props.scorecardData ){
      totalbuses += Math.ceil(this.props.scorecardData[key])
    }

    return (
      <div className="routeTable">


        {/*{ this.props.isOpen ? null : <div className="placeHolder"/> }*/}



          {/*<div className="btn-group btn-group-justified">*/}
            {/*<label className="btn" style={{color: "white", backgroundColor: "grey"}}>*/}
              {/*/!*style="background-color: {{variants[tabnav].color}}; color: #FFF"*!/*/}
              {/*<i className="fa fa-line-chart"/>*/}
              {/*/!*<span >Hide Data</span>*!/*/}
              {/*<span>Total number of buses: {totalbuses}</span>*/}
            {/*</label>*/}
          {/*</div>*/}


          {
            RouteByID[this.props.currentCorridor].buslines.map((busline, index) => {
              if (this.props.BuslineProps[this.props.currentCorridor] === busline.slice(0,3)){
                return (
                  <label className="btn btn-xs card" style={{border:"3px solid #eec16f"}} key={busline} onClick={() => this.handleBuslineClick(busline)}>
                    {busline}
                  </label>
                )
              }
              else{
                return (
                  <label className="btn btn-xs card" key={busline} onClick={() => this.handleBuslineClick(busline)}>
                    {busline}
                  </label>
                )
              }
            })
          }


        </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    currentCorridor: state.reducer.currentCor,
    BuslineProps: state.changeBusline,
    scorecardData: state.ScorecardData,

  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(RouteTable);


