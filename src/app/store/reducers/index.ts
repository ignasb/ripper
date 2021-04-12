import { ActionReducerMap } from "@ngrx/store";
import * as downloadReducers from "./download.reducer";

export interface IAppState {
  download: downloadReducers.IDownloadState;
}

const initialState: IAppState = {
  download: downloadReducers.initialState,
};

export const reducers: ActionReducerMap<IAppState> = {
  download: downloadReducers.downloadReducer,
};
