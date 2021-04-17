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
  DownloadSucess = "download-success",
  DownloadFail = "download-fail",
  DownloadProgress = "download-progress",
  ConvertingToMp3 = "converting-to-mp3",
  ConvertingToMp3Sucess = "converting-to-mp3-success",
  ConvertingToMp3Fail = "converting-to-mp3-fail",
  Error = "error",
  AvailableSongs = "available-songs",
}
