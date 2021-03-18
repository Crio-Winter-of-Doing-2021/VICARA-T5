import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import createReducer from "./configureReducers";
import { deletePropFromObject } from "../../assets/ts/utilities";
import { IObject } from "../../assets/ts/interfaces";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

interface EnhancedStore extends Store {
  asyncReducers: IObject;
  injectAsyncReducer: (key: string, asyncReducer: any) => EnhancedStore;
  injectAsyncReducers: (reducers: IObject) => EnhancedStore;
  removeAsyncReducer: (key: string) => EnhancedStore;
  removeAllAsyncReducers: () => EnhancedStore;
}

const configureStore = () => {
  const rootReducer = createReducer();
  const store: EnhancedStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.asyncReducers = {};

  store.injectAsyncReducer = (
    key: string,
    asyncReducer: any
  ): EnhancedStore => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };
  store.injectAsyncReducers = (reducers: IObject): EnhancedStore => {
    store.asyncReducers = { ...store.asyncReducers, ...reducers };
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };
  store.removeAsyncReducer = (key: string): EnhancedStore => {
    store.asyncReducers = deletePropFromObject(store.asyncReducers, key);
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };
  store.removeAllAsyncReducers = (): EnhancedStore => {
    store.asyncReducers = {};
    store.replaceReducer(createReducer());
    return store;
  };

  return store;
};

const store = configureStore();

export default store;
