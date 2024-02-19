import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentService } from 'src/app/services/student.service';

export interface ImeDialog {
  ime: string;
}

@Component({
  selector: 'app-promena-imena-dialog',
  templateUrl: './promena-imena-dialog.component.html',
  styleUrls: ['./promena-imena-dialog.component.css']
})
export class PromenaImenaDialogComponent {

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaImenaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImeDialog,
  ) {}

  ponistiIme(){
    this.dialogRef.close()
  }


}
