import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface OcenaDialog {
  komentar: string;
  ocena: number;
}

@Component({
  selector: 'app-oceni',
  templateUrl: './oceni.component.html',
  styleUrls: ['./oceni.component.css']
})
export class OceniComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<OceniComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OcenaDialog,
  ) {}

  ponisti(){
    this.dialogRef.close()
  }

}
