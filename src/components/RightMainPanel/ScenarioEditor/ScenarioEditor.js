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

class ScenarioEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componenetDidMount() {
    this.props.clickCorridor("A");
  }


  render() {
    let currentCorridor = CorridorInfo[this.props.currentCorridor];
    return (
      <div className="ScenarioEditorCol">


        {/*<div className="placeholder">*/}
        {/*</div>*/}


        <div className="colHead">
          <i className="fa fa-pencil-square-o"/>
          Service Editor - Editing Route {CorridorInfo[this.props.currentCorridor].name}
        </div>


        {/*{ this.props.isOpen ? null : <div className="placeHolder"/> }*/}


        <div className="routesContainer">
          {/*<label className="btn tiny" style={{backgroundColor: "grey", width: "100%"}}>*/}
          {/*<i className="fa fa-level-down fa-flip-horizontal"></i>*/}
          {/*</label>*/}


          {
            Object.values(corridorInfo).map((corridor) => {
              if (this.props.currentCorridor === corridor.id) {
                return (
                  <div className="btn routeItem" key={corridor.id}
                       style={{border: "3px solid #eec16f", "backgroundColor": corridor.color}}
                       onClick={()=>this.props.clickCorridor(corridor.id)}>
                    Route {corridor.name}

                    {/*<i className="fa fa-bus"*/}
                                       {/*style={{marginLeft: 12}}/> {Math.ceil(this.props.scorecardData[corridor.id])}*/}
                  </div>
                )
              }
              else {
                return (
                  <div className="btn routeItem" key={corridor.id}
                       style={{"backgroundColor": corridor.color}}
                       onClick={()=>this.props.clickCorridor(corridor.id)}>
                    Route {corridor.name}

                    {/*<i className="fa fa-bus"*/}
                                       {/*style={{marginLeft: 12}}/> {Math.ceil(this.props.scorecardData[corridor.id])}*/}
                  </div>
                )


              }
            })
          }

        </div>

        <RouteTable/>
        <ServiceEditor/>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentCorridor: state.reducer.currentCor,
    scorecardData: state.ScorecardData,
    isOpen: state.reducer.currentMap,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(ScenarioEditor);


