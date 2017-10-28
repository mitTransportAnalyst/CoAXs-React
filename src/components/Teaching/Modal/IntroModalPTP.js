/**
 * Created by xinzheng on 4/4/17.
 */

import React from "react";
import {Modal, Button} from 'react-bootstrap';

//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

class IntroModalPTP extends React.Component {
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
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/2BEKddeD9hs" frameBorder="0"
                    allowFullScreen/>
            <hr/>
            <ul>
              <li>
                1 Drag the green start pin to your home or a place you know well.
              </li>
              <li>
                2 Drag the red destination pin to a frequent destination, such as your workplace.
              </li>
              <li>
                3 Once it loads, look at the bar graph in the lower right hand side of the screen to see how long
                CoAXs estimates that trip would take, with a combination of public transit and walking. Consider how
                this compares with your experience of how long that trip takes.CoAXs will also show the best routes on
                public transit between the two pins.
              </li>
              <li>
                4 If you’d like, move the red pin to other destinations you travel to, and compare how long CoAXs
                estimates that trip will take with your experience. You can also change the green pin if you’d like to
                change where you’re starting your trip (it will just take a few more seconds to load).
              </li>
              <li>
                5 Once you’re finished exploring, click the button on the right hand side that says “Click here to go to
                Step 3” to move on to the next step.
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

export default connect(mapStateToProps, mapDispachToProps)(IntroModalPTP);




