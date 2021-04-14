import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { SearchService } from "../../core/services/search/search.service";
import { SearchActions } from "../actions";

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

  constructor(
    private readonly actions$: Actions,
    private readonly searchService: SearchService
  ) {}
}
