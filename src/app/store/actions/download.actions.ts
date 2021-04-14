import { createAction, props } from "@ngrx/store";
import { IActiveDownload } from "../../core/models/download";

export const downloadStarted = createAction(
  "[Download] DOWNLOAD_START",
  props<{ download: IActiveDownload }>()
);

export const downloadSuccess = createAction(
  "[Download] DOWNLOAD_SUCCESS",
  props<{ id: string }>()
);

export const downloadFail = createAction(
  "[Download] DOWNLOAD_FAIL",
  props<{ id: string }>()
);

export const updateDownloadProgress = createAction(
  "[Download] UPDATE_DOWNLOAD_PROGRESS",
  props<{ id: string; progress: number }>()
);

export const convertToMp3 = createAction(
  "[Download] CONVERT_TO_MP3",
  props<{ id: string }>()
);

export const convertToMp3Success = createAction(
  "[Download] CONVERT_TO_MP3_SUCCESS",
  props<{ id: string }>()
);

export const convertToMp3Fail = createAction(
  "[Download] COVERT_TO_MP3_FAIL",
  props<{ id: string }>()
);
