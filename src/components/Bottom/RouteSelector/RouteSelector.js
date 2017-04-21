import React from "react";
import s from "./RouteSelector.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import {corridorInfo} from '../../../Data/LoadData'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class RouteSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componenetDidMount() {
    this.props.clickCorridor("A");
  }


  render() {


    return (
      <div className="colBody routeSelector">

        <div className="colHead">
          <div className="fa-stack">
            <i className="fa-stack" style={{color: "black"}}></i>
          </div>
        </div>

        {/*{ this.props.isOpen ? null : <div className="placeHolder"/> }*/}


        <div className="showToggle">

          <div>
            <label className="btn tiny" style={{backgroundColor: "grey", width: "100%"}}>
              <i className="fa fa-level-down fa-flip-horizontal"></i>
            </label>


            {
              Object.values(corridorInfo).map((corridor) => {
                if (this.props.currentCorridor === corridor.id){
                return (
                  <div className="smallColVal btn" key={corridor.id}
                       style={{border:"3px solid #eec16f", "color": "#FFF", "backgroundColor": corridor.color, "fontSize": 16, "padding": 8, "width":"100%"}}
                       onClick={()=>this.props.clickCorridor(corridor.id)}>
                    {corridor.name} <i className="fa fa-bus" style={{marginLeft: 12}}/>  {Math.ceil(this.props.scorecardData[corridor.id])}
                  </div>
                )
                }
                else{
                  return (
                    <div className="smallColVal btn" key={corridor.id}
                         style={{"color": "#FFF", "backgroundColor": corridor.color, "fontSize": 16, "padding": 8, "width":"100%"}}
                         onClick={()=>this.props.clickCorridor(corridor.id)}>
                      {corridor.name}  <i className="fa fa-bus" style={{marginLeft: 12}}/> {Math.ceil(this.props.scorecardData[corridor.id])}
                    </div>
                  )



                }
              })
            }


          </div>
        </div>
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


export default connect(mapStateToProps, mapDispachToProps)(RouteSelector);


