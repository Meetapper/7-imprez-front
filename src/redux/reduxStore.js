import { combineReducers, createStore } from "redux";
import user from "./reducers/user";
import shared from "./reducers/shared";

const rootReducer = combineReducers({
  user: user,
  shared: shared
});

export const store = createStore(rootReducer);