/**
 * Created by xinzheng on 4/20/17.
 */

import React from "react";
import ProgressBar from "react-progressbar.js"
import Animal from "./animal.gif"
import s from "./LoadingPage.css"

class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Line = ProgressBar.Line;
    return (
      this.props.progress === 1 ? null :
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
            containerClassName={'.progressbar'}/>
          <img src={Animal} className="loadingLogo"/>
        </div>
    );
  }
}

export default LoadingPage;

