
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
