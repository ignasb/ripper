import { NgModule } from "@angular/core";
import { CoreModule } from "./core/core.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { DownloadsModule } from "./downloads/downloads.module";
import { SearchModule } from "./search/search.module";
import { SettingsModule } from "./settings/settings.module";
import { AppStoreModule } from "./store/app-store.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
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
    AppStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
