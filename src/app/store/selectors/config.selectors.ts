import { Injectable } from "@angular/core";
import {
  createFeatureSelector,
  createSelector,
  select,
  Store,
} from "@ngrx/store";
import { IConfig } from "../../../../lib/models";
import { IAppState } from "../reducers";

const getAppState = createFeatureSelector<IAppState>("appState");
const getConfigState = createSelector(
  getAppState,
  (state: IAppState): IConfig => state.config
);

const getYtApiKey = createSelector(
  getConfigState,
  (state: IConfig) => state.apiKey
);

const getMusicPath = createSelector(
  getConfigState,
  (state: IConfig) => state.musicPath
);

@Injectable()
export class ConfigSelectors {
  public ytApiKey$ = this.store.pipe(select(getYtApiKey));
  public musicPath$ = this.store.pipe(select(getMusicPath));

  constructor(private readonly store: Store<IAppState>) {}
}
