import { Readable } from "node:stream";
import { BrowserWindow, ipcMain } from "electron";
import { EMessages } from "./models";

export const onStreamUpdate = (
  id: string,
  stream: Readable,
  win: BrowserWindow
): void => {
  stream.on("progress", (chunk: number, downloaded: number, total: number) => {
    win.webContents.send(EMessages.DownloadProgress, {
      id,
      progress: Math.round((downloaded * 100) / total),
    });
  });

  stream.on("end", () => {
    win.webContents.send(EMessages.DownloadEnded, id);
  });

  stream.on("error", () => {
    win.webContents.send(EMessages.DownloadFailed, id);
  });
};
