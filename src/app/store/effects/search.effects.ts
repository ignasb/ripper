import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { EMessages } from "../../../../lib/models";
import { IpcService } from "../../core/services/ipc/ipc.service";
import { SearchService } from "../../core/services/search/search.service";
import { DownloadActions, SearchActions } from "../actions";
import { ConfigSelectors } from "../selectors/config.selectors";

@Injectable()
export class SearchEffects {
  public searchVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchVideos),
      withLatestFrom(this.configSelectors.ytApiKey$),
      switchMap(([{ query }, apiKey]) =>
        this.searchService.searchVideos$(query, apiKey).pipe(
          map(({ items }) =>
            SearchActions.searchVideosSuccess({ videos: items })
          ),
          catchError((error) => of(SearchActions.searchVideosFail({ error })))
        )
      )
    )
  );

  public downloadStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DownloadActions.downloadStart),
      tap(({ download }) => {
        this.ipcService.send(EMessages.DownloadVideo, {
          id: download.id,
          title: download.title,
        });
      }),
      map(({ download }) => SearchActions.disableDownload({ id: download.id }))
    )
  );

  public fileSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DownloadActions.convertToMp3Success),
      map((id) => SearchActions.enableDownload(id))
    )
  );

  public fileSaveFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DownloadActions.convertToMp3Fail, DownloadActions.downloadFail),
      tap((error) => console.log(error)),
      map((id) => SearchActions.enableDownload(id))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly searchService: SearchService,
    private readonly ipcService: IpcService,
    private readonly configSelectors: ConfigSelectors
  ) {}
}
