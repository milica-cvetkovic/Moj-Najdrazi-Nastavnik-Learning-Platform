import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgottenAdminComponent } from './password-forgotten-admin.component';

describe('PasswordForgottenAdminComponent', () => {
  let component: PasswordForgottenAdminComponent;
  let fixture: ComponentFixture<PasswordForgottenAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordForgottenAdminComponent]
    });
    fixture = TestBed.createComponent(PasswordForgottenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
