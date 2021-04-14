import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { DownloadSelectors } from "./selectors/download.selectors";
import { SearchSelectors } from "./selectors/search.selectors";
import { EffectsModule } from "@ngrx/effects";
import { DownloadEffects, SearchEffects } from "./effects";

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forFeature([SearchEffects, DownloadEffects]),
    StoreModule.forFeature("appState", reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [DownloadSelectors, SearchSelectors],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}
