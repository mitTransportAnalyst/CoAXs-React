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

class ExitSurveyModal extends React.Component {
  constructor(){
    super();
  }



  render() {
    return (
      <div>
        <Modal show={this.props.isShow} onHide={this.props.closeModal} bsSize="large" >
          <Modal.Header closeButton>
            <Modal.Title>Post-survey</Modal.Title>
          </Modal.Header>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfiFUUF-09ahOgVqZSpD7EbS9NNQRki3kNMbvDSIv6su_yPSw/viewform?embedded=true" width="900" height="760" frameBorder="0" marginheight="0" marginwidth="0">Loading...</iframe>
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


export default connect(mapStateToProps, mapDispachToProps)(ExitSurveyModal);




