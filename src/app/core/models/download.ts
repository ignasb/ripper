export interface IActiveDownload {
  id: string;
  title: string;
  thumbnail: string;
  progress: number;
  status: string;
}

export enum EDownloadStatus {
  Download = "download",
  Convert = "convert",
}
