import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { Obavestenje } from 'src/app/models/obavestenje';
import { Ucenik } from 'src/app/models/ucenik';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-notifications',
  templateUrl: './student-notifications.component.html',
  styleUrls: ['./student-notifications.component.css']
})
export class StudentNotificationsComponent implements OnInit {

  constructor(private router:Router, private studentService: StudentService, public dialog: MatDialog) {}
  
  
  ngOnInit(): void {

    let uc = localStorage.getItem("logged")
    if(uc != null){
      this.ucenik = uc
    }

    this.studentService.dohvatiObavestenja(this.ucenik).subscribe(data=>{
      this.casovi = data
    })
    
  }
 
  ucenik: string = ""
  casovi: Obavestenje[] = []

  tipObavestenja(cas: Obavestenje){

    if(cas.status == "P"){
      return "Potvrđen čas"
    }
    else if(cas.status == "O"){
      return "Otkazan čas"
    }
    else{
      return ""
    }
  }

  oznaciKaoProcitano(cas: Obavestenje){
    this.studentService.oznaciKaoProcitano(cas).subscribe(data=>{
      window.location.reload()
    })
  }

  datumString(date: Date){
    date = new Date(date)
    return date.toLocaleDateString()
  }

}
