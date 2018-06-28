/*
 * action types
 */

/*
 * action creators
 */

export function clickCorridor(res) {
  return {
    type: "clickCorridor",
    res
  }
}

export function changeBusline(res) {
  return {
    type: "changeBusline",
    res
  }
}

export function resetBusline(res) {
  return {
    type: "resetBusline",
    res
  }
}

export function toggleBusline(res) {
  // console.log(res);
  return {
    type: "toggleBusline",
    res
  }
}

export function changeHeadway(res) {
  return {
    type: "changeHeadway",
    res
  }
}

// the number of buese needed
// export function changeScorecard(res) {
//   return {
//     type: "changeScorecard",
//     res
//   }
// }

export function saveScenario(res) {
  return {
    type: "saveScenario",
    res
  }
}

export function pushUpdateButton(res) {
  return {
    type: "pushUpdateButton",
    res
  }
}

export function changeCompareMode(res) {
  return {
    type: "changeCompareMode",
    res
  }
}

export function changeTimeFilter(res) {
  return {
    type: "changeTimeFilter",
    res
  }
}

export function changeGridNumber(res) {
  return {
    type: "changeGridNumber",
    res
  }
}

export function changeProgress(res) {
  return {
    type: "changeProgress",
    res
  }
}










// for navigation bar
export function fireCompareScenarioModal(res) {
  return {
    type: "fireCompareScenarioModal",
    res
  }
}

export function addEmail(res) {
  return {
    type: "addEmail",
    res
  }
}

export function doneOneScenario(res) {
  return {
    type: "doneOneScenario",
    res
  }
}

export function doneCompareScenario(res) {
  return {
    type: "doneCompareScenario",
    res
  }
}

export function doneExitSurvey(res) {
  return {
    type: "doneExitSurvey",
    res
  }
}

export function donePreSurvey(res) {
  return {
    type: "donePreSurvey",
    res
  }
}
