/**
 * Created by xinzheng on 4/4/17.
 */

import React from "react";
import {Modal, Button} from 'react-bootstrap';

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class ExitSurveyModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.isShow} onHide={this.props.closeModal} bsSize="large" keyboard={false}
               backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Post-survey</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{height: "70vh"}}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSffkyOt2AjhVVe_1Ize9R2kQtbqnd5fIQg8knxhZGF8buiqpw/viewform?embedded=true"
              width="100%" height="100%" frameBorder="0" marginHeight="0">Loading...
            </iframe>
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
  return {}
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ExitSurveyModal);




