import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface TipDialog {
  tip_skole: string;
  tipovi: string[];
}

@Component({
  selector: 'app-promena-tip-dialog',
  templateUrl: './promena-tip-dialog.component.html',
  styleUrls: ['./promena-tip-dialog.component.css']
})
export class PromenaTipDialogComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaTipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipDialog,
  ) {}
  ngOnInit(): void {
      
  }

  tip: string[] = []

  ponistiTip(){
    this.dialogRef.close()
  }

}
