import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsShellComponent } from "./settings-shell/settings-shell.component";
import { SharedModule } from "../shared/shared.module";
import { SettingsFormComponent } from './settings-form/settings-form.component';

@NgModule({
  declarations: [SettingsShellComponent, SettingsFormComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
