import actionTypes from "../actionTypes";

const iniitalState = {
  dailyPosted: null
}

export default (state = iniitalState, action) => {
  switch (action.type) {
    case actionTypes.SET_DAILY_POSTED:
      return { ...state, dailyPosted: action.payload}

    default:
      return state;
  }
} 