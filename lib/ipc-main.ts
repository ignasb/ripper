import { ipcMain } from "electron";
import ytdl = require("ytdl-core");
import { app } from "electron";
const fs = require("fs");

export const ripperIpcMain = (() => {
  const initialize = () => {
    ipcMain.on("download-video", (event, arg) => {
      const x = download(arg.id);
    });
  };

  const download = async (id: string): Promise<any> => {
    const info = await ytdl.getInfo(id);
    console.log(info.videoDetails.video_url);
    const savePath = `${app.getPath("music")}/${
      info.player_response.videoDetails.title
    }.mp4`;
    ytdl(info.videoDetails.video_url, {
      quality: "highestaudio",
    }).pipe(fs.createWriteStream(savePath));
  };

  return { initialize };
})();
