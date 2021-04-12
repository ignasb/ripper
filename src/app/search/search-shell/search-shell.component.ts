import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SearchService } from "../../core/services/search/search.service";
import { Observable } from "rxjs";
import { IYtVideoListResponse, IYtVideoListResult } from "../../core/models";
import { map } from "rxjs/operators";
import { IpcService } from "../../core/services/ipc/ipc.service";
import { EMessages } from "../../../../lib/models";
import { IAppState } from "../../store/reducers";
import { Store } from "@ngrx/store";
import { DownloadActions } from "../../store/actions";
import { IActiveDownload } from "../../core/models/download";

@Component({
  selector: "app-search-shell",
  templateUrl: "./search-shell.component.html",
  styleUrls: ["./search-shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchShellComponent implements OnInit {
  public results$: Observable<IYtVideoListResult[]>;

  constructor(
    private searchService: SearchService,
    private ipcService: IpcService,
    private readonly store: Store<IAppState>
  ) {
    this.ipcService.on(EMessages.DownloadSucess, (event, data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {}

  public onSearchSubmit(query: string): void {
    this.results$ = this.getVideoResults$(query);
  }

  private getVideoResults$(query: string): Observable<IYtVideoListResult[]> {
    return this.searchService
      .searchVideos$(query)
      .pipe(map((response) => response.items));
  }

  public onVideoDownload(video: IYtVideoListResult): void {
    const download: IActiveDownload = {
      id: video.id,
      progress: 0,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
    };
    this.store.dispatch(DownloadActions.downloadStarted({ download }));
    this.ipcService.send(EMessages.DownloadVideo, {
      id: video.id,
      title: video.snippet.title,
    });
  }
}
