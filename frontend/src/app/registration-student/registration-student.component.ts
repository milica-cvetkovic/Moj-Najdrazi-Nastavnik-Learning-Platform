import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginRegistrationService } from '../services/login-registration.service';
import { BezbedonosnoPitanje } from '../models/bezbedonosno_pitanje';
import { Ucenik } from '../models/ucenik';

@Component({
  selector: 'app-registration-student',
  templateUrl: './registration-student.component.html',
  styleUrls: ['./registration-student.component.css']
})
export class RegistrationStudentComponent implements OnInit {
 
  constructor(private router: Router, private registrationService: LoginRegistrationService) {}

  ngOnInit(): void {
    this.registrationService.bezbedonosnaPitanja().subscribe(data=>{
      if(data!=null){
        this.bezbedonosnaPitanja = data
      }
    })
  }

  bezbedonosnaPitanja: BezbedonosnoPitanje[] = []
  
  ucenik: Ucenik = new Ucenik()

  greska: string = ""

  profilna_slika: File | null = null;

  uploadImage(event:any){
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
        this.profilna_slika = slika
      }
    }

  }

  register(){

    let regex = /^(?=.*[A-Z])(?=(.*[a-z]){3})(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z][a-zA-Z0-9!@#$%^&*]{5,9}$/;

    if(this.profilna_slika){
      this.ucenik.profilna_slika = this.ucenik.korisnicko_ime + "-" + this.profilna_slika.name
    }else{
      this.ucenik.profilna_slika = "default.jpg"
    }

    if(this.ucenik.korisnicko_ime == "" || this.ucenik.lozinka == "" || this.ucenik.bezbedonosno_pitanje=="" || this.ucenik.odgovor == "" || this.ucenik.ime=="" || this.ucenik.prezime=="" || this.ucenik.adresa=="" || this.ucenik.pol=="" || this.ucenik.email=="" || this.ucenik.kontakt_telefon=="" || this.ucenik.tip_skole=="" || this.ucenik.trenutni_razred==0){
      alert("Nisu uneti svi podaci")
    }
    else if(!regex.test(this.ucenik.lozinka)){
      alert("Lozinka nije u dobrom formatu")
    }
    else if((this.ucenik.tip_skole == "srednja-gimnazija" || this.ucenik.tip_skole == "srednja-strucna" || this.ucenik.tip_skole == "srednja-umetnicka") && this.ucenik.trenutni_razred > 4){
      alert("Razred ne može biti veći od 4 za srednju školu")
    }
    else{

      this.registrationService.registerUcenik(this.ucenik).subscribe(data=>{
        if(data !=null){
          alert(data.message)
          if(this.profilna_slika != null){
            this.registrationService.registerProfilnaSlika(this.profilna_slika, this.ucenik.korisnicko_ime).subscribe(data=>{
              if(data != null){
                
              }
            })
          }

        }
      })
    }

  }

}
