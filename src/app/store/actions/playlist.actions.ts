import { createAction, props } from "@ngrx/store";

export const initializePlaylist = createAction(
  "[Playlist] INITIALIZE_PLAYLIST",
  props<{ songs: string[] }>()
);
