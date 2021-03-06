import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { EDownloadStatus, IActiveDownload } from "../../core/models/download";

@Component({
  selector: "app-downloads-list",
  templateUrl: "./downloads-list.component.html",
  styleUrls: ["./downloads-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsListComponent implements OnInit {
  @Input()
  public downloads: IActiveDownload[];

  constructor() {}

  ngOnInit(): void {}

  isDownloadIndeterminate(status: EDownloadStatus): boolean {
    return status === EDownloadStatus.Convert;
  }

  trackById(index: number, download: IActiveDownload): string {
    return download.id;
  }
}
