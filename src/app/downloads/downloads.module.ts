import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DownloadsRoutingModule } from "./downloads-routing.module";
import { DownloadsShellComponent } from "./downloads-shell/downloads-shell.component";
import { SharedModule } from "../shared/shared.module";
import { DownloadsListComponent } from './downloads-list/downloads-list.component';
import { DownloadStatusPipe } from './downloads-list/pipes/download-status.pipe';

@NgModule({
  declarations: [DownloadsShellComponent, DownloadsListComponent, DownloadStatusPipe],
  imports: [CommonModule, DownloadsRoutingModule, SharedModule],
  exports: [],
})
export class DownloadsModule {}
