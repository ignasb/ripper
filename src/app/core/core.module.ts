import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { LayoutComponent } from "./layout/layout.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SharedModule } from "../shared/shared.module";
import { IpcService } from "./services/ipc/ipc.service";
import { appInitializer } from "./app-initializer";
import { Store } from "@ngrx/store";
import { IAppState } from "../store/reducers";
import { MatSnackBar } from "@angular/material/snack-bar";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [SidenavComponent, LayoutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  exports: [LayoutComponent, HttpClientModule, SharedModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (
        ipcService: IpcService,
        store: Store<IAppState>,
        snackBar: MatSnackBar
      ) => {
        return () => appInitializer(ipcService, store, snackBar);
      },
      multi: true,
      deps: [IpcService, Store, MatSnackBar],
    },
  ],
})
export class CoreModule {}
