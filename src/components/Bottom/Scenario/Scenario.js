import React from "react";
import s from "./Scenario.css";

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

//import configuration file
import {CorridorInfo} from "../../../config"

class Scenario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      baseScenario: {}
    };

    this.handlePlaceHolder = this.handlePlaceHolder.bind(this)

  }

  //Set base scenario
  componentWillMount() {
    let model = {};
    Object.keys(CorridorInfo).map(
      (id)=> {
        model[id] = {
          "runningTime": 0,
          "dwellTime": 0,
          "headway": 0,
        }
      }
    );
    this.setState({
      "baseScenario": model,
    })
  }

  handlePlaceHolder() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className="colBody" id="leftDynamic">
        <div className="colHead" onClick={this.handlePlaceHolder}>
          <i className="fa fa-random"/>
          <span>Scenario: Existing MBTA</span>
          {/*<span>*/}
          {/*Scenario<span> Comparison</span>:*/}
          {/*<span>*/}
          {/*<span>vs. </span>*/}
          {/*<span>vs...</span>*/}
          {/*</span>*/}
          {/*</span>*/}
        </div>

        { this.state.isOpen ?
          <div className="placeHolder" onClick={this.handlePlaceHolder}>
            <div className="bigText">
              <i className="fa fa-random"/>
            </div>
          </div>
          :
          null
        }


        <div className="showToggle">

          <div className="btn-group btn-group-justified">

            <label className="btn" style={{backgroundColor: "grey", color: "white"}}><i
              className="fa fa-balance-scale"/> Compare
            </label>


            <label className="btn" style={{backgroundColor: "grey", color: "white"}}><i
              className="fa fa-plus-square"/> Rename
            </label>


          </div>

          <div className={s.scenariosTable} style={{marginTop: -18, paddingTop: 18}}>
            <div className={s.scenario} style={{position: "absolute", zIndex: 10, width: 24}}>

              {/*position:absolute;z-index:10;box-shadow:5px 0px 3px rgba(0,0,0,0.1);width:24px*/}

              <i className="fa fa-balance-scale" style={{position: "absolute", bottom: 40}}/>
            </div>

            <div className={s.scenarioEntries}>
              <div className={s.scenario} style={{display: "inline-block", whiteSpace: "nowrap"}}>
                <div className={s.subHead}>
                  {/*{{combo.name }}*/}
                </div>

                {/*<input type="text" className="subHead">*/}
                {/*</input>*/}


                <div style={{width: 20, position: "absolute"}}>
                  <div className="square" style={{color: "#FFF"}}>
                    {/*"color:#FFF;background-color:{{variant.color}};"*/}
                  </div>
                </div>

                <div style={{width: "100%", position: "absolute", left: 22}}>
                  <div>
                    {/*<span className="text-success">*/}
                    <small>R: | D:
                      | H:
                    </small>
                  </div>

                </div>

                <div className="text-center" style={{position: "absolute", width: "100%", zIndex: 10, bottom: 2}}>
                  <i className="fa fa-circle-o faa-pulse animated"/>
                  <i className="fa fa-circle-o"/>
                </div>
                <div className="text-center" style={{position: "absolute", width: "100%", zIndex: 10, bottom: 2}}>
                  <i className="fa fa-check-circle"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    newScenario: state.scenarioStore.newScenario,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Scenario);


