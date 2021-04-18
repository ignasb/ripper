import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { IActiveDownload } from "../../core/models/download";

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
}
