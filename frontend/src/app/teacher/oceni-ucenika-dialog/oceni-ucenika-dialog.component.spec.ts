import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceniUcenikaDialogComponent } from './oceni-ucenika-dialog.component';

describe('OceniUcenikaDialogComponent', () => {
  let component: OceniUcenikaDialogComponent;
  let fixture: ComponentFixture<OceniUcenikaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OceniUcenikaDialogComponent]
    });
    fixture = TestBed.createComponent(OceniUcenikaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
