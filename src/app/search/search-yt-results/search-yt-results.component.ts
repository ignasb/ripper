import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { ISearchResult, IYtVideoListResult } from "../../core/models";

@Component({
  selector: "app-search-yt-results",
  templateUrl: "./search-yt-results.component.html",
  styleUrls: ["./search-yt-results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchYtResultsComponent {
  @Input()
  public results: ISearchResult[];

  @Output()
  public downloadVideo = new EventEmitter<ISearchResult>();

  public download(video: ISearchResult): void {
    this.downloadVideo.emit(video);
  }
}
