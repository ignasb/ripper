import { ComponentFixture, TestBed } from "@angular/core/testing";

import { YtSearchComponent } from "./search-yt-query.component";

describe("YtSearchComponent", () => {
  let component: YtSearchComponent;
  let fixture: ComponentFixture<YtSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YtSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YtSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
