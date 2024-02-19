import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStudentComponent } from './registration-student.component';

describe('RegistrationStudentComponent', () => {
  let component: RegistrationStudentComponent;
  let fixture: ComponentFixture<RegistrationStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationStudentComponent]
    });
    fixture = TestBed.createComponent(RegistrationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
