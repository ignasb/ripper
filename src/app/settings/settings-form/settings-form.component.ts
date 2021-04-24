import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-settings-form",
  templateUrl: "./settings-form.component.html",
  styleUrls: ["./settings-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsFormComponent implements OnInit, OnChanges {
  @Input()
  public apiKey: string;

  @Input()
  public musicPath: string;

  public settings: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    const { apiKey, musicPath } = this;

    this.settings = this.fb.group({
      musicPath,
      apiKey,
    });

    this.settings.disable();
  }

  ngOnChanges(): void {
    console.log(this);
  }
}
