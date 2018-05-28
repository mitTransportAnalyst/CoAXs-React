import React from "react";
import s from "./ScenarioEditor.css";
// import RouteTable from "./RouteTable/RouteTable"
// import ServiceEditor from "./ServiceEditor/ServiceEditor"
import {CorridorInfo} from "../../../config"

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class ScenarioEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentCorridor = CorridorInfo[this.props.currentCorridor];
    return (
      <div className="ScenarioEditorCol">
        <div className="colHead">
          {/* <i className="fa fa-pencil-square-o"/> */}
           Visualizar Corredores {CorridorInfo[this.props.currentCorridor].name}
        </div>
        <div className="routesContainer">
          {
            Object.values(CorridorInfo).map((corridor) => {
              if (this.props.currentCorridor === corridor.id) {
                return (
                  <div className="btn routeItemSel" key={corridor.id}
                       style={{border: "3px solid #696969", "backgroundColor": corridor.color, fontSize: 12}}
                       onClick={() => this.props.clickCorridor(corridor.id)}>
                    {corridor.fullName}
                  </div>
                )
              }
              else {
                return (
                  <div className="btn routeItem" key={corridor.id}
                       style={{"backgroundColor": corridor.color, fontSize: 12}}
                       onClick={() => this.props.clickCorridor(corridor.id)}>
                    {corridor.fullName}
                  </div>
                )
              }
            })
          }
        </div>
        {/* <RouteTable/> */}
        {/* <ServiceEditor/> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCorridor: state.currentCorridorStore.currentCor,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ScenarioEditor);


