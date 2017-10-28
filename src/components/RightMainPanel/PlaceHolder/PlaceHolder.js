/**
 * Created by xinzheng on 5/8/17.
 */

import React from "react";
import s from "./PlaceHolder.css";
import {Modal, Tooltip, Overlay, Popover, OverlayTrigger, Button} from 'react-bootstrap';
import classNames from "classnames"

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class PlaceHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showScenarioPopup: false,
      showPlaceHolder: true,
    };

    this.closeScenarioPopup = this.closeScenarioPopup.bind(this);
    this.handleClickPlaceHolder = this.handleClickPlaceHolder.bind(this);
  }

  closeScenarioPopup() {
    this.setState({showScenarioPopup: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isdoneOneScenario !== this.props.isdoneOneScenario) {
      this.setState({showScenarioPopup: true});
    }
  }

  handleClickPlaceHolder() {
    this.setState({
      showPlaceHolder: false,
    });
    this.props.fireCompareScenarioModal();
  }

  render() {
    const placeHolderStyle = classNames({
      "placeholder": this.state.showPlaceHolder,
      "placeholderClosed": !this.state.showPlaceHolder,
    });

    const placeHolderWordStyle = classNames({
      "placeholderText": this.props.isdoneOneScenario,
      "placeholderTextClosed": !this.props.isdoneOneScenario,
    });

    return (
      <div className={placeHolderStyle}>
        <h4 ref="placeholderText" className={placeHolderWordStyle} onClick={this.handleClickPlaceHolder}>
          Click here to go to Step 3
        </h4>
        <Overlay
          show={this.state.showScenarioPopup}
          target={this.refs.placeholderText}
          placement="bottom"
          containerPadding={20}
        >
          <Popover id="popover-contained" title="Next Step">
            <strong>Good job!</strong> After you explore the baseline scenario, let's click here to watch the scenario
            creation video
            <Button bsSize="small" style={{marginLeft: 5}} onClick={this.closeScenarioPopup}>Got it!</Button>
          </Popover>
        </Overlay>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isdoneOneScenario: state.navState.isdoneOneScenario,
    isdoneCompareScenario: state.navState.isdoneCompareScenario,
    isdoneExitSurvey: state.navState.isdoneExitSurvey,
    isdonePreSurvey: state.navState.isdonePreSurvey,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(PlaceHolder);


