import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegistrationService } from '../services/login-registration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BezbedonosnoPitanje } from '../models/bezbedonosno_pitanje';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.css']
})
export class PasswordForgottenComponent implements OnInit {
  
  constructor(private router: Router, private loginService: LoginRegistrationService, private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {

  }

  korisnicko_ime: string = ""
  staralozinka: string = ""
  novalozinka: string = ""
  ponovljenalozinka: string = ""

  promeni(){

    let regex = /^(?=.*[A-Z])(?=(.*[a-z]){3})(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z][a-zA-Z0-9!@#$%^&*]{5,9}$/;

    if(this.korisnicko_ime == "" || this.staralozinka == "" || this.novalozinka == "" || this.ponovljenalozinka == ""){
      alert("Nisu popunjena sva polja")
      return
    }
    
    if(this.ponovljenalozinka != this.novalozinka){
      alert("Lozinke se ne poklapaju")
      return
    }

    if(!regex.test(this.novalozinka)){
      alert("Lozinka nije u dobrom formatu")
      return  
    }

    this.loginService.promeniLozinku(this.korisnicko_ime, this.staralozinka, this.novalozinka).subscribe(data=>{
      alert(data.message)
      if(data.message == "Uspešna promena lozinke"){
        this.router.navigate(["login-public"])
      }
    })
  }

  korisnickoImeGroup = this.formBuilder.group({
    korisnickoImeCtrl: ['', Validators.required],
  });

  bezbedonosnoPitanjeGroup = this.formBuilder.group({
    bezbedonosnoPitanjeCtrl: ['', Validators.required]
  });

  isEditable = true;

  korisnicko_ime1: string = ""
  odgovor: string = ""
  bezbedonosno_pitanje: BezbedonosnoPitanje = new BezbedonosnoPitanje()

  dohvatiBezbedonosnoPitanje(){
    if(this.korisnicko_ime1 != ""){

      this.loginService.dohvatiBezbedonosnoPitanje(this.korisnicko_ime1).subscribe(data=>{
        this.bezbedonosno_pitanje = data
      })

    }  
  }

  poruka: string = ""
  lozinka: string = ""
  ponovljena: string = ""

  prikaz: number = 0

  proveriOdgovor(){
    if(this.odgovor != ""){
      this.loginService.proveriOdgovor(this.korisnicko_ime1, this.bezbedonosno_pitanje._id, this.odgovor).subscribe(data=>{
        
        if(data.message == "OK"){
          this.prikaz = 1
        }
        else{
          this.prikaz = 0
          this.poruka = data.message
        }
      })
    }
  }

  zaboravljenaLozinka(){

    let regex = /^(?=.*[A-Z])(?=(.*[a-z]){3})(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z][a-zA-Z0-9!@#$%^&*]{5,9}$/;

    if(this.lozinka == "" || this.ponovljena == ""){
      alert("Nisu uneti svi podaci")
      return
    }
    if(this.lozinka != this.ponovljena){
      alert("Lozinke se ne poklapaju")
      return
    }
    if(!regex.test(this.lozinka)){
      alert("Lozinka nije u dobrom formatu")
      return
    }


    this.loginService.zaboravljenaLozinka(this.korisnicko_ime1, this.lozinka).subscribe(data=>{
      alert(data.message)
      this.router.navigate(["login-public"])
    })
  }

}
