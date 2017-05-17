import React from "react";
import s from "./ScenarioEditor.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import {corridorInfo} from '../../../Data/LoadData'
import RouteTable from "./RouteTable/RouteTable"
import ServiceEditor from "./ServiceEditor/ServiceEditor"
import {CorridorInfo} from "../../../config"

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';
import {cloneDeep} from 'lodash';
import classNames from "classnames"


class ScenarioEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickCorridor = this.handleClickCorridor.bind(this)
  }


  componenetDidMount() {
    this.props.clickCorridor("A");
  }

  handleClickCorridor(corridorID){
      let newScenario = cloneDeep(this.props.scenarioStore[1]);
      newScenario[corridorID].active = !this.props.scenarioStore[1][corridorID].active;
      this.props.saveScenario(newScenario)
  }


  render() {
    let currentCorridor = CorridorInfo[this.props.currentCorridor];

    const AClass = classNames({
      "routeItem": true,
      "btn": true,
      "routeItemSel": this.props.scenarioStore[1].A.active,
    });

    const BClass = classNames({
      "routeItem": true,
      "btn": true,
      "routeItemSel": this.props.scenarioStore[1].B.active,
    });


    const CClass = classNames({
      "routeItem": true,
      "btn": true,
      "routeItemSel": this.props.scenarioStore[1].C.active,
    });


    const DClass = classNames({
      "routeInfill" : true,
      "routeItem": true,
      "btn": true,
      "routeItemSel": this.props.scenarioStore[1].D.active,
    });


    const EClass = classNames({
      "routeInfill" : true,
      "routeItem": true,
      "btn": true,
      "routeItemSel": this.props.scenarioStore[1].E.active,
    });


    return (
      <div className="ScenarioEditorCol">


        <div className="colHead">
          <i className="fa fa-pencil-square-o"/>
          Service Editor
        </div>


        <div className="routesContainer">

          <div className={AClass}
               style={{ "backgroundColor": corridorInfo["A"].color, fontSize: 14}}
               onClick={()=>this.handleClickCorridor(corridorInfo["A"].id)}>
            {corridorInfo["A"].fullName}
          </div>

          <div className={BClass}
               style={{ "backgroundColor": corridorInfo["B"].color, fontSize: 14}}
               onClick={()=>this.handleClickCorridor(corridorInfo["B"].id)}>
            {corridorInfo["B"].fullName}
          </div>

          <div className={CClass}
               style={{ "backgroundColor": corridorInfo["C"].color, fontSize: 14}}
               onClick={()=>this.handleClickCorridor(corridorInfo["C"].id)}>
            {corridorInfo["C"].fullName}
          </div>


          <div className={DClass}
               style={{ "backgroundColor": corridorInfo["D"].color, fontSize: 14}}
               onClick={()=>this.handleClickCorridor(corridorInfo["D"].id)}>
            {corridorInfo["D"].fullName}
          </div>


          <div className={EClass}
               style={{ "backgroundColor": corridorInfo["E"].color, fontSize: 14}}
               onClick={()=>this.handleClickCorridor(corridorInfo["E"].id)}>
            {corridorInfo["E"].fullName}
          </div>


        </div>


      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentCorridor: state.reducer.currentCor,
    scenarioStore: state.scenarioStore,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ScenarioEditor);


