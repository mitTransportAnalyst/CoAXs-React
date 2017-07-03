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

class ScenarioCreationModalPTP extends React.Component {
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

            <iframe width="100%" height="315" src="https://www.youtube.com/embed/sSHxxiRr6Ys" frameBorder="0"
                    allowFullScreen></iframe>
            <hr />

            <p>There is no particular goal for creating scenarios, but you might want to explore: what scenario saves the most time? How to create your own scenario:</p>


            <ul>
              <li><strong>1 Choose a corridor to modify:</strong> Select either Van Ness, Geary, or Geneva Ave. You’ll see the relevant section highlighted on the map.
              </li>
              <li><strong>2 Change the bus speed:</strong> For each corridor, move the slider to the right to increase bus speeds along the highlighted segment. Cities that have implemented similar upgrades like dedicated bus lanes and traffic signal priority have seen speeds improve between 10% and 40%.
              </li>
              <li><strong>3 Change the time between buses: </strong> Moving this slider to the right means that buses will come more often. This affects all the bus lines that use the corridor.
              </li>
              <li><strong>4 Compare your scenario:</strong> Once you’ve created the scenario you want to test, click “Update” to see how your new scenario compares to today’s service.
              </li>
              <li><strong>5 Explore your scenario:</strong> Just like before, move the pin around to see how your new scenario impacts different parts of the city.
              </li>

            </ul>
            <p>
              <strong>
                Quick tip :
              </strong>
              in general, placing the pin near an end of one of the transit routes you’re upgrading in the scenario will enable you to see the greatest impacts. Though sometimes, benefits may be significant not just for communities at the ends of lines; use your intuition and knowledge of the transit network in your city to explore where the impacts might be the most significant.</p>

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


export default connect(mapStateToProps, mapDispachToProps)(ScenarioCreationModalPTP);




