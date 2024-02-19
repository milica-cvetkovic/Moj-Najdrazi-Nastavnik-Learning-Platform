import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaImenaDialogComponent } from './promena-imena-dialog.component';

describe('PromenaImenaDialogComponent', () => {
  let component: PromenaImenaDialogComponent;
  let fixture: ComponentFixture<PromenaImenaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaImenaDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaImenaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
