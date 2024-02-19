import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Nastavnik } from 'src/app/models/nastavnik';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-prvo-zakazivanje',
  templateUrl: './prvo-zakazivanje.component.html',
  styleUrls: ['./prvo-zakazivanje.component.css']
})
export class PrvoZakazivanjeComponent {
  
  constructor(private router:Router, private studentService: StudentService){}
  
  ngOnInit(): void {

    let uc = localStorage.getItem("logged")
    if(uc != null){
      this.ucenik = uc
    }

    let na = localStorage.getItem("nastavnikInfo")
    if(na != null){
      this.nastavnik = JSON.parse(na)
    }

    if(this.nastavnik.predmeti.length == 1){
      this.disabledPredmet = 1
    }

    this.minDatum = new Date().toISOString().slice(0, 16)
    
  }

  nastavnik: Nastavnik = new Nastavnik()
  ucenik: string = ""

  disabledPredmet: number = 0

  datetime: Date | null | undefined

  dupliCas: boolean = false
  minDatum: string = ""
  predmet: string =""
  opis: string =""


  zakazi(){
    
    if(this.datetime == null || this.predmet == ""){
      alert("Nisu uneti svi podaci")
      return
    }

    let dupli_cas = this.dupliCas?1:0;

    this.studentService.zakazi(this.nastavnik.korisnicko_ime, this.ucenik, this.predmet, this.datetime, this.opis, dupli_cas).subscribe(data=>{
      if(data!=null){
        alert(data.message)
      }
    })
  }

}
