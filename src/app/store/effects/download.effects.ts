import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class DownloadEffects {
  constructor(private readonly actions$: Actions) {}
}
