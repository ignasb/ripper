import ytdl = require("ytdl-core");
import { Readable } from "node:stream";

export const download = (id: string): Readable => {
  const path = `https://www.youtube.com/watch?v=${id}`;
  return ytdl(path, {
    quality: "highestaudio",
  });
};
