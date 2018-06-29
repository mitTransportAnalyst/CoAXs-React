import React from "react";
import s from "./ScenarioEntry.css";
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

//import configuration file
import {CorridorInfo} from "../../../config"

class ScenarioEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let totalbuses = 0;
    // for (let key in this.props.scorecardData) {
    //   totalbuses += Math.ceil(this.props.scorecardData[key])
    // }

    // const tooltipforAlter = (
    //   <Tooltip id="tooltipforAlter"><strong>Route Alternative</strong></Tooltip>
    // );

    // const tooltipforHeadwayValue = (
    //   <Tooltip id="tooltipforHeadwayValue"><strong>Time Between Buses</strong></Tooltip>
    // );

    // const tooltipforBuses = (
    //   <Tooltip id="tooltipforBuses"><strong>Number of vehicles needed</strong></Tooltip>
    // );

    const ScenarioValue = Object.keys(this.props.data).map((corridorKey) => {
      let selectedBuslines = CorridorInfo[corridorKey].buslines.filter(busline => this.props.data[corridorKey].alternative.includes(busline.key))
      let selectedBuslineNames = " "+selectedBuslines.map(busline => busline.name)
      // console.log(selectedBuslineName)
        return (
          <div style={{width: 150, position: "relative", marginTop: 2, marginLeft: 8}} key={corridorKey}>
            <div className="square"
                 style={{padding: 3, fontSize: 13, color: "white", backgroundColor: CorridorInfo[corridorKey].color}}>
              {CorridorInfo[corridorKey].name}
            </div>

            <div className="name">
              {selectedBuslineNames}
            </div>
          </div>
        )
      }
    );

    if (this.props.isCompareMode == this.props.index) {
      return (
        <div className="scenarioEntrySel">
          <div className="entryContainer">
            <div className="subHead scenarioEntrySubHead" style={{color: "white", backgroundColor: "#888888"}}>
              {this.props.index === 0 ? `Base Scenario` : `New Scenario`}
            </div>
            {ScenarioValue}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="scenarioEntry">
          <div className="entryContainer">
            <div className="subHead scenarioEntrySubHead" style={{color: "white", backgroundColor: "#9d9d9d"}}>
              {this.props.index === 0 ? `Base Scenario` : `New Scenario`}
            </div>
            {ScenarioValue}
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    newScenario: state.scenarioStore,
    // headwayTime: state.HeadwayTime,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// export default connect(mapStateToProps, mapDispachToProps)(ScenarioEntry);
export default ScenarioEntry;
