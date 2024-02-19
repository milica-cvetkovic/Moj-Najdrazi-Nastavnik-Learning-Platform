import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Nastavnik } from 'src/app/models/nastavnik';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService){}

  ngOnInit(): void {

    this.adminService.zahtevi().subscribe(data=>{
      this.zahtevi = data
    })

  }

  zahtevi: Nastavnik[] = []

  kolone = ['rb', 'ime', 'prezime', 'cv', 'prihvati', 'odbij']

  odobren(z: Nastavnik, odobren: number){
    this.adminService.odobren(z.korisnicko_ime, odobren).subscribe(data=>{
      alert(data.message)
      window.location.reload()
    })
  }

  prikaziCV(zahtev: Nastavnik){
    this.adminService.dohvatiCV(zahtev.cv).subscribe((data: Blob)=>{
      let file = new Blob([data], {type: 'application/pdf'})
      let fileURL = window.URL.createObjectURL(file)
      window.open(fileURL, '_blank')
    })
  }

  odbijen(z: Nastavnik, odobren: number){
    this.adminService.odbijen(z.korisnicko_ime, odobren).subscribe(data=>{
      alert(data.message)
      window.location.reload()
    })
  }

}
