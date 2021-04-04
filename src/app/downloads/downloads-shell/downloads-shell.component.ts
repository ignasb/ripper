import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-downloads-shell',
  templateUrl: './downloads-shell.component.html',
  styleUrls: ['./downloads-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadsShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
