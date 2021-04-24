import { createAction, props } from "@ngrx/store";
import { IConfig } from "../../../../lib/models";

export const initConfig = createAction(
  "[Config] INITIALIZE",
  props<{ config: IConfig }>()
);
