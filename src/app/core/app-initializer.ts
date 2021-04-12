import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { EMessages } from "../../../lib/models";
import { DownloadActions } from "../store/actions";
import { IAppState } from "../store/reducers";
import { IpcService } from "./services/ipc/ipc.service";

export const appInitializer = (
  ipcService: IpcService,
  store: Store<IAppState>,
  snackBar: MatSnackBar
): void => {
  const onProgressUpdate = (event, { id, progress }) => {
    store.dispatch(DownloadActions.updateDownloadProgress({ id, progress }));
  };

  const onDownloadError = (event, id) => {
    store.dispatch(DownloadActions.downloadFail({ id }));
  };

  const onDownloadSuccess = (event, id) => {
    store.dispatch(DownloadActions.downloadSuccess({ id }));
  };

  const onConvertToMp3 = (event, id) => {
    store.dispatch(DownloadActions.convertToMp3({ id }));
  };

  const onConvertToMp3Success = (event, id) => {
    store.dispatch(DownloadActions.convertToMp3Success({ id }));
    snackBar.open(`Saved ${id}`);
  };

  const onConvertToMp3Fail = (event, id) => {
    store.dispatch(DownloadActions.convertToMp3Fail({ id }));
  };

  const onDowloadStarted = (event, id) => {
    snackBar.open(`Started downloading ${id}`);
    // store.dispatch(DownloadActions.downloadStarted({ id }));
  };

  ipcService.on(EMessages.DownloadProgress, onProgressUpdate);
  ipcService.on(EMessages.DownloadFail, onDownloadError);
  ipcService.on(EMessages.DownloadSucess, onDownloadSuccess);

  ipcService.on(EMessages.ConvertingToMp3, onConvertToMp3);
  ipcService.on(EMessages.ConvertingToMp3Sucess, onConvertToMp3Success);
  ipcService.on(EMessages.ConvertingToMp3Fail, onConvertToMp3Fail);
  ipcService.on(EMessages.DownloadVideo, onDowloadStarted);
};
