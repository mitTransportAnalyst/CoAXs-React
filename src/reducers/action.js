
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
