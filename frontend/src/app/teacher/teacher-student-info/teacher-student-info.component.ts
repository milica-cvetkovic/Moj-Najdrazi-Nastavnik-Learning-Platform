import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { TeacherService } from 'src/app/services/teacher.service';
import { OceniComponent } from 'src/app/student/oceni/oceni.component';
import { OceniUcenikaDialogComponent } from '../oceni-ucenika-dialog/oceni-ucenika-dialog.component';

@Component({
  selector: 'app-teacher-student-info',
  templateUrl: './teacher-student-info.component.html',
  styleUrls: ['./teacher-student-info.component.css']
})
export class TeacherStudentInfoComponent {

  constructor(private router: Router, private teacherService: TeacherService, public dialog: MatDialog) {}
  
  ngOnInit(): void {

    let na = localStorage.getItem("logged")
    if(na != null){
      this.nastavnik = na
    }

    let ca = localStorage.getItem("casovi")
    if(ca != null){
      this.casovi = JSON.parse(ca)
    }

    let ucenik = localStorage.getItem("ucenik")

    this.teacherService.dohvatiSveCasove(this.nastavnik).subscribe(data=>{
      this.casovi = data

      let cas: Cas[] = []
      this.casovi.forEach(c=>{
        if(c.ucenik == ucenik){
          cas.push(c)
        }
      })
      this.casovi = cas
      
    })

    let prvi = this.casovi.at(0)
    if(prvi != undefined){
      let prvi2 = prvi.ucenikKombinovano.at(0)
      if(prvi2 != undefined){
        this.ime = prvi2.ime;
        this.prezime = prvi2.prezime;
    
      }

    }

  }

  nastavnik: string = "";
  ime: string = "";
  prezime: string = "";
  kolone = ["rb", "predmet", "datum", "ocena"]

  casovi: Cas[] = [];

  prikaziDatum(d: string){
    let datum = new Date(d)
    return datum.toLocaleDateString('sr-SR')
  }

  oceni(cas: Cas){
    
    let komentar;
    let ocena;
    const dialogRef = this.dialog.open(OceniUcenikaDialogComponent, {
      data: {
        komentar: komentar,
        ocena: ocena
      },
    })

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        komentar = data.komentar
        ocena = data.ocena
        cas.komentarNastavnik = komentar
        cas.ocenaNastavnik = ocena
        this.teacherService.oceniUcenika(cas).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload
          }
        })
      }
    })

  }

}
