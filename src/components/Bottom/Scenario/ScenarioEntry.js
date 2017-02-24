import React from "react";
import s from "./ScenarioEntry.css";

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


    var ScenarioValue = Object.keys(this.props.data).map((corridorKey) =>{

        return (<div style={{width: 100, position: "relative"}} key={corridorKey}>
          <div className="square" style={{color: "#555555", backgroundColor:CorridorInfo[corridorKey].color}}>
            {corridorKey}
          </div><small>R: {this.props.data[corridorKey].runningTime} | D:{this.props.data[corridorKey].dwellTime}   | H:{this.props.data[corridorKey].headway}  </small>
            <div></div>

        </div>
        )
      }
      );


      return (
        <div style={{display: "inline-block", whiteSpace: "nowrap", width:100}} onClick={() => this.props.selectScenario(this.props.index)}>


          <div className="subHead">
            Scenario {this.props.index + 1}
          </div>


          {ScenarioValue}

          {/*<div class="text-center" style="position:absolute;width:100%;z-index:10;bottom:2px;"*/}
               {/*ng-show="combos.sel !== combo._key && combos.com !== combo._key &&  scenarioCompare"*/}
               {/*ng-click="combos.com=combo._key; $event.stopPropagation();updateComScenario(combos.com)">*/}
            {/*<i ng-show="!combos.com" class="fa fa-circle-o faa-pulse animated"></i>*/}
            {/*<i ng-show="combos.com" class="fa fa-circle-o"></i>*/}
          {/*</div>*/}
          {/*<div class="text-center" style="position:absolute;width:100%;z-index:10;bottom:2px;"*/}
               {/*ng-show="combos.sel !== combo._key && combos.com == combo._key &&  scenarioCompare"*/}
               {/*ng-click="combos.com=null; $event.stopPropagation()">*/}
            {/*<i class="fa fa-check-circle"></i>*/}
          {/*</div>*/}
        </div>


  );
  }
  }


  function mapStateToProps(state) {
    return {
    newScenario: state.scenarioStore,
  }
  }

  function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }


  // export default connect(mapStateToProps, mapDispachToProps)(ScenarioEntry);
export default ScenarioEntry;


