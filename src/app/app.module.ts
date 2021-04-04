import { NgModule } from "@angular/core";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DownloadsModule } from "./downloads/downloads.module";
import { SearchModule } from "./search/search.module";
import { SettingsModule } from "./settings/settings.module";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    DownloadsModule,
    SearchModule,
    SettingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
