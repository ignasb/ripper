import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SearchService } from "../../core/services/search/search.service";
import { Observable } from "rxjs";
import { IYtVideoListResponse, IYtVideoListResult } from "../../core/models";
import { map } from "rxjs/operators";
import { IpcService } from "../../core/services/ipc/ipc.service";
import { EMessages } from "../../../../lib/models";

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
    private ipcService: IpcService
  ) {
    this.ipcService.on(EMessages.DownloadEnded, (event, data) => {
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
    console.log(video);
    this.ipcService.send(EMessages.DownloadVideo, {
      id: video.id,
      title: video.snippet.title,
    });
  }
}
