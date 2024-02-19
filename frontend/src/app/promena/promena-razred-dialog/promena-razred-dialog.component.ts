import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface RazredDialog {
  trenutni_razred: number;
}

@Component({
  selector: 'app-promena-razred-dialog',
  templateUrl: './promena-razred-dialog.component.html',
  styleUrls: ['./promena-razred-dialog.component.css']
})
export class PromenaRazredDialogComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaRazredDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RazredDialog,
  ) {}

  ponistiRazred(){
    this.dialogRef.close()
  }

}
