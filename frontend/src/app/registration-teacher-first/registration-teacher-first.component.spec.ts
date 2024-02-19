import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTeacherFirstComponent } from './registration-teacher-first.component';

describe('RegistrationTeacherFirstComponent', () => {
  let component: RegistrationTeacherFirstComponent;
  let fixture: ComponentFixture<RegistrationTeacherFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationTeacherFirstComponent]
    });
    fixture = TestBed.createComponent(RegistrationTeacherFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
