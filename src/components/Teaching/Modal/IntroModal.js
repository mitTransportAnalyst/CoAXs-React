/**
 * Created by xinzheng on 4/4/17.
 */

import React from "react";
import {Modal, Button} from 'react-bootstrap';

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

/**
 * The main view which include TopleftPanel, map and Bottom component
 */

class IntroModal extends React.Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div>
        <Modal show={this.props.isShow} onHide={this.props.closeModal} keyboard={false} backdrop="static">
          <Modal.Header>
            <Modal.Title>Get to know CoAXs: User instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <iframe width="100%" height="315" src="https://www.youtube.com/embed/uNswES3tTPs" frameBorder="0"
                    allowFullScreen></iframe>

            <hr />

            {/*<h4>Overflowing text to show scroll behavior</h4>*/}
            <ul>
              <li>1 Drag the blue pin to your home or a place you know well, and wait for a few seconds.</li>
              <li>2 Drag the time slider in the lower left hand corner to see how far you can travel in different time
                intervals. Consider how this compares with your experience of your most frequent trips.
              </li>
              <li>3 Notice how your access to jobs changes by looking at the graph on the left side of the screen.</li>
              <li>4 Once you’re finished exploring, click the navigation bar that says “Create your own scenario” to
                move on to the next step.
              </li>

            </ul>
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


export default connect(mapStateToProps, mapDispachToProps)(IntroModal);




