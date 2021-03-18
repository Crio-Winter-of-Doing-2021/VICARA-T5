import { combineReducers } from "redux";
import coreReducers from "./coreReducers";

const createReducer = (asyncReducers = {}) => {
  const rootReducer = combineReducers({
    ...coreReducers,
    ...asyncReducers,
  });
  //   return persistReducer(persistConfig, rootReducer);
  return rootReducer;
};

export default createReducer;
