import actionTypes from "../actionTypes"

export const setDailyPosted = (dailyPosted) => {
  return {
    type: actionTypes.SET_DAILY_POSTED,
    payload: dailyPosted
  }
}