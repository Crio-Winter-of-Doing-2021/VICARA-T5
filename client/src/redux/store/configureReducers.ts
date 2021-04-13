import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import coreReducers from './coreReducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'drive'], // the reducer that you want to persist
};

const createReducer = (asyncReducers = {}) => {
  const rootReducer = combineReducers({
    ...coreReducers,
    ...asyncReducers,
  });
  return persistReducer(persistConfig, rootReducer);
  // return rootReducer;
};

export default createReducer;
