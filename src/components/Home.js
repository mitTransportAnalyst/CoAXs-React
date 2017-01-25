import React from "react";
import TopleftPanel from "./TopleftPanel/TopleftPanel"
import Bottom from "./Bottom/Bottom"
import Map from "./Map/RouteMap/RouteMap"

// Home page component
class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <TopleftPanel/>
        <Map style={{height:500, width:500}}/>
        <Bottom/>
      </div>

    );
  }
}

export default Home
