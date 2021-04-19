import { createReducer, on } from "@ngrx/store";
import { ISearchResult } from "../../core/models";
import { SearchActions } from "../actions";

export interface ISearchState {
  videos: ISearchResult[];
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
    videos: videos.map((video) => ({
      ...video,
      snippet: {
        ...video.snippet,
        title: video.snippet.title.replace(/[^\w\s]/gi, ""),
      },
    })),
  })),
  on(SearchActions.searchVideosFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    videos: [],
    error,
  })),
  on(SearchActions.disableDownload, (state, { id }) => ({
    ...state,
    videos: toggleVideoDownload(state.videos, id, true),
  })),
  on(SearchActions.enableDownload, (state, { id }) => ({
    ...state,
    videos: toggleVideoDownload(state.videos, id, false),
  }))
);

const toggleVideoDownload = (
  videos: ISearchResult[],
  id: string,
  disabled: boolean
): ISearchResult[] => {
  return videos.map((video) => ({
    ...video,
    isDownloadDisabled: video.id === id ? disabled : video.isDownloadDisabled,
  }));
};
