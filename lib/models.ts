import { MoreVideoDetails, videoInfo } from "ytdl-core";

export interface IDownloadStatus {
  msg: string;
  success: boolean;
}

export interface IDownloadStreamMetaData {
  id: string;
  progress: number;
}

export enum EMessages {
  DownloadVideo = "download-video",
  DownloadEnded = "download-ended",
  DownloadFailed = "download-failed",
  DownloadProgress = "download-progress",
  Error = "error",
}
