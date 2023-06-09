import actionTypes from "../actionTypes"

const initialState = {
  username: 'username'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return action.payload;

    default:
      return state;
  }
}