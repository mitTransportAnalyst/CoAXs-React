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

class ScenarioCreationModal extends React.Component {
  constructor() {
    super();

  }


  render() {
    return (
      <div>
        <Modal show={this.props.isShow} onHide={this.props.closeModal} keyboard={false} backdrop="static">
          <Modal.Header>
            <Modal.Title>Create your own scenario: User instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <iframe width="100%" height="315" src="https://www.youtube.com/embed/gPhlnZG-pRY" frameBorder="0"
                    allowFullScreen></iframe>
            <hr />

            <p>There is no particular goal for creating scenarios, but you might want to explore: what scenario creates
              the greatest improvement in access to jobs? How to create your own scenario:</p>


            <ul>
              <li><strong>1 Choose an alternative for each route:</strong> Select each route (16, E3, and E5), and then,
                choose which alternative of that route you’d like to test. Click on each alternative to see it on the
                map.
              </li>
              <li><strong>2 Choose a headway:</strong> Move the slider on the right hand side for each alternative that
                you’d like to change. Moving the slider to the right means the bus will come more often. See how many
                buses that headway will require by looking at the number next to the bus icon.
              </li>
              <li><strong>3 Compare your scenario:</strong> Once you have the sliders where you want them for each
                route, click “save scenario”, then “update” to see how this compares to today’s service.
              </li>
              <li><strong>4 Explore your scenario:</strong> Move the blue pin around to see how your scenario would
                impact different parts of the city, and change the time slider to see how benefits change.
              </li>

            </ul>
            <p>Quick tip #1: in general, placing the pin near an end of one of the transit routes you’re upgrading in
              the scenario will enable you to see the greatest impacts. Though sometimes, benefits may be significant
              not just for communities at the ends of lines; use your intuition and knowledge of the transit network in
              your city to explore where the impacts might be the most significant.</p>

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


export default connect(mapStateToProps, mapDispachToProps)(ScenarioCreationModal);




