
/*
 * action types
 */


/*
 * action creators
 */

/**
 * handle click corridor
 * @param {object} res
 * @return {object} action - "clickCorridor" type and res
 */
export function clickCorridor(res) {
  return {
    type: "clickCorridor",
    res
  }
}

/**
 * handle change map
 * @param {object} res
 * @return {object} action - "changeMap" type and res
 */
export function changeMap(res) {
  return {
    type: "changeMap",
    res
  }
}

/**
 * handle save scenario
 * @param {object} res
 * @return {object} action - "saveScenario" type and res
 */
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

export function selectScenario(res) {
  return {
    type: "selectScenario",
    res
  }
}
