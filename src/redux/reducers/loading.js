import actionTypes from "../actionTypes";

const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return action.payload;

    default:
      return state;
  }
}