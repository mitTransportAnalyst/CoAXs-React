/**
 * Created by xinzheng on 4/4/17.
 */

import React from "react";
import { Modal, Button} from 'react-bootstrap';

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

/**
 * The main view which include TopleftPanel, map and Bottom component
 */

class PreSurveyModal extends React.Component {
  constructor(){
    super();
  }



  render() {
    return (
      <div>
        <Modal show={this.props.isShow} onHide={this.props.closeModal} bsSize="large" keyboard={false} backdrop="static" >
          <Modal.Header closeButton>
            <Modal.Title>Consent and Entrance Survey</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfq1Wr8Gigug7lUXWaHv8Xi8VjvHij74krf_y5vuIbF3LPhRQ/viewform?embedded=true" width="100%" height="700" frameBorder="0" marginHeight="0">Loading...</iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}


//bind store and function to props
function mapStateToProps(state) {
  return {
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(PreSurveyModal);




