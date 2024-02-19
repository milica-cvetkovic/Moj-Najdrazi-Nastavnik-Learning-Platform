import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegistrationService } from '../services/login-registration.service';
import { Nastavnik } from '../models/nastavnik';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router, private homeService: LoginRegistrationService) {}
  
  ngOnInit(): void {
    
    this.homeService.dohvatiBrojUcenika().subscribe(data=>{
      this.brojUcenika = data
    })

    this.homeService.dohvatiBrojNastavnika().subscribe(data=>{
      this.brojNastavnika = data
    })

    this.homeService.dohvatiSedam().subscribe(data=>{
      this.brojSedam = data
    })

    this.homeService.dohvatiMesec().subscribe(data=>{
      this.brojMesec = data
    })

    this.homeService.dohvatiNastavnike().subscribe(data=>{
      this.nastavnici = data

      for(let i=0; i<this.nastavnici.length; i++){
        this.nastavnici.at(i)?.predmeti.forEach(predmet => {
          if(this.predmeti.has(predmet)){
            let n = this.predmeti.get(predmet)
            if(n != undefined){
              n.push(this.nastavnici.at(i)?.ime + " " + this.nastavnici.at(i)?.prezime)
              this.predmeti.set(predmet, n)
            }

          }
          else{
            this.predmeti.set(predmet, [this.nastavnici.at(i)?.ime + " " + this.nastavnici.at(i)?.prezime])
          }
        });
      }

      this.predmetiArr = Array.from(this.predmeti.entries()).map(([key, value])=>({key, value}))

      // SORTIRANJE

      let sort = localStorage.getItem("sort")

      if(sort == "1"){
        this.predmetiArr.forEach(predmet=>{
          predmet.value.sort((a: string,b: string) => {
            let aIme = a.split(" ")[0]
            let bIme = b.split(" ")[0]
            if(bIme > aIme) return -1
            if(bIme < aIme) return 1
            return 0
          })
        })
      }
      else if(sort == "2"){
        this.predmetiArr.forEach(predmet=>{
          predmet.value.sort((a: string,b: string) => {
            let aIme = a.split(" ")[0]
            let bIme = b.split(" ")[0]
            if(aIme > bIme) return -1
            if(aIme < bIme) return 1
            return 0
          })
        })
      }
      else if(sort == "3"){
        this.predmetiArr.forEach(predmet=>{
          predmet.value.sort((a: string,b: string) => {
            let aIme = a.split(" ")[1]
            let bIme = b.split(" ")[1]
            if(bIme > aIme) return -1
            if(bIme < aIme) return 1
            return 0
          })
        })
      }
      else if(sort == "4"){
        this.predmetiArr.forEach(predmet=>{
          predmet.value.sort((a: string,b: string) => {
            let aIme = a.split(" ")[1]
            let bIme = b.split(" ")[1]
            if(aIme > bIme) return -1
            if(aIme < bIme) return 1
            return 0
          })
        })
      }
      else if(sort == "5"){
        this.predmetiArr.sort((a,b) => {
          if(b.key > a.key) return -1
          if(b.key < a.key) return 1
          return 0
        })
      }
      else if(sort == "6"){
        this.predmetiArr.sort((a,b) => {
          if(a.key > b.key) return -1
          if(a.key < b.key) return 1
          return 0
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
        
        let predmetiTemp: any[] = []

        this.predmetiArr.forEach(p=>{
          let temp;
          if(pretraga.predmet != "" && pretraga.predmet === p.key){
            
            temp = p;
          }
          if(pretraga.predmet != "" && pretraga.predmet != p.key){
            return
          }

          if(pretraga.ime != "" || pretraga.prezime != ""){

    
            let flag = 0;

            if(temp == undefined){

              temp = p
              flag = 1
            }

            for(let i = 0; i<p.value.length; i++){
              
              let flg = 0
              if(pretraga.ime != ""){
                let ime = p.value.at(i).split(" ")[0]
                if(pretraga.ime.length != 0 && pretraga.ime != ime){
                  let index = temp.value.indexOf(p.value.at(i))
                  if(index != -1){
                    temp.value.splice(index, 1 )
                    flg++
                    if(temp.value.length == 0){
                      break;
                    }
                  }
                }
              }
              
              if(pretraga.prezime != ""){
                let prezime = p.value.at(i).split(" ")[1]
                if(pretraga.prezime.length != 0 && pretraga.prezime != prezime){
                  let index = temp.value.indexOf(p.value.at(i))
                  if(index != -1){
                    temp.value.splice(index, 1 )
                    flg++
                    if(temp.value.length == 0){
                      break;
                    }
                  }
                }
              }
  
              if(flg>0){
                i--
              }

            }
            
            if(flag == 1 && temp.value.length == 0){
              temp = undefined
            }

          }

          if(temp != undefined){
            predmetiTemp.push(temp)
          }
        })

        this.predmetiArr = predmetiTemp;

      }


    })

    

  }

  brojUcenika: number = 0;
  brojNastavnika: number = 0;
  brojSedam: number = 0;
  brojMesec: number = 0;

  index: number = 0
  kolone: string[] = ['rb', 'predmet', 'nastavnici']

  nastavnici: Nastavnik[] = []
  predmeti = new Map<string, Array<string>>
  predmetiArr: any[] = [];

  sortValue: string = ""

  ime: string = ""
  prezime: string = ""
  predmet: string = ""

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

}
