import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsShellComponent } from './downloads-shell.component';

describe('DownloadsShellComponent', () => {
  let component: DownloadsShellComponent;
  let fixture: ComponentFixture<DownloadsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
