import React from "react";
import s from "./RouteTable.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

import {RouteByID} from '../../../Data/LoadData'


class RouteTable extends React.Component {
  render() {

    return (
      <div className="colBody routeTable">
        <div className="colHead">
        </div>


        { this.props.isOpen ? null : <div className="placeHolder"/> }


        <div className="showToggle">

          <div className="btn-group btn-group-justified">
            <label className="btn" style={{color: "white", backgroundColor: "grey"}}>
              {/*style="background-color: {{variants[tabnav].color}}; color: #FFF"*/}
              <i className="fa fa-line-chart"></i>
              {/*<span >Hide Data</span>*/}
              <span >Show Data</span>
            </label>
          </div>


          {
            RouteByID[this.props.currentCorridor].buslines.map((busline, index) => {
              return (
                <label className="btn btn-xs card" key={busline}>
                  {busline}
                </label>
              )
            })
          }

          <div className="bottomFixed">
          </div>
        </div>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    currentCorridor: state.reducer.currentCor,
    isOpen: state.reducer.currentMap,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(RouteTable);


