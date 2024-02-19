import { Component, Inject, OnInit, Sanitizer } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Ucenik } from 'src/app/models/ucenik';
import { StudentService } from 'src/app/services/student.service';
import { PromenaImenaDialogComponent } from '../../promena/promena-imena-dialog/promena-imena-dialog.component';
import { PromenaPrezimenaDialogComponent } from '../../promena/promena-prezimena-dialog/promena-prezimena-dialog.component';
import { PromenaAdreseDialogComponent } from '../../promena/promena-adrese-dialog/promena-adrese-dialog.component';
import { PromenaEmailDialogComponent } from '../../promena/promena-email-dialog/promena-email-dialog.component';
import { PromenaTelefonDialogComponent } from '../../promena/promena-telefon-dialog/promena-telefon-dialog.component';
import { PromenaTipDialogComponent } from '../../promena/promena-tip-dialog/promena-tip-dialog.component';
import { PromenaRazredDialogComponent } from '../../promena/promena-razred-dialog/promena-razred-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { PromenaProfilneSlikeDialogComponent } from 'src/app/promena/promena-profilne-slike-dialog/promena-profilne-slike-dialog.component';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  
  constructor(private router:Router, private studentService: StudentService, public dialog: MatDialog, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    
    let korIme = localStorage.getItem("logged")
    if(korIme != null){
      this.studentService.dohvatiProfil(korIme).subscribe(data=>{
        if(data != null){
          this.ucenik = data
  
          this.studentService.dohvatiProfilnuSliku(this.ucenik.profilna_slika).subscribe((slika: Blob)=>{
          
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

  ucenik: Ucenik = new Ucenik()

  profilna_slika: any

  ime: string = "";
  prezime: string = "";
  adresa: string = "";
  email: string = "";
  kontakt_telefon: string = "";
  tip_skole: string = "";
  trenutni_razred: number = 0;
  profilna: File | null = null;

  promeniIme(){
    const dialogRef = this.dialog.open(PromenaImenaDialogComponent, {
      data: {ime: this.ime},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.ime = data
        this.studentService.promeniIme(this.ucenik.korisnicko_ime, this.ime).subscribe(res=>{
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
        this.studentService.promeniPrezime(this.ucenik.korisnicko_ime, this.prezime).subscribe(res=>{
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
        this.studentService.promeniAdresu(this.ucenik.korisnicko_ime, this.adresa).subscribe(res=>{
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
        this.studentService.promeniEmail(this.ucenik.korisnicko_ime, this.email).subscribe(res=>{
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
        this.studentService.promeniKontaktTelefon(this.ucenik.korisnicko_ime, this.kontakt_telefon).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
  }

  promeniTipSkole(){

    let tipovi = ["osnovna", "srednja-gimnazija", "srednja-strucna", "srednja-umetnicka"]
    
    if(this.ucenik.tip_skole.includes("srednja")){
       tipovi.splice(0,1)
    }

    const dialogRef = this.dialog.open(PromenaTipDialogComponent, {
      data: {tip_skole: this.tip_skole, tipovi: tipovi},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.tip_skole = data
        
        this.studentService.promeniTipSkole(this.ucenik.korisnicko_ime, this.tip_skole).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })

      }
    })
  }

  promeniRazred(){
    const dialogRef = this.dialog.open(PromenaRazredDialogComponent, {
      data: {trenutni_razred: this.trenutni_razred},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.trenutni_razred = data

        if(this.trenutni_razred > 8){
          alert("Nevalidan razred")
        }
        if(this.trenutni_razred<=4 && this.trenutni_razred > 1 && this.ucenik.trenutni_razred==8 && this.ucenik.tip_skole.indexOf("srednja") >= 0){
          alert("Ažuriranje razreda moze biti samo inkrementalno")
        }
        else if(this.ucenik.trenutni_razred < 8 && this.trenutni_razred < this.ucenik.trenutni_razred){
          alert("Ažuriranje razreda moze biti samo inkrementalno")
        }
        else if(this.trenutni_razred - this.ucenik.trenutni_razred != 1 || this.trenutni_razred > 8){
          alert("Ažuriranje razreda moze biti samo inkrementalno")
        }
        else if(this.ucenik.tip_skole.includes("srednja") && this.trenutni_razred > 4){
          alert("Najviši razred jeste 4. za srednju školu")
        }
        else{
          this.studentService.promeniTrenutniRazred(this.ucenik.korisnicko_ime, this.trenutni_razred).subscribe(res=>{
            if(res!=null){
              alert(res.message)
              window.location.reload()
            }
          })
        }

      }
    })
  }
  
  promeniProfilnu(){
    const dialogRef = this.dialog.open(PromenaProfilneSlikeDialogComponent, {
      data: {profilna: this.profilna},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.profilna = data
        if(this.profilna != null){
          this.studentService.promeniProfilnuSliku(this.profilna, this.ucenik.korisnicko_ime).subscribe(data=>{
            alert(data.message)
            window.location.reload()
          })
        }

      }
    })
  }

}