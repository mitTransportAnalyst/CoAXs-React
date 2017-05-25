/**
 * Created by xinzheng on 4/4/17.
 */

import React from "react";
import { Modal, Tooltip, Overlay, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import s from "./Navbar.css"
import classNames from "classnames"
import IntroModalPTP from "../Modal/IntroModalPTP"
import ScenarioCreationModalPTP from "../Modal/ScenarioCreationModalPTP"
import ExitSurveyModal from "../Modal/ExitSurveyModal"
import PreSurveyModal from "../Modal/PreSurveyModal"
import {FormControlID} from "../../../config"


//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

/**
 * The main view which include TopleftPanel, map and RightMainPanel component
 */

class NavbarPTP extends React.Component {
  constructor(){
    super();
    this.state = {
      showIntro: true,
      showScenario: false,
      showScenarioPopup: false,
      showSurvey: false,
      showExitSurveyPopup: false,
      showPreSurvey: false,
      show: false,
    };
    this.closeScenario = this.closeScenario.bind(this);
    this.closeScenarioPopup = this.closeScenarioPopup.bind(this);

    this.closeIntro = this.closeIntro.bind(this);
    this.closeExitSurvey = this.closeExitSurvey.bind(this);
    this.closeExitSurveyPopup = this.closeExitSurveyPopup.bind(this);

    this.closePreSurvey = this.closePreSurvey.bind(this);

    this.handleClickScenario = this.handleClickScenario.bind(this);
    this.handleClickIntro = this.handleClickIntro.bind(this);
    this.handleClickSurvey = this.handleClickSurvey.bind(this);
    this.handleClickPreSurvey = this.handleClickPreSurvey.bind(this);

    this.handleClick = this.handleClick.bind(this);



  }

  handleClick(e) {

    this.setState({ target: e.target, show: !this.state.show });
  };

  closeScenario(){
    this.setState({ showScenario: false });
  }

  closeScenarioPopup(){
    this.setState({ showScenarioPopup: false });
  }


  closeIntro(){
    this.setState({ showIntro: false });
  }

  closeExitSurvey(){
    this.setState({ showSurvey: false });
  }


  closeExitSurveyPopup(){
    this.setState({ showExitSurveyPopup: false });
  }

  closePreSurvey(){
    this.props.donePreSurvey(" ");
    this.setState({ showPreSurvey: false, showIntro: true });

  }


  handleClickScenario(){
    this.setState({ showScenario: true });
  }

  handleClickIntro(){
    this.setState({ showIntro: true });
  }

  handleClickSurvey(){
    this.props.doneExitSurvey(" ");


    let exitform = `https://www.123contactform.com/sf.php?s=123contactform-2676941&${FormControlID.exit}=${this.props.emailStore}`;

    window.location.href=exitform;

    // this.setState({ showSurvey: true });

  }

  handleClickPreSurvey(){
    this.setState({ showPreSurvey: true });

  }


  componentWillReceiveProps(nextProps){
    if (nextProps.isdoneOneScenario !== this.props.isdoneOneScenario){
      this.setState({ showScenarioPopup: true });
    }
    if (nextProps.isdoneCompareScenario !== this.props.isdoneCompareScenario){
      this.setState({ showExitSurveyPopup: true });
    }

    if (nextProps.showCompareScenarioModal !== this.props.showCompareScenarioModal){
      this.setState({ showScenario: true });
    }


  }


  render() {
    const preClass = classNames({
      "navitem": true,
      "active": !this.props.isdonePreSurvey,
      "blink":!this.props.isdonePreSurvey,
    });

    const introClass = classNames({
      "step": true,
      "current": !this.props.isdoneOneScenario,
      // "blink": this.props.isdonePreSurvey & !this.props.isdoneOneScenario,
    });

    const compareClass = classNames({
      "step": true,
      "current": !this.props.isdoneCompareScenario,
      // "blink": this.props.isdoneOneScenario & !this.props.isdoneCompareScenario,
    });

    const exitClass = classNames({
      "step": true,
      "current": !this.props.isdoneExitSurvey,
      "blink": this.props.isdoneCompareScenario & !this.props.isdoneExitSurvey,
    });

    // const popoverFocus = (
    //   <Popover id="popover-trigger-focus" title="Popover bottom">
    //     <strong>Holy guacamole!</strong> Check this info.
    //   </Popover>
    // );


    const tooltipforIntro = (
      <Tooltip id="tooltipforIntro"><strong>Click the question mark to re-watch the instruction video</strong></Tooltip>
    );

    return (
      <div className="navbarTop" >
        {/*<ul className="navbarTop">*/}
        <div className="arrow-steps">



          <div className="step" ref="target">
              <a href="http://coaxs.herokuapp.com/landingatl" target="_blank" >1 Home Page</a>
          </div>


          <div className={introClass} >
              <span className="" >2 Get to know CoAXs
                <OverlayTrigger placement="bottom" overlay={tooltipforIntro}>
                  <a ref="introQuestion" className="fa fa-question-circle-o questionMark" style={{ display: "inline", fontSize: 16}} aria-hidden="true" onClick={this.handleClickIntro} href="#"></a>
                </OverlayTrigger>
                {/*<button style={{marginLeft: 8, fontSize: 11}} onClick={this.handleClickIntro} >Instructions</button>*/}
              </span>
          </div>


          <div className={compareClass}>
            <span >3 Create Your Own Scenario
              <OverlayTrigger placement="bottom" overlay={tooltipforIntro}>
                <a ref="compareQuestion" className="fa fa-question-circle-o questionMark" style={{ display: "inline", fontSize: 16}} aria-hidden="true" onClick={this.handleClickScenario} href="#"></a>
              </OverlayTrigger>

                {/*<button  onClick={this.handleClickScenario} >Instructions</button>*/}
            </span>
          </div>

          <div className={exitClass} href="#" onClick={this.handleClickSurvey}>
            <a href="#" ref="exit" >
              4 Exit Survey
            </a>
          </div>
        </div>







        <Overlay
          show={this.state.showExitSurveyPopup}
          target={this.refs.exit}
          placement="bottom"
          containerPadding={20}
        >
          <Popover id="popover-contained" title="Final Step">
            <strong>Hope you enjoy CoAXs.</strong> Let's click the button above to do the exit survey. Thank you.
            <Button bsSize="small" style={{marginLeft: 5}} onClick={this.closeExitSurveyPopup}>Got it!</Button>
          </Popover>
        </Overlay>

        <IntroModalPTP isShow={this.state.showIntro} closeModal={this.closeIntro}/>
        <ScenarioCreationModalPTP isShow={this.state.showScenario} closeModal={this.closeScenario}/>
        <ExitSurveyModal isShow={this.state.showSurvey} closeModal={this.closeExitSurvey}/>
        <PreSurveyModal isShow={this.state.showPreSurvey} closeModal={this.closePreSurvey}/>

      </div>

    );
  }
}


//bind store and function to props
function mapStateToProps(state) {

  return {
    isdoneOneScenario: state.navState.isdoneOneScenario,
    isdoneCompareScenario: state.navState.isdoneCompareScenario,
    isdoneExitSurvey: state.navState.isdoneExitSurvey,
    isdonePreSurvey: state.navState.isdonePreSurvey,
    showCompareScenarioModal: state.showCompareScenarioModal,
    emailStore: state.emailStore,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(NavbarPTP);




