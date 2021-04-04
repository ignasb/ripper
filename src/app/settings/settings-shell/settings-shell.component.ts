import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-settings-shell',
  templateUrl: './settings-shell.component.html',
  styleUrls: ['./settings-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
