import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { StudentService } from 'src/app/services/student.service';
import { OceniComponent } from '../oceni/oceni.component';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit {

  constructor(private router:Router, private studentService: StudentService, public dialog: MatDialog) {}
  
  
  ngOnInit(): void {

    let uc = localStorage.getItem("logged")
    if(uc != null){
      this.ucenik = uc
    }

    this.studentService.dohvatiArhivuCasovaUcenika(this.ucenik).subscribe(data=>{
      this.casoviArhiva = data
    })

    this.studentService.dohvatiBuduceCasoveUcenika(this.ucenik).subscribe(data=>{
      this.casoviBuduci = data
    })
    
  }

  index: number = 0
  kolone: string[] = ['rb', 'datum', 'nastavnik', 'predmet', 'komentarNastavnik', 'komentar']

  ucenik: string = ""

  casoviArhiva: Cas[] = []

  datumPrikaz(cas: Cas){
    let datum = new Date(cas.datum)

    let date = datum.toLocaleDateString()
    let time = datum.toLocaleTimeString()

    datum.setMinutes(datum.getMinutes() + cas.dupli_cas==1?120:60)

    let timeEnd = datum.toLocaleTimeString()

    return date + " " + time + " - " + timeEnd
  }

  unesiKomentarIOcenu(cas: Cas){

    let komentar;
    let ocena;
    const dialogRef = this.dialog.open(OceniComponent, {
      data: {
        komentar: komentar,
        ocena: ocena
      },
    })

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        komentar = data.komentar
        ocena = data.ocena
        cas.komentarUcenik = komentar
        cas.ocenaUcenik = ocena
        this.studentService.oceniNastavnika(cas).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload
          }
        })
      }
    })
  }

  index3: number = 0
  kolone1: string[] = ['rb', 'datum', 'nastavnik', 'predmet', 'opis', 'pridruzi']


  casoviBuduci: Cas[] = []

  proveraPridruzi(cas: Cas){
    let danas = new Date()
    let datum = new Date(cas.datum)

    
    let razlika = datum.getTime() - danas.getTime()
    razlika = razlika/ (60*1000)
    if(razlika <= 15){
      return true
    }

    return false
  }

  jitsimeet: boolean = false;
  pridruziSe(cas: Cas){
   this.router.navigate(["jitsi-meet"])
  }

}
