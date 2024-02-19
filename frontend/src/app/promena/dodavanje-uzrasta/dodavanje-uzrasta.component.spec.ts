import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeUzrastaComponent } from './dodavanje-uzrasta.component';

describe('DodavanjeUzrastaComponent', () => {
  let component: DodavanjeUzrastaComponent;
  let fixture: ComponentFixture<DodavanjeUzrastaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjeUzrastaComponent]
    });
    fixture = TestBed.createComponent(DodavanjeUzrastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
