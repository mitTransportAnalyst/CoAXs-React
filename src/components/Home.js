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
        <Map/>
        <Bottom/>
      </div>

    );
  }
}

export default Home
