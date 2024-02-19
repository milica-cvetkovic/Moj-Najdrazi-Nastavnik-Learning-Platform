import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegistrationService } from '../services/login-registration.service';

@Component({
  selector: 'app-password-forgotten-admin',
  templateUrl: './password-forgotten-admin.component.html',
  styleUrls: ['./password-forgotten-admin.component.css']
})
export class PasswordForgottenAdminComponent implements OnInit {

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

    this.loginService.promeniLozinkuAdmin(this.korisnicko_ime, this.staralozinka, this.novalozinka).subscribe(data=>{
      alert(data.message)
      if(data.message == "Uspešna promena lozinke"){
        this.router.navigate(["login-private"])
      }
    })
  }

}
