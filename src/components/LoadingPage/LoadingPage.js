/**
 * Created by xinzheng on 4/20/17.
 */


import React from "react";
import ProgressBar from "react-progressbar.js"
import Animal from "./animal.gif"
import s from "./LoadingPage.css"

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../reducers/action';


class LoadingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }



  render() {

    var Line = ProgressBar.Line;


    return (
      <div className="loadingPage">
        <Line
          progress={this.props.progress}
          options={{
            strokeWidth: 0.3,
            color: "#ED6A5A",
            easing: 'easeInOut',


          }}
          initialAnimate={true}

          containerStyle={{
            width: window.innerWidth,
            height: '0px',
            zIndex: "999",
            position: "absolute"

          }}
          containerClassName={'.progressbar'} />

        <img src={Animal} className="loadingLogo" />



      </div>

    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(LoadingPage);

