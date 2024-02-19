import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface ObrazlozenjeDialog {
  obrazlozenje: string;
}

@Component({
  selector: 'app-otkazivanje',
  templateUrl: './otkazivanje.component.html',
  styleUrls: ['./otkazivanje.component.css']
})
export class OtkazivanjeComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<OtkazivanjeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObrazlozenjeDialog,
  ) {}

  ponisti(){
    this.dialogRef.close()
  }


}
