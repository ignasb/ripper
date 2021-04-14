import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-search-yt-query",
  templateUrl: "./search-yt-query.component.html",
  styleUrls: ["./search-yt-query.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchYtQueryComponent implements OnInit, OnDestroy {
  @Input()
  public query$: Observable<string>;

  @Output()
  public searchSubmit: EventEmitter<string> = new EventEmitter<string>();

  public searchForm: FormGroup;
  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl("", Validators.required),
    });

    const sub = this.query$.subscribe((query) => {
      this.searchForm.controls.search.setValue(query);
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    this.searchSubmit.emit(this.searchForm.value.search);
  }
}
