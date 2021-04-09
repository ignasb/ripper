import { MoreVideoDetails, videoInfo } from "ytdl-core";

export interface IDownloadStatus {
  msg: string;
  success: boolean;
}

export interface IDownloadProgress {
  id: string;
  progress: number;
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
  ConvertingToMp3 = "converting-to-mp3",
  ConvertingToMp3Ended = "converting-to-mp3-ended",
  ConvertingToMp3Failed = "converting-to-mp3-failed",
  Error = "error",
}
