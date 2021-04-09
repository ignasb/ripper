import { Readable } from "node:stream";
import { BrowserWindow } from "electron";
import { EMessages, IDownloadProgress } from "./models";
import { BehaviorSubject, merge, Observable, Subscription } from "rxjs";
import fs = require("fs");
import {
  debounceTime,
  distinctUntilChanged,
  throttleTime,
} from "rxjs/operators";
import Ffmpeg = require("fluent-ffmpeg");
import pathToFFmpeg = require("ffmpeg-static");

const DELAY_TIME = 100;

enum EStreamEvents {
  Progress = "progress",
  End = "end",
  Error = "error",
}

Ffmpeg.setFfmpegPath(pathToFFmpeg);

export const onStreamUpdate = (
  id: string,
  stream: Readable,
  win: BrowserWindow,
  path: string
): void => {
  const progress$ = new BehaviorSubject<IDownloadProgress>({ id, progress: 0 });
  const progressEmitter$ = getProgressEmitter$(progress$);
  const emitterSubscription = progressEmitter$.subscribe(({ id, progress }) => {
    win.webContents.send(EMessages.DownloadProgress, {
      id,
      progress,
    });
  });

  stream.on(
    EStreamEvents.Progress,
    (chunk: number, downloaded: number, total: number) => {
      const progress = Math.round((downloaded * 100) / total);
      progress$.next({ id, progress });
    }
  );

  stream.on(EStreamEvents.End, () => {
    convertVideoToMp3(stream, path)
      .then(
        () => {
          win.webContents.send(EMessages.ConvertingToMp3, id);
        },
        () => {
          win.webContents.send(EMessages.ConvertingToMp3Failed, id);
        }
      )
      .finally(() => {
        dispose(stream, emitterSubscription, path);
      });
  });

  stream.on(EStreamEvents.Error, () => {
    dispose(stream, emitterSubscription, path);
    win.webContents.send(EMessages.DownloadFailed, id);
  });
};

const getProgressEmitter$ = (
  progress$: BehaviorSubject<IDownloadProgress>
): Observable<IDownloadProgress> => {
  const throttled$ = progress$.pipe(throttleTime(DELAY_TIME));
  const debounced$ = progress$.pipe(debounceTime(DELAY_TIME));

  return merge(throttled$, debounced$).pipe(
    distinctUntilChanged((x, y) => x.progress === y.progress)
  );
};

const convertVideoToMp3 = (stream: Readable, path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    new Ffmpeg(path)
      .audioCodec("libmp3lame")
      .audioBitrate(192)
      .output(`${path}.mp3`)
      .on("error", (err) => {
        reject();
      })
      .on("end", () => {
        resolve();
      })
      .run();
  });
};

const dispose = (stream: Readable, subscription: Subscription, path): void => {
  // Need to wait for DELAY_TIME before unsubscribing, otherwise last debounced/throttled values wont be emitter.
  setTimeout(() => {
    subscription.unsubscribe();
    stream.destroy();
    fs.unlinkSync(path);
  }, DELAY_TIME);
};
