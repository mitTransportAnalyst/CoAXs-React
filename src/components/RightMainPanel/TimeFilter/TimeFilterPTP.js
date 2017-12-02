/**
 * Created by xinzheng on 5/5/17.
 */

import React from "react";
import "./TimeFilter.css";
import GraphPTP from "./GraphPTP"

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class TimeFilterPTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimeFilter: 30,
    };
  }

  render() {
    return (
      <div className="timeFilterPanel">
        <div className="colHead">
          <i className="fa fa-clock-o"/>
          Time Map
        </div>
        <div>
          {this.props.gridNumberBase !== null ? <GraphPTP/> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gridNumberBase: state.GridNumberStore.gridNumberBase,
    gridNumberNew: state.GridNumberStore.gridNumberNew,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(TimeFilterPTP);

