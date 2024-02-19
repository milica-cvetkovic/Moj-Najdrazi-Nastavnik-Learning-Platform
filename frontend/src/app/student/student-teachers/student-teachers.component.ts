import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nastavnik } from 'src/app/models/nastavnik';
import { Ucenik } from 'src/app/models/ucenik';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-teachers',
  templateUrl: './student-teachers.component.html',
  styleUrls: ['./student-teachers.component.css']
})
export class StudentTeachersComponent implements OnInit {
  
  constructor(private router:Router, private studentService: StudentService) {}
  
  ngOnInit(): void {
    let korisnicko_ime = localStorage.getItem("logged")
    if(korisnicko_ime != null){
      this.studentService.dohvatiProfil(korisnicko_ime).subscribe(data=>{
        this.ucenik = data
      })
    }

    let tip = ""
    if(this.ucenik.tip_skole == "osnovna" && this.ucenik.trenutni_razred >=1 && this.ucenik.trenutni_razred <=4){
      tip = "osnovna1"
    }
    else if(this.ucenik.tip_skole == "osnovna" && this.ucenik.trenutni_razred>=5 && this.ucenik.trenutni_razred<=8){
      tip="osnovna2"
    }
    else{
      tip="srednja"
    }

    this.studentService.dohvatiNastavnike(tip).subscribe(data=>{
      this.nastavnici = data

      for(let i = 0; i<this.nastavnici.length; i++){
        let nastavnik = this.nastavnici.at(i)
        if(nastavnik != undefined){
          if(nastavnik.ocene.length > 0){
            let zvezda = this.prosecnaOcena(nastavnik)
            nastavnik.zvezdice = zvezda;
          }
          else{
            nastavnik.zvezdice = 0
          }
        }

      }

      // SORTIRANJE

      let sort = localStorage.getItem("sort")
      
      if(sort == "1"){
        this.nastavnici.sort((a,b) => {
          if(b.ime > a.ime) return -1
          if(b.ime < a.ime) return 1
          return 0
        })
      }
      else if(sort == "2"){
        this.nastavnici.sort((a,b) => {
          if(a.ime > b.ime) return -1
          if(a.ime < b.ime) return 1
          return 0
        })
      }
      else if(sort == "3"){
        this.nastavnici.sort((a,b) => {
          if(b.prezime > a.prezime) return -1
          if(b.prezime < a.prezime) return 1
          return 0
        })
      }
      else if(sort == "4"){
        this.nastavnici.sort((a,b) => {
          if(a.prezime > b.prezime) return -1
          if(a.prezime < b.prezime) return 1
          return 0
        })
      }
      else if(sort == "5"){
        this.nastavnici.forEach(n=>{
          n.predmeti.sort((a,b)=>{
            if(b>a) return -1
            if(b<a) return 1
            return 0
          })
        })
      }
      else if(sort == "6"){
        this.nastavnici.forEach(n=>{
          n.predmeti.sort((a,b)=>{
            if(a>b) return -1
            if(a<b) return 1
            return 0
          })
        })
      }
      localStorage.setItem("sort", "")

      // PRETRAGA

      let flag = localStorage.getItem("flagPretraga")

      if(flag == "flag"){

        localStorage.setItem("flagPretraga", "")
        let pre = localStorage.getItem("pretraga")
        let pretraga = {predmet: "", ime: "", prezime: ""}
        if(pre != null){
          pretraga = JSON.parse(pre)
        }
        

        this.nastavnici = this.nastavnici.filter(n => pretraga.ime ? pretraga.ime === n.ime : true)
        this.nastavnici = this.nastavnici.filter(n=>pretraga.prezime ? pretraga.prezime === n.prezime : true)        

        if(pretraga.predmet != ""){
          for(let i = 0; i<this.nastavnici.length; i++){
            
            let flg = 0 
            let nastavnik = this.nastavnici.at(i)
            if(nastavnik != undefined){
              nastavnik.predmeti.forEach(p=>{
                if(p == pretraga.predmet){
                  flg = 1
                }
              })
              if(flg == 0){
                this.nastavnici.splice(i, 1)
                i--
              }
            }

          }
        }

      }

    })

  }
  
  index: number = 0
  kolone: string[] = ['rb', 'ime', 'prezime', 'predmeti', 'ocena']

  ucenik: Ucenik = new Ucenik()

  nastavnici: Nastavnik[] = []

  zvezdice: Array<number> = []

  ime: string = ""
  prezime: string = ""
  predmet: string = ""

  prosecnaOcena(n: Nastavnik){
    
    let suma = 0;
    let broj = 0;
    n.ocene.forEach(function(ocena){
      suma += ocena;
      broj++;
    })

    let result = Math.floor(suma/broj)

    return result;
  }

  sortValue: string = ""

  sorting(event: any){
    localStorage.setItem("sort", this.sortValue)
    window.location.reload()
  }

  pretraga(){
    let pretraga = {
      ime: this.ime,
      prezime: this.prezime,
      predmet: this.predmet
    }
    localStorage.setItem("pretraga", JSON.stringify(pretraga))
    localStorage.setItem("flagPretraga", "flag")
    window.location.reload()
  }

  nastavnikInfo(n:Nastavnik){
    localStorage.setItem("nastavnikInfo", JSON.stringify(n))
    this.router.navigate(["student-teacher-info"])
  }

}
