import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import Home from "./components/Home";
import PointToPoint from "./components/PointToPoint";

import NotFound from "./components/NotFound";
import PreSurveyAccess from "./components/Survey/PreSurveyAccess";
import PreSurveyPTP from "./components/Survey/PreSurveyPTP";


/**
 * The router.
 */

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" >
      <IndexRoute component={Home}/>
      <Route path="/main/atl/accessibility" component={Home}/>
      <Route path="/main/atl/point2point" component={PointToPoint}/>
      <Route path="/main/atl/presurveyaccess" component={PreSurveyAccess} />
      <Route path="/main/atl/presurveyptp" component={PreSurveyPTP} />

      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export { router };
