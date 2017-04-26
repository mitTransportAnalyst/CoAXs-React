/**
 * Created by xinzheng on 4/4/17.
 */

import React from "react";
import { Modal, Button } from 'react-bootstrap';

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

/**
 * The main view which include TopleftPanel, map and Bottom component
 */

class ScenarioCreationModal extends React.Component {
  constructor(){
    super();

  }


  render() {
    return (
      <div>
        <Modal show={this.props.isShow} onHide={this.props.closeModal} keyboard={false} backdrop="static">
          <Modal.Header>
            <Modal.Title>SCENARIO CREATION</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>fewfewmfoewmfomewofmewofm/f ajfiewojfo/. jfewiojfoiew.</p>
            {/*<iframe width="100%" height="315" src="https://www.youtube.com/embed/gPhlnZG-pRY" frameBorder="0" allowFullScreen></iframe>*/}
            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

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


export default connect(mapStateToProps, mapDispachToProps)(ScenarioCreationModal);




