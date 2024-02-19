import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentInfoComponent } from './admin-student-info.component';

describe('AdminStudentInfoComponent', () => {
  let component: AdminStudentInfoComponent;
  let fixture: ComponentFixture<AdminStudentInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStudentInfoComponent]
    });
    fixture = TestBed.createComponent(AdminStudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
