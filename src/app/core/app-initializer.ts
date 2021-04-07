import { EMessages } from "../../../lib/models";
import { IpcService } from "./services/ipc/ipc.service";

export const appInitializer = (ipcService: IpcService): void => {
  const onProgressUpdate = (event, data) => {
    console.log(data);
  };

  const onDownloadError = (event, data) => {
    console.log(data);
  };

  const onDownloadEnded = (event, data) => {
    console.log(data);
  };

  ipcService.on(EMessages.DownloadProgress, onProgressUpdate);
  ipcService.on(EMessages.DownloadFailed, onDownloadError);
  ipcService.on(EMessages.DownloadEnded, onDownloadEnded);
};
