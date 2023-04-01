import actionTypes from "../actionTypes"

export const setLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING,
    payload: loading
  }
}