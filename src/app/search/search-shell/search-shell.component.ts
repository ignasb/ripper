import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, Observable, Subscription } from "rxjs";
import { ISearchResult, IYtVideoListResult } from "../../core/models";
import { delay, map } from "rxjs/operators";
import { IpcService } from "../../core/services/ipc/ipc.service";
import { EMessages } from "../../../../lib/models";
import { IAppState } from "../../store/reducers";
import { Store } from "@ngrx/store";
import { DownloadActions, SearchActions } from "../../store/actions";
import { IActiveDownload } from "../../core/models/download";
import { SearchSelectors } from "../../store/selectors/search.selectors";
import { PlaylistSelectors } from "../../store/selectors/playlist.selectors";

@Component({
  selector: "app-search-shell",
  templateUrl: "./search-shell.component.html",
  styleUrls: ["./search-shell.component.scss"],
})
export class SearchShellComponent implements OnInit, OnDestroy {
  public query$: Observable<string>;
  public results$: Observable<ISearchResult[]>;
  public resultsCount$: Observable<number>;
  public isLoading$: Observable<boolean>;

  private subscription = new Subscription();

  constructor(
    private readonly ipcService: IpcService,
    private readonly store: Store<IAppState>,
    private readonly searchSelectors: SearchSelectors,
    private readonly playlistSelectors: PlaylistSelectors,
    private readonly cd: ChangeDetectorRef
  ) {
    this.results$ = this.getResults$(
      searchSelectors.videos$,
      playlistSelectors.songs$
    );
    this.resultsCount$ = searchSelectors.videos$.pipe(
      map((results) => results.length)
    );
    this.query$ = searchSelectors.query$;
    this.isLoading$ = searchSelectors.isLoading$;
  }

  ngOnInit(): void {
    const resSub = this.results$.pipe(delay(0)).subscribe(() => {
      this.cd.detectChanges();
    });
    this.subscription.add(resSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSearchSubmit(query: string): void {
    this.store.dispatch(SearchActions.searchVideos({ query }));
  }

  public onVideoDownload(video: IYtVideoListResult): void {
    const download: IActiveDownload = {
      id: video.id,
      progress: 0,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
    };
    this.store.dispatch(DownloadActions.downloadStart({ download }));
    this.ipcService.send(EMessages.DownloadVideo, {
      id: video.id,
      title: video.snippet.title,
    });
  }

  private getResults$(
    results$: Observable<ISearchResult[]>,
    songs$: Observable<string[]>
  ): Observable<ISearchResult[]> {
    return combineLatest([results$, songs$]).pipe(
      map(([results, songs]) =>
        results.map((result) => ({
          ...result,
          isDownloaded: songs.includes(result.snippet.title),
        }))
      )
    );
  }
}
