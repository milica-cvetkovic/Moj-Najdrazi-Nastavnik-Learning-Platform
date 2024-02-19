import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface ImeDialog {
  prezime: string;
}

@Component({
  selector: 'app-promena-prezimena-dialog',
  templateUrl: './promena-prezimena-dialog.component.html',
  styleUrls: ['./promena-prezimena-dialog.component.css']
})
export class PromenaPrezimenaDialogComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaPrezimenaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImeDialog,
  ) {}

  ponistiPrezime(){
    this.dialogRef.close()
  }

}
