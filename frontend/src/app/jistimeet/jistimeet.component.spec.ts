import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JistimeetComponent } from './jistimeet.component';

describe('JistimeetComponent', () => {
  let component: JistimeetComponent;
  let fixture: ComponentFixture<JistimeetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JistimeetComponent]
    });
    fixture = TestBed.createComponent(JistimeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
