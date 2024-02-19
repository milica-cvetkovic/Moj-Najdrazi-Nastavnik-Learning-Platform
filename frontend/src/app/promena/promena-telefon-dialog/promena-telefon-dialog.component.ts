import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface TelefonDialog {
  kontakt_telefon: string;
}

@Component({
  selector: 'app-promena-telefon-dialog',
  templateUrl: './promena-telefon-dialog.component.html',
  styleUrls: ['./promena-telefon-dialog.component.css']
})
export class PromenaTelefonDialogComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaTelefonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TelefonDialog,
  ) {}

  ponistiTelefon(){
    this.dialogRef.close()
  }

}
