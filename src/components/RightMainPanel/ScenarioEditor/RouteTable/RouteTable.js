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

  render() {
    return (
      <div className="routeTable">
        {
          CorridorInfo[this.props.currentCorridor].buslines.map((busline, index) => {
            if (this.props.selectedBusline[this.props.currentCorridor] === busline.slice(0, 3)) {
              return (
                <label className="btn btn-xs card" style={{border: "3px solid #eec16f"}} key={busline}
                       onClick={() => this.handleBuslineClick(busline)}>
                  {busline}
                </label>
              )
            }
            else {
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
    currentCorridor: state.currentCorridorStore.currentCor,
    selectedBusline: state.BuslineSelectedStore,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(RouteTable);


