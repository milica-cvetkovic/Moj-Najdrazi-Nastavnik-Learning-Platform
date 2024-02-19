import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtkazivanjeComponent } from './otkazivanje.component';

describe('OtkazivanjeComponent', () => {
  let component: OtkazivanjeComponent;
  let fixture: ComponentFixture<OtkazivanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtkazivanjeComponent]
    });
    fixture = TestBed.createComponent(OtkazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
