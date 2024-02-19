import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface PredmetDialog {
  predmet: string;
}

@Component({
  selector: 'app-dodavanje-predmeta',
  templateUrl: './dodavanje-predmeta.component.html',
  styleUrls: ['./dodavanje-predmeta.component.css']
})
export class DodavanjePredmetaComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<DodavanjePredmetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PredmetDialog,
  ) {}

  ponistiPredmet(){
    this.dialogRef.close()
  }

}
