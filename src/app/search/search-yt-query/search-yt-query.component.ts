import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-search-yt-query",
  templateUrl: "./search-yt-query.component.html",
  styleUrls: ["./search-yt-query.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchYtQueryComponent implements OnInit {
  public searchForm: FormGroup;

  @Output()
  public searchSubmit: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl("", Validators.required),
    });
  }

  onSubmit(): void {
    this.searchSubmit.emit(this.searchForm.value.search);
  }
}
