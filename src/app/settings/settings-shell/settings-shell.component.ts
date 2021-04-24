import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigSelectors } from "../../store/selectors/config.selectors";

@Component({
  selector: "app-settings-shell",
  templateUrl: "./settings-shell.component.html",
  styleUrls: ["./settings-shell.component.scss"],
})
export class SettingsShellComponent implements OnInit {
  ytApiKey$: Observable<string>;
  musicPath$: Observable<string>;

  constructor(private readonly configSelectors: ConfigSelectors) {
    this.ytApiKey$ = configSelectors.ytApiKey$;
    this.musicPath$ = configSelectors.musicPath$;
  }

  ngOnInit(): void {}

  public onSettingsSubmit(): void {
    console.log("submitted settings");
  }
}
