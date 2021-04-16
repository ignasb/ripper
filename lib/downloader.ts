import ytdl = require("ytdl-core");
import { Readable } from "node:stream";
import { BrowserWindow, ipcMain } from "electron";
import { EMessages } from "./models";
import { onStreamUpdate } from "./stream";
import fs = require("fs");

const download = (id: string): Readable => {
  const path = `https://www.youtube.com/watch?v=${id}`;
  return ytdl(path, {
    quality: "highestaudio",
  });
};

const onDownloadVideo = (
  win: BrowserWindow,
  path: string,
  event,
  { id, title }: { id: string; title: string }
) => {
  const mp3Path = `${path}/${title}`;
  const readableStream = download(id);
  const writableStream = fs.createWriteStream(mp3Path);
  console.log(mp3Path);
  onStreamUpdate(id, readableStream, win, mp3Path);
  readableStream.pipe(writableStream);
};

export const initilizeDownloader = (win: BrowserWindow, path: string): void => {
  ipcMain.on(EMessages.DownloadVideo, (event, args) =>
    onDownloadVideo(win, path, event, args)
  );
};
