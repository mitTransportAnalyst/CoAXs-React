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

export function changeMap(res) {
  return {
    type: "changeMap",
    res
  }
}

export function saveScenario(res) {
  return {
    type: "saveScenario",
    res
  }
}

export function changeTimeFilter(res) {
  return {
    type: "changeTimeFilter",
    res
  }
}

export function changeMode(res) {
  return {
    type: "changeMode",
    res
  }
}

export function selectScenario(res) {
  return {
    type: "selectScenario",
    res
  }
}

export function changeGridNumber(res) {
  return {
    type: "changeGridNumber",
    res
  }
}

export function fireUpdate(res) {
  return {
    type: "fireUpdate",
    res
  }
}

export function pushUpdateButton(res) {
  return {
    type: "pushUpdateButton",
    res
  }
}

export function isCompare(res) {
  return {
    type: "isCompare",
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

export function changeBusline(res) {
  return {
    type: "changeBusline",
    res
  }
}

export function changeProgress(res) {
  return {
    type: "changeProgress",
    res
  }
}

export function changeScorecard(res) {
  return {
    type: "changeScorecard",
    res
  }
}

export function changeHeadway(res) {
  return {
    type: "changeHeadway",
    res
  }
}

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
