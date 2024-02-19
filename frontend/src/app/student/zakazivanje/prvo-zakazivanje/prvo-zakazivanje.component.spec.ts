import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrvoZakazivanjeComponent } from './prvo-zakazivanje.component';

describe('PrvoZakazivanjeComponent', () => {
  let component: PrvoZakazivanjeComponent;
  let fixture: ComponentFixture<PrvoZakazivanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrvoZakazivanjeComponent]
    });
    fixture = TestBed.createComponent(PrvoZakazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
