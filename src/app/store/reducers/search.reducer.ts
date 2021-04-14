import { createReducer, on } from "@ngrx/store";
import { IYtVideoListResult } from "../../core/models";
import { SearchActions } from "../actions";

export interface ISearchState {
  videos: IYtVideoListResult[];
  query: string;
  error: string;
  isLoading: boolean;
}

export const initialState: ISearchState = {
  videos: [],
  query: "",
  error: "",
  isLoading: false,
};

export const searchReducer = createReducer<ISearchState>(
  initialState,
  on(SearchActions.searchVideos, (state, { query }) => ({
    ...state,
    isLoading: true,
    query,
  })),
  on(SearchActions.searchVideosSuccess, (state, { videos }) => ({
    ...state,
    isLoading: false,
    videos,
  })),
  on(SearchActions.searchVideosFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
