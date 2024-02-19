import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaAdreseDialogComponent } from './promena-adrese-dialog.component';

describe('PromenaAdreseDialogComponent', () => {
  let component: PromenaAdreseDialogComponent;
  let fixture: ComponentFixture<PromenaAdreseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaAdreseDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaAdreseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
