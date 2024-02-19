import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './administrator/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { LoginPrivateComponent } from './login-private/login-private.component';
import { LoginPublicComponent } from './login-public/login-public.component';
import { RegistrationStudentComponent } from './registration-student/registration-student.component';
import { RegistrationTeacherFirstComponent } from './registration-teacher-first/registration-teacher-first.component';
import { RegistrationTeacherSecondComponent } from './registration-teacher-second/registration-teacher-second.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentTeacherInfoComponent } from './student/student-teacher-info/student-teacher-info.component';
import { StudentTeachersComponent } from './student/student-teachers/student-teachers.component';
import { TeacherHomeComponent } from './teacher/teacher-home/teacher-home.component';
import { PrvoZakazivanjeComponent } from './student/zakazivanje/prvo-zakazivanje/prvo-zakazivanje.component';
import { DrugoZakazivanjeComponent } from './student/zakazivanje/drugo-zakazivanje/drugo-zakazivanje.component';
import { StudentClassesComponent } from './student/student-classes/student-classes.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { StudentNotificationsComponent } from './student/student-notifications/student-notifications.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { TeacherClassesComponent } from './teacher/teacher-classes/teacher-classes.component';
import { TeacherStudentsComponent } from './teacher/teacher-students/teacher-students.component';
import { TeacherStudentInfoComponent } from './teacher/teacher-student-info/teacher-student-info.component';
import { AdminTeachersComponent } from './administrator/admin-teachers/admin-teachers.component';
import { AdminStudentsComponent } from './administrator/admin-students/admin-students.component';
import { AdminRequestsComponent } from './administrator/admin-requests/admin-requests.component';
import { AdminSubjectsComponent } from './administrator/admin-subjects/admin-subjects.component';
import { AdminTeacherUpdateComponent } from './administrator/admin-teacher-update/admin-teacher-update.component';
import { JistimeetComponent } from './jistimeet/jistimeet.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { AdminStudentInfoComponent } from './administrator/admin-student-info/admin-student-info.component';
import { PasswordForgottenAdminComponent } from './password-forgotten-admin/password-forgotten-admin.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login-public", component: LoginPublicComponent},
  {path: "login-private", component: LoginPrivateComponent},
  {path: "registration-teacher-first-step", component: RegistrationTeacherFirstComponent},
  {path: "registration-teacher-second-step", component: RegistrationTeacherSecondComponent},
  {path: "registration-student", component: RegistrationStudentComponent},
  {path: "student-home", component: StudentHomeComponent},
  {path: "teacher-home", component: TeacherHomeComponent},
  {path: "admin-home", component: AdminHomeComponent},
  {path: "student-teachers", component: StudentTeachersComponent},
  {path:"student-teacher-info", component: StudentTeacherInfoComponent},
  {path:"first-appointment", component: PrvoZakazivanjeComponent},
  {path:"second-appointment", component: DrugoZakazivanjeComponent},
  {path:"student-classes", component: StudentClassesComponent},
  {path:"student-profile", component: StudentProfileComponent},
  {path:"student-notifications", component: StudentNotificationsComponent},
  {path:"teacher-profile", component: TeacherProfileComponent},
  {path:"teacher-classes", component: TeacherClassesComponent},
  {path:"teacher-students", component: TeacherStudentsComponent},
  {path:"teacher-student-info", component: TeacherStudentInfoComponent},
  {path:"admin-teachers", component: AdminTeachersComponent},
  {path:"admin-students", component: AdminStudentsComponent},
  {path:"admin-requests", component: AdminRequestsComponent},
  {path:"admin-subjects", component: AdminSubjectsComponent},
  {path:"admin-teacher-update", component: AdminTeacherUpdateComponent},
  {path:"jitsi-meet", component: JistimeetComponent},
  {path:"password-forgotten", component: PasswordForgottenComponent},
  {path:"admin-student-info", component: AdminStudentInfoComponent},
  {path:"password-forgotten-admin", component: PasswordForgottenAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
