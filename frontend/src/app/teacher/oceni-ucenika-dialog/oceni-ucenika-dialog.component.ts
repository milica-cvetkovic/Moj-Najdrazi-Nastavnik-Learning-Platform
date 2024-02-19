import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface OceniDialog {
  komentar: string;
  ocena: number;
}

@Component({
  selector: 'app-oceni-ucenika-dialog',
  templateUrl: './oceni-ucenika-dialog.component.html',
  styleUrls: ['./oceni-ucenika-dialog.component.css']
})
export class OceniUcenikaDialogComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<OceniUcenikaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OceniDialog,
  ) {}

  ponisti(){
    this.dialogRef.close()
  }

}
