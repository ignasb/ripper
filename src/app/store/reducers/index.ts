import { ActionReducerMap } from "@ngrx/store";
import * as downloadReducers from "./download.reducer";
import * as searchReducers from "./search.reducer";
import * as playlistReducers from "./playlist.reducer";

export interface IAppState {
  download: downloadReducers.IDownloadState;
  search: searchReducers.ISearchState;
  playlist: playlistReducers.IPlaylistState;
}

export const reducers: ActionReducerMap<IAppState> = {
  download: downloadReducers.downloadReducer,
  search: searchReducers.searchReducer,
  playlist: playlistReducers.playlistReducer,
};
