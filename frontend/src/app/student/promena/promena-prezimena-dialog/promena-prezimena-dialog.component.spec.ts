import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaPrezimenaDialogComponent } from './promena-prezimena-dialog.component';

describe('PromenaPrezimenaDialogComponent', () => {
  let component: PromenaPrezimenaDialogComponent;
  let fixture: ComponentFixture<PromenaPrezimenaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaPrezimenaDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaPrezimenaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
