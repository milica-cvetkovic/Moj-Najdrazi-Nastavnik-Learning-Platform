import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegistrationService } from '../services/login-registration.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-login-public',
  templateUrl: './login-public.component.html',
  styleUrls: ['./login-public.component.css']
})
export class LoginPublicComponent implements OnInit {
  
  constructor(private router: Router, private loginService: LoginRegistrationService){}
  
  ngOnInit(): void {
    
  }

  korisnickoIme: string = ""
  lozinka: string = ""
  greska: string = ""

  korisnik: Korisnik = new Korisnik()

  login(){
    if(this.korisnickoIme == "" || this.lozinka == ""){
      alert("Niste uneli sve podatke")
    }
    else{
      this.loginService.login(this.korisnickoIme, this.lozinka).subscribe(data=>{
        if(data== null){
          alert("Korisnik ne postoji")
        }
        else{
          this.korisnik = data
          if(this.korisnik.greska != ""){
            alert(this.korisnik.greska)
          }
          else if(this.korisnik.tip == "ucenik"){
            localStorage.setItem("logged", this.korisnik.korisnicko_ime)
            this.router.navigate(['student-home'])
          }
          else if(this.korisnik.tip == "nastavnik"){
            localStorage.setItem("logged", this.korisnik.korisnicko_ime)
            this.router.navigate(['teacher-home'])
          }
        }
      })
    }
  }

  registerUcenik(){
    this.router.navigate(["registration-student"])
  }

  registerNastavnik(){
    this.router.navigate(["registration-teacher-first-step"])
  }

}
