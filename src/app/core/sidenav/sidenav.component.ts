import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { delay, map } from "rxjs/operators";
import { DownloadSelectors } from "../../store/selectors/download.selectors";
import { ILink } from "../models";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit, OnDestroy {
  public links: ILink[] = [
    {
      icon: "search",
      path: "/search",
      title: "Search",
    },
    {
      icon: "backup",
      path: "/downloads",
      title: "Downloads",
    },
    {
      icon: "settings",
      path: "/settings",
      title: "Settings",
    },
  ];

  public downloadsCount$: Observable<number>;

  public isDownloadIconVisible$: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(
    private readonly downloadSelectors: DownloadSelectors,
    private readonly cd: ChangeDetectorRef
  ) {
    this.downloadsCount$ = this.downloadSelectors.activeDownloadsCount$;
    this.isDownloadIconVisible$ = this.downloadsCount$.pipe(
      map((count) => count > 0)
    );
  }

  ngOnInit(): void {
    const sub = this.downloadsCount$
      .pipe(delay(0))
      .subscribe(() => this.cd.detectChanges());

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRoute(link: ILink): string[] {
    return [link.path];
  }

  isBadgeVisible(path: string, downloadCount: number): boolean {
    return path === "/downloads" && downloadCount > 0;
  }
}
