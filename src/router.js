import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import Home from "./components/Home";
import PointToPoint from "./components/PointToPoint";

import NotFound from "./components/NotFound";


/**
 * The router.
 */

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" >
      <IndexRoute component={Home}/>
      <Route path="/single" component={Home}/>
      <Route path="/ptp" component={PointToPoint}/>


      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export { router };
