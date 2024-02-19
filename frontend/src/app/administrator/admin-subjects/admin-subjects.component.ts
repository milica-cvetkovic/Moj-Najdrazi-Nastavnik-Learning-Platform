import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from 'src/app/models/predmet';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.css']
})
export class AdminSubjectsComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService){}

  ngOnInit(): void {

    this.adminService.dohvatiSvePredmete().subscribe(data=>{
      this.predmeti = data
    })

  }

  predmeti: Predmet[] = []
  kolone = ['rb', 'predmet']

  predmet: string = ""

  unesi(){
    this.adminService.unesiPredmet(this.predmet).subscribe(data=>{
      alert(data.message)
      window.location.reload()
    })
  }

}
