import { BrowserWindow, ipcMain } from "electron";
import { download } from "./downloader";
import { onStreamUpdate } from "./stream";
import { EMessages } from "./models";
import fs = require("fs");
import { app } from "electron";

export const ripperIpcMain = (() => {
  const initialize = (win: BrowserWindow) => {
    ipcMain.on(EMessages.DownloadVideo, (event, { id, title }) => {
      const readableStream = download(id);
      const path = `${app.getPath("music")}/${title}`;
      const writableStream = fs.createWriteStream(path);
      onStreamUpdate(id, readableStream, win, path);
      readableStream.pipe(writableStream);
    });
  };
  return { initialize };
})();
