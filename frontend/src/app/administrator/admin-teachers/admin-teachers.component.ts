import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nastavnik } from 'src/app/models/nastavnik';
import { Ucenik } from 'src/app/models/ucenik';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {
  
  constructor(private router: Router, private adminService: AdminService){}

  ngOnInit(): void {

    this.adminService.dohvatiSveNastavnike().subscribe(data=>{
      this.nastavnici = data
    })

  }

  kolone = ['rb', 'ime', 'prezime', 'azuriraj', 'deaktiviraj']

  nastavnici: Nastavnik[] = []

  azuriraj(n: Nastavnik) {
    localStorage.setItem("nastavnik", JSON.stringify(n))
    this.router.navigate(["admin-teacher-update"])
  }

  deaktiviraj(n: Nastavnik) {
    this.adminService.deaktiviraj(n.korisnicko_ime).subscribe(data=>{
      if(data!= undefined){
        alert(data.message)
      }
    })
  }

}
