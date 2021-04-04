import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SearchService } from "../../core/services/search/search.service";
import { Observable } from "rxjs";
import { IYtVideoListResponse, IYtVideoListResult } from "../../core/models";
import { map } from "rxjs/operators";

@Component({
  selector: "app-search-shell",
  templateUrl: "./search-shell.component.html",
  styleUrls: ["./search-shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchShellComponent implements OnInit {
  public results$: Observable<IYtVideoListResult[]>;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  public onSearchSubmit(query: string): void {
    this.results$ = this.getVideoResults$(query);
  }

  private getVideoResults$(query: string): Observable<IYtVideoListResult[]> {
    return this.searchService
      .searchVideos$(query)
      .pipe(map((response) => response.items));
  }
}
