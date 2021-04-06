import { access, mkdir } from "fs";
import { Observable } from "rxjs";
import { app } from "electron";
import ytdl = require("ytdl-core");

export const ripperFs = (() => {
  const BASE_PATH = app.getPath("music");

  const isPathExist = (path: string): Observable<boolean> => {};

  const createFolder = (name: string): Observable<boolean> => {};

  const writeMetaData = (path: string, data): Observable<any> => {};

  return {
    createFolder,
    writeMetaData,
  };
})();
