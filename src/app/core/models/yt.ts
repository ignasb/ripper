interface IYtBaseResponse {
  etag: string;
  items: IYtSearchResult[] | IYtVideoListResult[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  id: {
    kind: "string";
    videoId: "string";
  };
}

export interface ISearchResult extends IYtVideoListResult {
  isDownloadDisabled: boolean;
  isDownloaded: boolean;
}
export interface IYtSearchResult {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
}

export interface IYtVideoListResult {
  etag: string;
  kind: string;
  id: string;
  snippet?: any;
  contentDetails?: any;
  statistics?: any;
}

export interface IYtSearchResponse extends IYtBaseResponse {
  nextpageToken: string;
  regionCode: string;
  items: IYtSearchResult[];
}

export interface IYtVideoListResponse extends IYtBaseResponse {
  items: IYtVideoListResult[];
}
