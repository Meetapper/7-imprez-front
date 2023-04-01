import actionTypes from "../actionTypes"

export const setUserData = (userData) => {
  return {
    type: actionTypes.SET_USER_DATA,
    payload: userData
  }
}