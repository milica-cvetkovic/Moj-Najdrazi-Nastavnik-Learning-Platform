import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminHomeComponent } from './administrator/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { LoginPrivateComponent } from './login-private/login-private.component';
import { LoginPublicComponent } from './login-public/login-public.component';
import { RegistrationStudentComponent } from './registration-student/registration-student.component';
import { RegistrationTeacherFirstComponent } from './registration-teacher-first/registration-teacher-first.component';
import { RegistrationTeacherSecondComponent } from './registration-teacher-second/registration-teacher-second.component';
import { PromenaAdreseDialogComponent } from './promena/promena-adrese-dialog/promena-adrese-dialog.component';
import { PromenaEmailDialogComponent } from './promena/promena-email-dialog/promena-email-dialog.component';
import { PromenaImenaDialogComponent } from './promena/promena-imena-dialog/promena-imena-dialog.component';
import { PromenaPrezimenaDialogComponent } from './promena/promena-prezimena-dialog/promena-prezimena-dialog.component';
import { PromenaRazredDialogComponent } from './promena/promena-razred-dialog/promena-razred-dialog.component';
import { PromenaTelefonDialogComponent } from './promena/promena-telefon-dialog/promena-telefon-dialog.component';
import { PromenaTipDialogComponent } from './promena/promena-tip-dialog/promena-tip-dialog.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentNavbarComponent } from './student/student-navbar/student-navbar.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { StudentTeacherInfoComponent } from './student/student-teacher-info/student-teacher-info.component';
import { StudentTeachersComponent } from './student/student-teachers/student-teachers.component';
import { TeacherHomeComponent } from './teacher/teacher-home/teacher-home.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PrvoZakazivanjeComponent } from './student/zakazivanje/prvo-zakazivanje/prvo-zakazivanje.component';
import { DrugoZakazivanjeComponent } from './student/zakazivanje/drugo-zakazivanje/drugo-zakazivanje.component';
import { StudentClassesComponent } from './student/student-classes/student-classes.component';
import { OceniComponent } from './student/oceni/oceni.component';
import { StudentNotificationsComponent } from './student/student-notifications/student-notifications.component';
import { TeacherNavbarComponent } from './teacher/teacher-navbar/teacher-navbar.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { DodavanjePredmetaComponent } from './promena/dodavanje-predmeta/dodavanje-predmeta.component';
import { DodavanjeUzrastaComponent } from './promena/dodavanje-uzrasta/dodavanje-uzrasta.component';
import { TeacherClassesComponent } from './teacher/teacher-classes/teacher-classes.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TeacherStudentsComponent } from './teacher/teacher-students/teacher-students.component';
import { TeacherStudentInfoComponent } from './teacher/teacher-student-info/teacher-student-info.component';
import { OceniUcenikaDialogComponent } from './teacher/oceni-ucenika-dialog/oceni-ucenika-dialog.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AdminNavbarComponent } from './administrator/admin-navbar/admin-navbar.component';
import { AdminTeachersComponent } from './administrator/admin-teachers/admin-teachers.component';
import { AdminStudentsComponent } from './administrator/admin-students/admin-students.component';
import { AdminSubjectsComponent } from './administrator/admin-subjects/admin-subjects.component';
import { AdminRequestsComponent } from './administrator/admin-requests/admin-requests.component';
import { AdminTeacherUpdateComponent } from './administrator/admin-teacher-update/admin-teacher-update.component';
import { PromenaProfilneSlikeDialogComponent } from './promena/promena-profilne-slike-dialog/promena-profilne-slike-dialog.component';
import { JistimeetComponent } from './jistimeet/jistimeet.component';
import { OtkazivanjeComponent } from './teacher/otkazivanje/otkazivanje.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import {MatStepperModule} from '@angular/material/stepper';
import { AdminStudentInfoComponent } from './administrator/admin-student-info/admin-student-info.component';
import { FooterComponent } from './footer/footer.component';
import { PasswordForgottenAdminComponent } from './password-forgotten-admin/password-forgotten-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPublicComponent,
    LoginPrivateComponent,
    HomeComponent,
    RegistrationStudentComponent,
    RegistrationTeacherFirstComponent,
    RegistrationTeacherSecondComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    AdminHomeComponent,
    StudentNavbarComponent,
    StudentProfileComponent,
    PromenaImenaDialogComponent,
    PromenaPrezimenaDialogComponent,
    PromenaAdreseDialogComponent,
    PromenaEmailDialogComponent,
    PromenaTelefonDialogComponent,
    PromenaTipDialogComponent,
    PromenaRazredDialogComponent,
    StudentTeachersComponent,
    StudentTeacherInfoComponent,
    PrvoZakazivanjeComponent,
    DrugoZakazivanjeComponent,
    StudentClassesComponent,
    OceniComponent,
    StudentNotificationsComponent,
    TeacherNavbarComponent,
    TeacherProfileComponent,
    DodavanjePredmetaComponent,
    DodavanjeUzrastaComponent,
    TeacherClassesComponent,
    HomeNavbarComponent,
    TeacherStudentsComponent,
    TeacherStudentInfoComponent,
    OceniUcenikaDialogComponent,
    AdminNavbarComponent,
    AdminTeachersComponent,
    AdminStudentsComponent,
    AdminSubjectsComponent,
    AdminRequestsComponent,
    AdminTeacherUpdateComponent,
    PromenaProfilneSlikeDialogComponent,
    JistimeetComponent,
    OtkazivanjeComponent,
    PasswordForgottenComponent,
    AdminStudentInfoComponent,
    FooterComponent,
    PasswordForgottenAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FullCalendarModule,
    MatDatepickerModule,
    CanvasJSAngularChartsModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
