import { createReducer, on } from "@ngrx/store";
import { EDownloadStatus, IActiveDownload } from "../../core/models/download";
import { DownloadActions } from "./../actions";

export interface IDownloadState {
  activeDownloads: IActiveDownload[];
}

export const initialState: IDownloadState = {
  activeDownloads: [],
};

export const downloadReducer = createReducer<IDownloadState>(
  initialState,
  on(DownloadActions.downloadStart, (state, { download }) => ({
    ...state,
    activeDownloads: [
      ...state.activeDownloads,
      { ...download, status: EDownloadStatus.Download },
    ],
  })),
  on(DownloadActions.downloadFail, (state, { id }) => ({
    ...state,
    activeDownloads: filterDownloads(id, state.activeDownloads),
  })),
  on(DownloadActions.updateDownloadProgress, (state, { id, progress }) => ({
    ...state,
    activeDownloads: state.activeDownloads.map((current) => ({
      ...current,
      progress: current.id === id ? progress : current.progress,
    })),
  })),
  on(DownloadActions.convertToMp3, (state, { id }) => ({
    ...state,
    activeDownloads: state.activeDownloads.map((download) => ({
      ...download,
      status: download.id === id ? EDownloadStatus.Convert : download.status,
    })),
  })),
  on(DownloadActions.convertToMp3Success, (state, { id }) => ({
    ...state,
    activeDownloads: filterDownloads(id, state.activeDownloads),
  })),
  on(DownloadActions.convertToMp3Fail, (state, { id }) => ({
    ...state,
    activeDownloads: filterDownloads(id, state.activeDownloads),
  }))
);

const filterDownloads = (
  id: string,
  downloads: IActiveDownload[]
): IActiveDownload[] => {
  return downloads.filter((download) => download.id !== id);
};
