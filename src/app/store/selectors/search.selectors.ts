import { Injectable } from "@angular/core";
import {
  createFeatureSelector,
  createSelector,
  select,
  Store,
} from "@ngrx/store";
import { IAppState } from "../reducers";

const getAppState = createFeatureSelector<IAppState>("appState");
const getSearchState = createSelector(
  getAppState,
  (state: IAppState) => state.search
);

const getSearchQuery = createSelector(getSearchState, (state) => state.query);
const getVideos = createSelector(getSearchState, (state) => state.videos);
const getSearchError = createSelector(getSearchState, (state) => state.error);
const getIsLoading = createSelector(getSearchState, (state) => state.isLoading);

@Injectable()
export class SearchSelectors {
  public query$ = this.store.pipe(select(getSearchQuery));
  public videos$ = this.store.pipe(select(getVideos));
  public error$ = this.store.pipe(select(getSearchError));
  public isLoading$ = this.store.pipe(select(getIsLoading));

  constructor(private readonly store: Store<IAppState>) {}
}
