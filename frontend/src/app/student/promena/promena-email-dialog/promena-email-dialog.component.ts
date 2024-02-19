import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface EmailDialog {
  email: string;
}

@Component({
  selector: 'app-promena-email-dialog',
  templateUrl: './promena-email-dialog.component.html',
  styleUrls: ['./promena-email-dialog.component.css']
})
export class PromenaEmailDialogComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailDialog,
  ) {}

  ponistiEmail(){
    this.dialogRef.close()
  }

}
