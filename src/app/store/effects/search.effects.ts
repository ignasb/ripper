import { ChangeDetectorRef, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { SearchService } from "../../core/services/search/search.service";
import { DownloadActions, SearchActions } from "../actions";

@Injectable()
export class SearchEffects {
  public searchVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchVideos),
      switchMap(({ query }) =>
        this.searchService.searchVideos$(query).pipe(
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
    private readonly searchService: SearchService
  ) {}
}
