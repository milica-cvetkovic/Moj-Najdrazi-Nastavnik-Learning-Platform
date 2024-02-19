import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

export interface ProfilnaDialog {
  profilna: File | null;
}

@Component({
  selector: 'app-promena-profilne-slike-dialog',
  templateUrl: './promena-profilne-slike-dialog.component.html',
  styleUrls: ['./promena-profilne-slike-dialog.component.css']
})
export class PromenaProfilneSlikeDialogComponent {


  profilna: File | null = null;

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<PromenaProfilneSlikeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfilnaDialog,
  ) {}

  ponisti(){
    this.dialogRef.close()
  }

  uploadImage(event: any){
    let slika = event.target.files[0]

    let ekstenzija = (slika.name).split('.')
    ekstenzija = ekstenzija[ekstenzija.length - 1]

    switch(ekstenzija){
      case 'jpg': case 'png':
        break;
      default:
        alert("Slika mora biti jpg ili png")
        return
    }

    let image = new Image()
    image.src = window.URL.createObjectURL(slika)
    image.onload = () => {
      if(image.width < 100 || image.width > 300 || image.height < 100 ||image.height > 300){
        alert("Slika minimalne velicine 100x100 px, maksimalne 300x300 px")
      }
      else{
        this.data.profilna = slika
      }
    }

  }

}
