import { ActionReducerMap } from "@ngrx/store";
import * as downloadReducers from "./download.reducer";
import * as searchReducers from "./search.reducer";

export interface IAppState {
  download: downloadReducers.IDownloadState;
  search: searchReducers.ISearchState;
}

// const initialState: IAppState = {
// download: downloadReducers.initialState,
// search: searchReducers.initialState,
// };

export const reducers: ActionReducerMap<IAppState> = {
  download: downloadReducers.downloadReducer,
  search: searchReducers.searchReducer,
};
