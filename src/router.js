import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import LandingPage from "./components/LandingPage/LandingPage";


/**
 * The router.
 */

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" >
      <IndexRoute component={Home}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export { router };
