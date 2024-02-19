import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Ucenik } from 'src/app/models/ucenik';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-student-info',
  templateUrl: './admin-student-info.component.html',
  styleUrls: ['./admin-student-info.component.css']
})
export class AdminStudentInfoComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {

    let uc = localStorage.getItem("ucenik")
    if(uc != null){
      this.ucenik = JSON.parse(uc)
    }
    
    this.adminService.dohvatiProfilnuSliku(this.ucenik.profilna_slika).subscribe((slika: Blob)=>{
        
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

  ucenik: Ucenik = new Ucenik()

  profilna_slika: any

}
