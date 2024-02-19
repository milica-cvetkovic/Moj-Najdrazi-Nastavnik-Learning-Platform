import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface UzrastDialog {
  uzrastInit: string[];
  uzrast: string;
}

@Component({
  selector: 'app-dodavanje-uzrasta',
  templateUrl: './dodavanje-uzrasta.component.html',
  styleUrls: ['./dodavanje-uzrasta.component.css']
})
export class DodavanjeUzrastaComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<DodavanjeUzrastaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UzrastDialog,
  ) {}
  ngOnInit(): void {

    if(this.data.uzrastInit.indexOf("Osnovna 1-4. razred")==-1){
      this.uzrasti.push("Osnovna 1-4. razred")
    }
    if (this.data.uzrastInit.indexOf("Osnovna 5-8. razred")==-1){
      this.uzrasti.push("Osnovna 5-8. razred")
    }
    if(this.data.uzrastInit.indexOf("Srednja") == -1){
      this.uzrasti.push("Srednja")
    }

  }

  uzrasti: Array<string> = []

  ponistiUzrast(){
    this.dialogRef.close()
  }


}
