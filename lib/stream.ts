import { Readable } from "node:stream";
import { BrowserWindow } from "electron";
import { EMessages, IDownloadProgress } from "./models";
import { BehaviorSubject, merge, Observable, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  throttleTime,
} from "rxjs/operators";

const DELAY_TIME = 100;

enum EStreamEvents {
  Progress = "progress",
  End = "end",
  Error = "error",
}

export const onStreamUpdate = (
  id: string,
  stream: Readable,
  win: BrowserWindow
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
    dispose(stream, emitterSubscription);
    win.webContents.send(EMessages.DownloadEnded, id);
  });

  stream.on(EStreamEvents.Error, () => {
    dispose(stream, emitterSubscription);
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

const dispose = (stream: Readable, subscription: Subscription): void => {
  // Need to wait for DELAY_TIME before unsubscribing, otherwise last debounced/throttled values wont be emitter.
  setTimeout(() => {
    subscription.unsubscribe();
    stream.destroy();
  }, DELAY_TIME);
};
