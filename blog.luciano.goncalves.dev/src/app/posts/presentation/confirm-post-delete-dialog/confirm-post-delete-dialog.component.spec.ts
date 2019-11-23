import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPostDeleteDialogComponent } from './confirm-post-delete-dialog.component';

describe('ConfirmPostDeleteDialogComponent', () => {
  let component: ConfirmPostDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmPostDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPostDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPostDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
