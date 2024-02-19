import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface AdresaDialog {
  adresa: string;
}

@Component({
  selector: 'app-promena-adrese-dialog',
  templateUrl: './promena-adrese-dialog.component.html',
  styleUrls: ['./promena-adrese-dialog.component.css']
})
export class PromenaAdreseDialogComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaAdreseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdresaDialog,
  ) {}

  ponistiAdresu(){
    this.dialogRef.close()
  }

}
