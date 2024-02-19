import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ucenik } from 'src/app/models/ucenik';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService){}

  ngOnInit(): void {

    this.adminService.dohvatiSveUcenike().subscribe(data=>{
      this.ucenici = data
    })

  }

  kolone = ['rb', 'ime', 'prezime', 'info']

  ucenici: Ucenik[] = []

  detalji(ucenik: Ucenik){
    localStorage.setItem("ucenik", JSON.stringify(ucenik))
    this.router.navigate(["admin-student-info"])
  }

}
