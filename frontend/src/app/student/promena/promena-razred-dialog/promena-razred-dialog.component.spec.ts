import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaRazredDialogComponent } from './promena-razred-dialog.component';

describe('PromenaRazredDialogComponent', () => {
  let component: PromenaRazredDialogComponent;
  let fixture: ComponentFixture<PromenaRazredDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaRazredDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaRazredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
