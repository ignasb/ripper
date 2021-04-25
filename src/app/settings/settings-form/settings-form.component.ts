import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IConfig } from "../../../../lib/models";

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

  @Output()
  public updateConfig = new EventEmitter<IConfig>();

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

  onSubmit(): void {
    this.updateConfig.emit();
  }
}
