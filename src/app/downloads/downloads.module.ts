import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DownloadsRoutingModule } from "./downloads-routing.module";
import { DownloadsShellComponent } from "./downloads-shell/downloads-shell.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [DownloadsShellComponent],
  imports: [CommonModule, DownloadsRoutingModule, SharedModule],
  exports: [],
})
export class DownloadsModule {}
