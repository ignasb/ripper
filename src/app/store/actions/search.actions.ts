import { createAction, props } from "@ngrx/store";

export const searchVideos = createAction(
  "[Search] SEARCH_VIDEOS",
  props<{ query: string }>()
);

export const searchVideosSuccess = createAction(
  "[Search] SEARCH_VIDEOS_SUCCESS",
  props<{ videos: any }>()
);

export const searchVideosFail = createAction(
  "[Search] SEARCH_VIDEOS_FAIL",
  props<{ error: string }>()
);
