import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import { IActiveDownload } from "../../core/models/download";
import { DownloadSelectors } from "../../store/selectors/download.selectors";

@Component({
  selector: "app-downloads-shell",
  templateUrl: "./downloads-shell.component.html",
  styleUrls: ["./downloads-shell.component.scss"],
})
export class DownloadsShellComponent implements OnInit, OnDestroy {
  downloads$: Observable<IActiveDownload[]>;

  subscriptions = new Subscription();

  constructor(
    private readonly downloadSelectors: DownloadSelectors,
    private readonly cd: ChangeDetectorRef
  ) {
    this.downloads$ = downloadSelectors.activeDownloads$;
  }

  ngOnInit(): void {
    const sub = this.downloads$.pipe(delay(0)).subscribe(() => {
      this.cd.detectChanges();
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
