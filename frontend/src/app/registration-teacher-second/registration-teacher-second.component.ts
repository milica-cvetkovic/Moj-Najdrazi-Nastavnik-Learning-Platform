import { Component, OnInit } from '@angular/core';
import { LoginRegistrationService } from '../services/login-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Nastavnik } from '../models/nastavnik';
import { Predmet } from '../models/predmet';

@Component({
  selector: 'app-registration-teacher-second',
  templateUrl: './registration-teacher-second.component.html',
  styleUrls: ['./registration-teacher-second.component.css']
})
export class RegistrationTeacherSecondComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router, private registrationService: LoginRegistrationService) {}
  
  ngOnInit(): void {
    let nastavnik1 = this.route.snapshot.paramMap.get("nastavnikParam");
    let na = localStorage.getItem("nastavnik")
    if(na != null){
      this.nastavnik = JSON.parse(na)
    }

    
    this.nastavnik.predmeti = []
    this.nastavnik.uzrast = []

    this.registrationService.dohvatiPredmete().subscribe(data=>{
      this.predmeti = data
    })

  }

  nastavnik: Nastavnik = new Nastavnik

  greska: string = ""
  drugo: string = ""

  predmeti: Predmet[] = []

  cv: File | null = null;
  profilna_slika: File | null = null;

  promenaPredmeta(event:any){
    if(event.target.checked){
      this.nastavnik.predmeti.push(event.target.value)
    }
    else{
      for(let i = 0;i<this.nastavnik.predmeti.length; i++){
        if(this.nastavnik.predmeti.at(i) == event.target.value){
          this.nastavnik.predmeti.splice(i, 1)
          break
        }
      }
    }
  }

  promenaUzrasta(event:any){
    if(event.target.checked){
      this.nastavnik.uzrast.push(event.target.value)
    }
    else{
      for(let i = 0;i<this.nastavnik.uzrast.length; i++){
        if(this.nastavnik.uzrast.at(i) == event.target.value){
          this.nastavnik.uzrast.splice(i, 1)
          break
        }
      }
    }
  }

  uploadCV(event: any){

    let file = event.target.files[0]

    let ekstenzija1 = (file.name).split('.')
    let ekstenzija = ekstenzija1[ekstenzija1.length - 1]

    switch(ekstenzija){
      case 'pdf':
        break;
      default:
        alert("CV mora biti pdf")
        return
    }

    if(file.size > 3* 1024*1024){
      alert("Maksimalna veličina fajla je 3MB")
      return
    }

    this.cv = file

  }

  register(){

    if(!this.cv || this.predmeti.length == 0 || this.nastavnik.sajt == ""){
      alert("Niste uneli sve podatke")
      return
    }

    this.nastavnik.cv = this.nastavnik.korisnicko_ime + "-" + this.cv.name
    this.registrationService.registerNastavnik(this.nastavnik, this.drugo).subscribe(data=>{
      if(this.cv != null){
        this.registrationService.registerCV(this.cv, this.nastavnik.korisnicko_ime).subscribe(data1=>{
        
        })
      }


      alert(data.message)

    })

  }

}
