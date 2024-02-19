import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ucenik } from 'src/app/models/ucenik';
import { TeacherService } from 'src/app/services/teacher.service';
import { Cas } from 'src/app/models/cas';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.css']
})
export class TeacherStudentsComponent implements OnInit {
  
  constructor(private router: Router, private teacherService: TeacherService) {}
  
  ngOnInit(): void {
  
    let na = localStorage.getItem("logged")
    if(na != null){
      this.nastavnik = na
    }


    this.teacherService.dohvatiSveCasove(this.nastavnik).subscribe(data=>{
      this.ucenici = data
      
      let setKorIme = new Set<string>()
      
      this.uceniciUnique = this.ucenici.filter((u)=>{
        if(!setKorIme.has(u.ucenikKombinovano.at(0).korisnicko_ime)){
          setKorIme.add(u.ucenikKombinovano.at(0).korisnicko_ime)
          return true
        }
        return false
      })

    })
  }

  nastavnik: string = "";
  kolone = ["rb", "ucenik", "dosije"]

  ucenici: any[] = []
  uceniciUnique: any[] = []

  dosije(ucenik: string){

    let casovi = this.ucenici.filter((u)=> u.ucenikKombinovano.at(0).korisnicko_ime == ucenik)

    localStorage.setItem("casovi", JSON.stringify(casovi))
    localStorage.setItem("ucenik", ucenik)

    this.router.navigate(["teacher-student-info"])

  }

}
