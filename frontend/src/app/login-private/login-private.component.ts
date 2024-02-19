import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegistrationService } from '../services/login-registration.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-login-private',
  templateUrl: './login-private.component.html',
  styleUrls: ['./login-private.component.css']
})
export class LoginPrivateComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginRegistrationService){}
  
  ngOnInit(): void {
    
  }
  
  korisnickoIme: string = ""
  lozinka: string = ""
  greska: string = ""
  korisnik: Korisnik = new Korisnik()

  loginAdmin(){
    if(this.korisnickoIme == "" || this.lozinka == ""){
      this.greska = "Niste uneli sve podatke"
    }
    else{
      this.loginService.loginAdmin(this.korisnickoIme, this.lozinka).subscribe(data=>{
          if(data.message == "Uspešno"){
            localStorage.setItem("logged", this.korisnik.korisnicko_ime)
            this.router.navigate(['admin-home'])
          }
          else{
            alert(data.message)
          }
      })
    }
  }


}
