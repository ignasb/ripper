import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DownloadSelectors } from "../../store/selectors/download.selectors";
import { ILink } from "../models";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
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

  constructor(private readonly downloadSelectors: DownloadSelectors) {
    this.downloadsCount$ = this.downloadSelectors.activeDownloadsCount$;
    this.isDownloadIconVisible$ = this.downloadsCount$.pipe(
      map((count) => count > 0)
    );
  }

  ngOnInit(): void {}

  getRoute(link: ILink): string[] {
    return [link.path];
  }

  isBadgeVisible(path: string, downloadCount: number): boolean {
    return path === "/downloads" && downloadCount > 0;
  }
}
