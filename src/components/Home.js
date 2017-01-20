import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import Bottom from "./Bottom/Bottom"

// Home page component
class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <TopleftPanel/>
        <Bottom/>
      </div>

    );
  }
}

export default Home
