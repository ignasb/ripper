import { Injectable } from "@angular/core";
import {
  createFeatureSelector,
  createSelector,
  select,
  Store,
} from "@ngrx/store";
import { Observable } from "rxjs";
import { IActiveDownload } from "../../core/models/download";
import { IAppState } from "../reducers";
import { IDownloadState } from "../reducers/download.reducer";

const getAppState = createFeatureSelector<IAppState>("appState");
const getDownloadState = createSelector(
  getAppState,
  (state: IAppState) => state.download
);

const getActiveDownloads = createSelector(
  getDownloadState,
  (state: IDownloadState) => state.activeDownloads
);

const getActiveDownloadById = createSelector(
  getActiveDownloads,
  (state: IActiveDownload[], props) =>
    state.find((download) => download.id === props.id)
);

@Injectable()
export class DownloadSelectors {
  public activeDownloads$ = this.store.pipe(select(getActiveDownloads));

  constructor(private readonly store: Store<IAppState>) {}

  public getActiveDownload$(id: string): Observable<IActiveDownload> {
    return this.store.select(getActiveDownloadById, { id });
  }
}
