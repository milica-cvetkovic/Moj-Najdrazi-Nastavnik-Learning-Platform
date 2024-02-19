import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTeacherSecondComponent } from './registration-teacher-second.component';

describe('RegistrationTeacherSecondComponent', () => {
  let component: RegistrationTeacherSecondComponent;
  let fixture: ComponentFixture<RegistrationTeacherSecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationTeacherSecondComponent]
    });
    fixture = TestBed.createComponent(RegistrationTeacherSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
