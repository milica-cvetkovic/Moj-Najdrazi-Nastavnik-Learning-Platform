import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaTelefonDialogComponent } from './promena-telefon-dialog.component';

describe('PromenaTelefonDialogComponent', () => {
  let component: PromenaTelefonDialogComponent;
  let fixture: ComponentFixture<PromenaTelefonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaTelefonDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaTelefonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
