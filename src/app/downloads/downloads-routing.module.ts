import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DownloadsShellComponent } from "./downloads-shell/downloads-shell.component";

const routes: Routes = [
  {
    path: "downloads",
    component: DownloadsShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadsRoutingModule {}
