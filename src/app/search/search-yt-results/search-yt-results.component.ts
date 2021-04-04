import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-search-yt-results",
  templateUrl: "./search-yt-results.component.html",
  styleUrls: ["./search-yt-results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchYtResultsComponent implements OnInit {
  @Input()
  public results$: Observable<any>;

  constructor() {}

  ngOnInit(): void {}
}
