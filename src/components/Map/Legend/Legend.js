/**
 * Created by xinzheng on 5/8/17.
 */

import React from "react";
import s from "./Legend.css";
import classNames from "classnames"

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';


class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLegend: false,
    };
    this.handleClickExpend = this.handleClickExpend.bind(this)


  }


  handleClickExpend(){
    this.setState(
      {...this.state,
        showLegend: !this.state.showLegend,
      }
    )
  }

  render() {
    const legendPanelClass = classNames({
      "panel-body-close": !this.state.showLegend,
      "panel-body": this.state.showLegend,
    });

    return (
      <div className="topnav">


        <div className="legend">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h6 className="panel-title">
                Legend
                <i className="fa fa-expand pull-right" onClick={this.handleClickExpend}/>
              </h6>
            </div>


            <div className={legendPanelClass}>
              <div>
                <svg height="10" width="20">
                  <line x1="0" y1="5" x2="20" y2="5" style={{stroke: "#555555", strokeWidth: 5}}/>
                </svg>
                <small className="panel-word">Route 16</small>
              </div>


              <div>
                <svg height="10" width="20">
                  <line x1="0" y1="5" x2="20" y2="5" style={{stroke: "#2eadd3", strokeWidth: 5}}/>
                </svg>
                <small className="panel-word">Route E3</small>
              </div>

              <div>
                <svg height="10" width="20">
                  <line x1="0" y1="5" x2="20" y2="5" style={{stroke: "#8d6aa8", strokeWidth: 5}}/>
                </svg>
                <small className="panel-word">Route E5</small>
              </div>


              <div>
                <svg width="20" height="20">
                  <rect width="20" height="20" style={{fill: "#89cff0", strokeWidth: 3, stroke: "#45b3e7"}}/>
                </svg>
                <small className="panel-word">Baseline accessiblity area</small>
              </div>

              <div>
                <svg width="20" height="20">
                  <rect width="20" height="20" style={{fill: "#FDB813", strokeWidth: 3, stroke: "#F68B1F"}}/>
                </svg>
                <small className="panel-word">New scenario accessiblity area</small>
              </div>


              <div>
                <svg height="10" width="20">
                  <line x1="0" y1="5" x2="20" y2="5" style={{stroke: "#f1d3e9", strokeWidth: 2}}/>
                </svg>
                <small className="panel-word">Transit network</small>
              </div>

            </div>

          </div>
        </div>
      </div>


    );
  }
}


function mapStateToProps(state) {
  return {}
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Legend);


