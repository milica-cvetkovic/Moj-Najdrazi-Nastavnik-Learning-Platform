import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugoZakazivanjeComponent } from './drugo-zakazivanje.component';

describe('DrugoZakazivanjeComponent', () => {
  let component: DrugoZakazivanjeComponent;
  let fixture: ComponentFixture<DrugoZakazivanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugoZakazivanjeComponent]
    });
    fixture = TestBed.createComponent(DrugoZakazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
