import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BezbedonosnoPitanje } from '../models/bezbedonosno_pitanje';
import { LoginRegistrationService } from '../services/login-registration.service';
import { Nastavnik } from '../models/nastavnik';

@Component({
  selector: 'app-registration-teacher-first',
  templateUrl: './registration-teacher-first.component.html',
  styleUrls: ['./registration-teacher-first.component.css']
})
export class RegistrationTeacherFirstComponent implements OnInit {

  constructor(private router: Router, private registrationService: LoginRegistrationService) {}

  ngOnInit(): void {
    this.registrationService.bezbedonosnaPitanja().subscribe(data=>{
      if(data!=null){
        this.bezbedonosnaPitanja = data
      }
    })
  }

  bezbedonosnaPitanja: BezbedonosnoPitanje[] = []

  nastavnik: Nastavnik = new Nastavnik()

  greska: string = ""

  profilna_slika: File | null = null;

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
        this.profilna_slika = slika
      }
    }
  }

  sledeciKorak(){

    let regex = /^(?=.*[A-Z])(?=(.*[a-z]){3})(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z][a-zA-Z0-9!@#$%^&*]{5,9}$/;

    if(this.profilna_slika){
      this.nastavnik.profilna_slika = this.nastavnik.korisnicko_ime + "-" + this.profilna_slika.name
    }else{
      this.nastavnik.profilna_slika = "default.jpg"
    }
    if(this.nastavnik.korisnicko_ime == "" || this.nastavnik.lozinka == "" || this.nastavnik.bezbedonosno_pitanje=="" || this.nastavnik.odgovor == "" || this.nastavnik.ime=="" || this.nastavnik.prezime=="" || this.nastavnik.adresa=="" || this.nastavnik.pol=="" || this.nastavnik.email=="" || this.nastavnik.kontakt_telefon==""){
      alert("Nisu uneti svi podaci")
    }
    else if(!regex.test(this.nastavnik.lozinka)){
      alert("Lozinka nije u dobrom formatu")
    }
    else{
      localStorage.setItem("nastavnik", JSON.stringify(this.nastavnik))
    
      if(this.profilna_slika != null){
        this.registrationService.registerProfilnaSlika(this.profilna_slika, this.nastavnik.korisnicko_ime).subscribe(data=>{
          if(data != null){
            
          }
        })
        
      }
      this.router.navigate(["registration-teacher-second-step", {nastavnikParam: this.nastavnik}])
        

    }
  }

}
