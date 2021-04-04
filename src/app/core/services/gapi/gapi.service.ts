import { Injectable } from "@angular/core";
import { google } from "googleapis";

@Injectable({
  providedIn: "root",
})
export class GapiService {
  yt = google.youtube({
    version: "v3",
  });

  constructor() {}
}
