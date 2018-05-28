import React from "react";
import s from "./RouteTable.css";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../../reducers/action';

import {CorridorInfo} from "../../../../config"

class RouteTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuslineClick = this.handleBuslineClick.bind(this);
  }

  handleBuslineClick(busline) {
    this.props.changeBusline({corridor: this.props.currentCorridor, busline: busline})
  }

// Thiago: changed render to reflect the new specification of buslines
  render() {
    return (
      <div className="routeTable">
        {
          CorridorInfo[this.props.currentCorridor].buslines.map((busline, index) => {
            let buslineName = CorridorInfo[this.props.currentCorridor].buslines[index].name
            if (this.props.selectedBusline[this.props.currentCorridor] === busline.key) {
              return (
                <label className="btn btn-xs card" style={{border: "3px solid #FFFFFF"}} key={busline.key}
                       onClick={() => this.handleBuslineClick(busline)}>
                  {buslineName}
                </label>
              )
            }
            else {
              return (
                <label className="btn btn-xs card" key={busline.key} onClick={() => this.handleBuslineClick(busline.key)}>
                  {buslineName}
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
    currentCorridor: state.currentCorridorStore.currentCor,
    selectedBusline: state.BuslineSelectedStore,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(RouteTable);


