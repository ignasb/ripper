import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchYtResultsComponent } from './search-yt-results.component';

describe('SearchYtResultsComponent', () => {
  let component: SearchYtResultsComponent;
  let fixture: ComponentFixture<SearchYtResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchYtResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchYtResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
