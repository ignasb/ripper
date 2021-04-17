import { BrowserWindow, app } from "electron";
import { initilizeDownloader } from "./downloader";
import { initializeFs } from "./file-system";

export const ripperIpcMain = (() => {
  const initialize = (win: BrowserWindow) => {
    const BASE_PATH = app.getPath("music");
    win.webContents.once("dom-ready", () => {
      initilizeDownloader(win, BASE_PATH);
      initializeFs(win, BASE_PATH);
    });
  };
  return { initialize };
})();
