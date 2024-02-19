import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { Nastavnik } from 'src/app/models/nastavnik';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-teacher-info',
  templateUrl: './student-teacher-info.component.html',
  styleUrls: ['./student-teacher-info.component.css'],
})
export class StudentTeacherInfoComponent implements OnInit {
  
  constructor(private router:Router, private studentService: StudentService, private sanitizer: DomSanitizer){}
  
  ngOnInit(): void {

    let uc = localStorage.getItem("logged")
    if(uc != null){
      this.ucenik = uc
    }

    let na = localStorage.getItem("nastavnikInfo")
    if(na != null){
      this.nastavnik = JSON.parse(na)
    }

    this.studentService.dohvatiProfilnuSliku(this.nastavnik.profilna_slika).subscribe((slika: Blob)=>{
        
      let fileReader = new FileReader()
          fileReader.onloadend = () => {
          this.profilna_slika = this.sanitizer.bypassSecurityTrustUrl(fileReader.result as string);
      }
      fileReader.readAsDataURL(slika)
    },
    (err) => {
      alert("Greska pri dohvatanju slike")
    })

    this.studentService.dohvatiKomentareNastavnika(this.nastavnik.korisnicko_ime).subscribe(data=>{
      this.komentari = data
      this.komentari = this.komentari.filter(k=> k.ocenaUcenik != undefined)
    })

  }

  showNavigationArrows = true;
	showNavigationIndicators = true;

  nastavnik: Nastavnik = new Nastavnik()
  ucenik: string = ""

  profilna_slika: any

  komentari: Cas[] = []

  zakaziPrvi(){
    this.router.navigate(["first-appointment"])
  }

  zakaziDrugi(){
    this.router.navigate(["second-appointment"])
  }

}
