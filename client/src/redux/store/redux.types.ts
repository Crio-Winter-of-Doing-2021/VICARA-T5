import { ThunkAction, ThunkDispatch as TDispatch } from "redux-thunk";
import { Action } from "redux";

export type IStoreState = any;
export type IStoreActions = any;

export type ThunkResult<R> = ThunkAction<R, IStoreState, null, Action<string>>;
export type ThunkDispatch = TDispatch<IStoreState, null, IStoreActions>;
