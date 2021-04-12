import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { DownloadSelectors } from "./selectors/download.selectors";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature("appState", reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [DownloadSelectors],
  exports: [DownloadSelectors],
})
export class AppStoreModule {}
