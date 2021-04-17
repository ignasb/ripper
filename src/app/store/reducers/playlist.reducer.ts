import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { PlaylistActions } from "../actions";

export interface IPlaylistState {
  songs: string[];
  basePath: string;
}

export const initialState: IPlaylistState = {
  songs: [],
  basePath: "",
};

export const playlistReducer = createReducer<IPlaylistState>(
  initialState,
  on(PlaylistActions.initializePlaylist, (state, { songs }) => ({
    ...state,
    songs,
  }))
);
