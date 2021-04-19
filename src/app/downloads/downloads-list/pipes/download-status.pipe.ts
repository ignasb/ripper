import { Pipe, PipeTransform } from "@angular/core";
import { EDownloadStatus } from "../../../core/models/download";

@Pipe({
  name: "downloadStatus",
})
export class DownloadStatusPipe implements PipeTransform {
  transform(status: EDownloadStatus, progress?: number): string {
    if (status === EDownloadStatus.Download) {
      return `Downloading...${progress}%`;
    }

    if (status === EDownloadStatus.Convert) {
      return `Converting to mp3`;
    }

    return status;
  }
}
