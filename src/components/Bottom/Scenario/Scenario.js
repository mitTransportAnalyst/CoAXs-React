

import React from "react";
import s from "./Scenario.css";
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap'


class Scenario extends React.Component {
  render() {
    return (
      <div className="colBody" id="leftDynamic">
        <div className="colHead" >
          <i className="fa fa-random"></i>
          <span>Scenario: Existing MBTA</span>
          {/*<span>*/}
        {/*Scenario<span> Comparison</span>:*/}
            {/*<span>*/}
          {/*<span>vs. </span>*/}
          {/*<span>vs...</span>*/}
        {/*</span>*/}
      {/*</span>*/}
        </div>


        {/*<div className="placeHolder">*/}
          {/*<div className="bigText">*/}
            {/*<i className="fa fa-random"></i>*/}
          {/*</div>*/}
        {/*</div>*/}

        <div className="showToggle">

          <div className="btn-group btn-group-justified">

            <label className="btn" style={{backgroundColor:"grey"}}><i className="fa fa-balance-scale"></i> Compare
            </label>


            <label className="btn" style={{backgroundColor:"grey"}}><i className="fa fa-plus-square"></i> Rename
            </label>


          </div>

          <div className={s.scenariosTable} style={{marginTop: -18, paddingTop: 18}}>
            <div className={s.scenario} style={{position: "absolute", zIndex: 10, width: 24}}>

              {/*position:absolute;z-index:10;box-shadow:5px 0px 3px rgba(0,0,0,0.1);width:24px*/}

              <i className="fa fa-balance-scale" style={{position: "absolute", bottom: 40}}></i>
            </div>

            <div className={s.scenarioEntries}>
              <div className={s.scenario} style={{display: "inline-block", whiteSpace:"nowrap"}}>
                <div className={s.subHead}>
                  {/*{{combo.name }}*/}
                </div>

                {/*<input type="text" className="subHead">*/}
                {/*</input>*/}


                <div style={{width: 20, position:"absolute"}}>
                  <div className="square" style={{color: "#FFF"}}>
                    {/*"color:#FFF;background-color:{{variant.color}};"*/}
                  </div>
                </div>

                <div style={{width: "100%", position:"absolute", left: 22}}>
                  <div>
              {/*<span className="text-success">*/}
                <small>R:  | D:
                  | H:  </small>
                  </div>

                </div>

                <div className="text-center" style={{position:"absolute", width:"100%", zIndex:10, bottom:2}}>
                  <i className="fa fa-circle-o faa-pulse animated"></i>
                  <i  className="fa fa-circle-o"></i>
                </div>
                <div className="text-center" style={{position:"absolute", width: "100%", zIndex:10, bottom:2}}>
                  <i className="fa fa-check-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
  }
}

export default Scenario
