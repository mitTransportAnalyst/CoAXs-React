/**
 * Created by xinzheng on 5/8/17.
 */

import React from "react"
import s from "./Legend.css"
import classNames from "classnames"
import {NetworkInfo, CorridorInfo, Color} from "../../../config"

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLegend: true,
    };

    this.handleClickExpend = this.handleClickExpend.bind(this)
  }

  handleClickExpend() {
    this.setState(
      {
        ...this.state,
        showLegend: !this.state.showLegend,
      }
    )
  }

  render() {
    const legendPanelClass = classNames({
      "panel-body-close": !this.state.showLegend,
      "panel-body": this.state.showLegend,
    });

    const legendItems = Object.values(CorridorInfo).map((corridor) => {
      return (
        <div>
          <svg height="10" width="20">
            <line x1="0" y1="5" x2="20" y2="5" style={{stroke: corridor.color, strokeWidth: 4}}/>
          </svg>
          <small className="panel-word">{corridor.fullName}</small>
        </div>
        )
    })

    const legendItemsNetwork = Object.values(NetworkInfo).map((network) => {
      return (
        <div>
          <svg height="10" width="20" >
            <line x1="0" y1="5" x2="20" y2="5" style={{stroke: network.color, strokeWidth: 3}}/>
          </svg>
          <small className="panel-word">{network.name}</small>
        </div>
        )
    })

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

              {legendItems}

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

              {legendItemsNetwork}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Legend;
