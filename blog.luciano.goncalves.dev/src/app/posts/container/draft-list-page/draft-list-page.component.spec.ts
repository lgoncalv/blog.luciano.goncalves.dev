import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftListPageComponent } from './draft-list-page.component';

describe('DraftListPageComponent', () => {
  let component: DraftListPageComponent;
  let fixture: ComponentFixture<DraftListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
