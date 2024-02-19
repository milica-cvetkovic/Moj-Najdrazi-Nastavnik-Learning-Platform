import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceniComponent } from './oceni.component';

describe('OceniComponent', () => {
  let component: OceniComponent;
  let fixture: ComponentFixture<OceniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OceniComponent]
    });
    fixture = TestBed.createComponent(OceniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
