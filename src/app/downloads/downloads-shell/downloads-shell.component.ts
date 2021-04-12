import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IActiveDownload } from "../../core/models/download";
import { IAppState } from "../../store/reducers";
import { DownloadSelectors } from "../../store/selectors/download.selectors";

@Component({
  selector: "app-downloads-shell",
  templateUrl: "./downloads-shell.component.html",
  styleUrls: ["./downloads-shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsShellComponent implements OnInit {
  downloads$: Observable<IActiveDownload[]>;

  constructor(private readonly downloadSelectors: DownloadSelectors) {
    this.downloads$ = downloadSelectors.activeDownloads$;
  }

  ngOnInit(): void {
    this.downloads$.subscribe(console.log);
  }
}
