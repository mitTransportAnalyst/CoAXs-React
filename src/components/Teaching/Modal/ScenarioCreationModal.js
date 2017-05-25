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

            <iframe width="100%" height="315" src="https://www.youtube.com/embed/OdNutKfxec0" frameBorder="0"
                    allowFullScreen></iframe>
            <hr />

            <p>There is no particular goal for creating scenarios, but you might want to explore: what scenario creates
              the greatest improvement in access to jobs? How to create your own scenario:</p>


            <ul>
              <li><strong>1 Select a project to modify:</strong> Click on one of the buttons labeled Campbellton BRT, Northside Drive BRT, Streetcar extension, Infill Station on Green Line or Infill Station on Red Line.

              </li>
              <li><strong>2 Compare your scenario:</strong>  Once you’ve created the scenario you want to test, click “Update” to see how your scenario compares to today’s service.
              </li>
              <li><strong>3 Explore your scenario:</strong> Just like before, change the time slider to see how access to jobs changes, and you can also move the blue pin around to see how your scenario would impact different parts of the city.
              </li>


            </ul>
            <p>
              <strong>Quick tip:</strong> in general, placing the pin near an end of one of the transit routes you’re upgrading in the scenario will enable you to see the greatest impacts. Though sometimes, benefits may be significant not just for communities at the ends of lines; use your intuition and knowledge of the transit network in your city to explore where the impacts might be the most significant.</p>

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




