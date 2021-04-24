import { EMessages, IConfig } from "./models";
import { readFile } from "fs";
import { resolve } from "path";
import { BrowserWindow } from "electron";

export const initializeConfig = (
  win: BrowserWindow,
  DEFAULT_PATH: string
): void => {
  try {
    readFile(
      resolve(__dirname, "../config.json"),
      { encoding: "utf8" },
      (err, config) => {
        if (err) {
          throw err;
        } else {
          const configJson: IConfig = JSON.parse(config);

          if (!configJson.musicPath) {
            configJson.musicPath = DEFAULT_PATH;
          }

          win.webContents.send(EMessages.InitConfig, configJson);
        }
      }
    );
  } catch (err) {
    console.error(err);
    win.webContents.send(EMessages.InitConfig, {
      musicPath: DEFAULT_PATH,
      apiKey: "",
    });
  }
};
