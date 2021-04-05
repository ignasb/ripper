import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Observable } from "rxjs";
import { IYtVideoListResult } from "../../core/models";

@Component({
  selector: "app-search-yt-results",
  templateUrl: "./search-yt-results.component.html",
  styleUrls: ["./search-yt-results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchYtResultsComponent implements OnInit {
  @Input()
  public results$: Observable<IYtVideoListResult[]>;

  @Output()
  public downloadVideo = new EventEmitter<IYtVideoListResult>();

  constructor() {}

  ngOnInit(): void {}

  public download(video: IYtVideoListResult): void {
    this.downloadVideo.emit(video);
  }
}
