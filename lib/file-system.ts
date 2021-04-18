import { BrowserWindow } from "electron";
import { readdir, watch } from "fs";
import { EMessages } from "./models";

export const initializeFs = (win: BrowserWindow, path: string): void => {
  readMusicFiles(win, path);

  let watchTimeoutId = null;
  const WATCH_DELAY = 5000;
  watch(path, () => {
    if (!watchTimeoutId) {
      watchTimeoutId = setTimeout(() => {
        readMusicFiles(win, path);
        watchTimeoutId = null;
      }, WATCH_DELAY);
    }
  });
};

const readMusicFiles = (win: BrowserWindow, path: string): void => {
  readdir(path, (err, files) => {
    const musicFiles = files.filter((file) => file.match(/.mp3/g));
    win.webContents.send(
      EMessages.AvailableSongs,
      musicFiles.map((file) => file.replace(".mp3", ""))
    );
  });
};
