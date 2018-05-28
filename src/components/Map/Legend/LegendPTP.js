/**
 * Created by xinzheng on 5/8/17.
 */

import React from "react";
import s from "./Legend.css";
import classNames from "classnames"

class LegendPTP extends React.Component {
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
                <small className="panel-word">RTA #16 S. Claiborne</small>
              </div>

              <div>
                <svg height="10" width="20">
                  <line x1="0" y1="5" x2="20" y2="5" style={{stroke: "#2eadd3", strokeWidth: 5}}/>
                </svg>
                <small className="panel-word">JeT #E3 Kenner Local</small>
              </div>

              <div>
                <svg height="10" width="20">
                  <line x1="0" y1="5" x2="20" y2="5" style={{stroke: "#8d6aa8", strokeWidth: 5}}/>
                </svg>
                <small className="panel-word">JeT #E5 Causeway</small>
              </div>

              <div>
                <svg height="10" width="20">
                  <line x1="0" y1="5" x2="20" y2="5" style={{stroke: "#f1d3e9", strokeWidth: 2}}/>
                </svg>
                <small className="panel-word">Transporte Público</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LegendPTP;


