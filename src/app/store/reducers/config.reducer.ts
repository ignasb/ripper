import { createReducer, on } from "@ngrx/store";
import { IConfig } from "../../../../lib/models";
import { ConfigActions } from "../actions";

export interface IConfigState extends IConfig {}

export const initialState: IConfigState = {
  apiKey: "",
  musicPath: "",
};

export const configReducer = createReducer<IConfigState>(
  initialState,
  on(ConfigActions.initConfig, (state, { config }) => ({
    ...state,
    ...config,
  }))
);
