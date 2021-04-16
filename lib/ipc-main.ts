import { BrowserWindow, app } from "electron";
import { initilizeDownloader } from "./downloader";

export const ripperIpcMain = (() => {
  const initialize = (win: BrowserWindow) => {
    const BASE_PATH = app.getPath("music");
    initilizeDownloader(win, BASE_PATH);
  };
  return { initialize };
})();
