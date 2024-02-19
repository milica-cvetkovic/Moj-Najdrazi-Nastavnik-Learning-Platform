import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjePredmetaComponent } from './dodavanje-predmeta.component';

describe('DodavanjePredmetaComponent', () => {
  let component: DodavanjePredmetaComponent;
  let fixture: ComponentFixture<DodavanjePredmetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjePredmetaComponent]
    });
    fixture = TestBed.createComponent(DodavanjePredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
