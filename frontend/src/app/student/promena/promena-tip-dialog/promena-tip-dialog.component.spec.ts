import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaTipDialogComponent } from './promena-tip-dialog.component';

describe('PromenaTipDialogComponent', () => {
  let component: PromenaTipDialogComponent;
  let fixture: ComponentFixture<PromenaTipDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaTipDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaTipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
