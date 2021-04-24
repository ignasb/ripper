import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { IYtSearchResponse, IYtVideoListResponse } from "../../models";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private baseApi = "https://youtube.googleapis.com/youtube/v3/";
  private maxResults = 10;

  constructor(private http: HttpClient) {}

  private getSearchResults$(
    search: string,
    key: string
  ): Observable<IYtSearchResponse> {
    const { baseApi, maxResults } = this;
    const path = `${baseApi}search?q=${search}&maxResults=${maxResults}&key=${key}`;

    return this.http.get<IYtSearchResponse>(path);
  }

  private getVideosList$(
    ids: string[],
    key: string
  ): Observable<IYtVideoListResponse> {
    const { baseApi } = this;
    const encodedIds = encodeURIComponent(ids.join(","));
    const path = `${baseApi}videos?part=snippet%2CcontentDetails%2Cstatistics&id=${encodedIds}&key=${key}`;

    return this.http.get<IYtVideoListResponse>(path);
  }

  searchVideos$(search: string, key: string): Observable<IYtVideoListResponse> {
    return this.getSearchResults$(search, key).pipe(
      switchMap((response) =>
        this.getVideosList$(
          response.items.map((i) => i.id.videoId),
          key
        )
      )
    );
  }
}
