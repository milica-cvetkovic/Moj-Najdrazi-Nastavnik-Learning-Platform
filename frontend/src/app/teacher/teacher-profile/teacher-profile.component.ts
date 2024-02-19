import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Nastavnik } from 'src/app/models/nastavnik';
import { DodavanjePredmetaComponent } from 'src/app/promena/dodavanje-predmeta/dodavanje-predmeta.component';
import { DodavanjeUzrastaComponent } from 'src/app/promena/dodavanje-uzrasta/dodavanje-uzrasta.component';
import { PromenaAdreseDialogComponent } from 'src/app/promena/promena-adrese-dialog/promena-adrese-dialog.component';
import { PromenaEmailDialogComponent } from 'src/app/promena/promena-email-dialog/promena-email-dialog.component';
import { PromenaImenaDialogComponent } from 'src/app/promena/promena-imena-dialog/promena-imena-dialog.component';
import { PromenaPrezimenaDialogComponent } from 'src/app/promena/promena-prezimena-dialog/promena-prezimena-dialog.component';
import { PromenaProfilneSlikeDialogComponent } from 'src/app/promena/promena-profilne-slike-dialog/promena-profilne-slike-dialog.component';
import { PromenaTelefonDialogComponent } from 'src/app/promena/promena-telefon-dialog/promena-telefon-dialog.component';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  constructor(private router:Router, private teacherService: TeacherService, public dialog: MatDialog,  private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    
    let korIme = localStorage.getItem("logged")
    if(korIme != null){
      this.teacherService.dohvatiProfil(korIme).subscribe(data=>{
        if(data != null){
          this.nastavnik = data
          
            if(this.nastavnik.uzrast.indexOf("osnovna1")>-1){
              this.uzrastInit.push("Osnovna 1-4. razred")
            }
            if (this.nastavnik.uzrast.indexOf("osnovna2")>-1){
              this.uzrastInit.push("Osnovna 5-8. razred")
            }
            if(this.nastavnik.uzrast.indexOf("srednja")> -1){
              this.uzrastInit.push("Srednja")
            }
            
          this.teacherService.dohvatiProfilnuSliku(this.nastavnik.profilna_slika).subscribe((slika: Blob)=>{
            let fileReader = new FileReader()
            fileReader.onloadend = () => {
            this.profilna_slika = this.sanitizer.bypassSecurityTrustUrl(fileReader.result as string);
        }
        fileReader.readAsDataURL(slika)
          },
          (err) => {
            alert("Greska pri dohvatanju slike")
          })
  
        }
      })
    }
    
  }

  nastavnik: Nastavnik = new Nastavnik()

  profilna_slika: any

  ime: string = "";
  prezime: string = "";
  adresa: string = "";
  email: string = "";
  kontakt_telefon: string = "";
  uzrast:string = "";
  predmet: string = "";
  
  uzrastInit: Array<string> = [];

  profilna: File | null = null;

  promeniIme(){
    const dialogRef = this.dialog.open(PromenaImenaDialogComponent, {
      data: {ime: this.ime},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.ime = data
        this.teacherService.promeniIme(this.nastavnik.korisnicko_ime, this.ime).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  promeniPrezime(){
    const dialogRef = this.dialog.open(PromenaPrezimenaDialogComponent, {
      data: {ime: this.prezime},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.prezime = data
        this.teacherService.promeniPrezime(this.nastavnik.korisnicko_ime, this.prezime).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  promeniAdresu(){
    const dialogRef = this.dialog.open(PromenaAdreseDialogComponent, {
      data: {adresa: this.adresa},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.adresa = data
        this.teacherService.promeniAdresu(this.nastavnik.korisnicko_ime, this.adresa).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  promeniEmail(){
    const dialogRef = this.dialog.open(PromenaEmailDialogComponent, {
      data: {email: this.email},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.email = data
        this.teacherService.promeniEmail(this.nastavnik.korisnicko_ime, this.email).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  promeniTelefon(){
    const dialogRef = this.dialog.open(PromenaTelefonDialogComponent, {
      data: {kontakt_telefon: this.kontakt_telefon},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.kontakt_telefon = data
        this.teacherService.promeniKontaktTelefon(this.nastavnik.korisnicko_ime, this.kontakt_telefon).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  dodajPredmet(){
    const dialogRef = this.dialog.open(DodavanjePredmetaComponent, {
      data: {predmet: this.predmet},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.predmet = data
        this.teacherService.dodajPredmet(this.nastavnik.korisnicko_ime, this.predmet).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  obrisiPredmet(p: string){
    this.teacherService.obrisiPredmet(this.nastavnik.korisnicko_ime, p).subscribe(data=>{
      if(data!=null){
        alert(data.message)
        window.location.reload()
      }
    })
  }

  dodajUzrast(){

    const dialogRef = this.dialog.open(DodavanjeUzrastaComponent, {
      data: {uzrastInit: this.uzrastInit, uzrast: this.uzrast},
    });

    dialogRef.afterClosed().subscribe(data=> {
      
      if(data != undefined){
        this.uzrast = data
        if(this.uzrast == "Osnovna 1-4. razred"){
          this.uzrast = "osnovna1"
        }
        else if (this.uzrast=="Osnovna 5-8. razred"){
          this.uzrast ="osnovna2"
        }
        else{
          this.uzrast = "srednja"
        }
        this.teacherService.dodajUzrast(this.nastavnik.korisnicko_ime, this.uzrast).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  obrisiUzrast(u: string){

    if(u == "Osnovna 1-4. razred"){
      u = "osnovna1"
    }
    else if (u=="Osnovna 5-8. razred"){
      u ="osnovna2"
    }
    else{
      u = "srednja"
    }
    this.teacherService.obrisiUzrast(this.nastavnik.korisnicko_ime,u).subscribe(data=>{
      alert(data.message)
      window.location.reload()
    })

  }

  promeniProfilnu(){
    const dialogRef = this.dialog.open(PromenaProfilneSlikeDialogComponent, {
      data: {profilna: this.profilna},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.profilna = data
        if(this.profilna != undefined){
          this.teacherService.promeniProfilnuSliku(this.profilna, this.nastavnik.korisnicko_ime).subscribe(data=>{
            alert(data.message)
            window.location.reload()
          })
        }

      }
    })
  }

}
