import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaEmailDialogComponent } from './promena-email-dialog.component';

describe('PromenaEmailDialogComponent', () => {
  let component: PromenaEmailDialogComponent;
  let fixture: ComponentFixture<PromenaEmailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaEmailDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
