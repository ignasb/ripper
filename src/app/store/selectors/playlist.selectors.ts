import { Injectable } from "@angular/core";
import {
  createFeatureSelector,
  createSelector,
  select,
  Store,
} from "@ngrx/store";
import { IAppState } from "../reducers";

const getAppState = createFeatureSelector<IAppState>("appState");
const getPlaylistState = createSelector(getAppState, (state) => state.playlist);

const getSongs = createSelector(getPlaylistState, (state) => state.songs);

@Injectable()
export class PlaylistSelectors {
  public songs$ = this.store.pipe(select(getSongs));

  constructor(private readonly store: Store<IAppState>) {}
}
