import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { Cas } from 'src/app/models/cas';
import { TeacherService } from 'src/app/services/teacher.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import { Ucenik } from 'src/app/models/ucenik';
import { Time } from '@angular/common';
import { RadnoVreme } from 'src/app/models/radnovreme';
import { OtkazivanjeComponent } from '../otkazivanje/otkazivanje.component';


@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css']
})
export class TeacherClassesComponent implements OnInit {

  constructor(private router: Router, private teacherService: TeacherService, public dialog: MatDialog) { }

  ngOnInit(): void {

    let na = localStorage.getItem("logged")
    if(na != null){
      this.nastavnik = na
    }


    this.teacherService.dohvatiZahteve(this.nastavnik).subscribe(data => {
      this.zahtevi = data
    })

    this.kalendar = {
      plugins: [interactionPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      eventClick: this.odabranDatum.bind(this),
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      slotMinTime: '08:00:00',
      slotDuration: '00:15:00'
    }


    this.teacherService.dohvatiCasove(this.nastavnik).subscribe(data => {
      this.casovi = data

      let sort = localStorage.getItem("prvih")

      if (sort == "5") {
        this.casovi = this.casovi.slice(0, 5)
      }
      else if (sort == "10") {
        this.casovi = this.casovi.splice(0, 10)
      }



      // *******************************

      this.teacherService.dohvatiRadnoVreme(this.nastavnik).subscribe(data1 => {

        for (let i = 0; i < data1.length; i++) {

          let radan = data1.at(i)
          if(radan != undefined){
            if (radan.neradan == 0) {

              let dtmStart = new Date(radan.datum)
  
              let godina = dtmStart.getFullYear()
              let mesec = dtmStart.getMonth()
              let dan = dtmStart.getDate()
  
              let satiStart = parseInt(radan.vremeOd.substring(0, 2))
              let minutiStart = parseInt(radan.vremeOd.substring(3, 5))
  
              let satiEnd = parseInt(radan.vremeDo.substring(0, 2))
              let minutiEnd = parseInt(radan.vremeDo.substring(3, 5))
  
              let datumOd = new Date(godina, mesec, dan)
              datumOd.setHours(satiStart)
              datumOd.setMinutes(minutiStart)
  
              let datumDo = new Date(godina, mesec, dan)
              datumDo.setHours(satiEnd)
              datumDo.setMinutes(minutiEnd)
  
              let datumOdStart = new Date(datumOd)
              datumOdStart.setHours(0)
              datumOdStart.setMinutes(0)
              datumOdStart.setSeconds(0)
  
              this.casoviKalendar.push({
                title: "Neradno vreme",
                start: datumOdStart.toISOString(),
                end: datumOd.toISOString(),
                backgroundColor: "red"
              })
  
              let datumDoStart = new Date(datumDo)
              datumDoStart.setHours(23)
              datumDoStart.setMinutes(59)
              datumDoStart.setSeconds(59)
  
              this.casoviKalendar.push({
                title: "Neradno vreme",
                start: datumDo.toISOString(),
                end: datumDoStart.toISOString(),
                backgroundColor: "red"
              })
  
  
            } else {
              let dtmStart = new Date(radan.datum)
              dtmStart.setHours(10)
              let dtmEnd = new Date(dtmStart)
              dtmEnd.setHours(18)
  
              this.casoviKalendar.push({
                title: "Neradno vreme",
                start: dtmStart.toISOString(),
                end: dtmEnd.toISOString(),
                backgroundColor: "red"
              })
  
            }
          }

        }

        this.teacherService.dohvatiCasoveNedelja(this.nastavnik).subscribe(csv => {

          this.casoviNedelja = csv
      
          for (let i = 0; i < this.casoviNedelja.length; i++) {

            let casNedelja = this.casoviNedelja.at(i)
            if(casNedelja != undefined){
              let datumEnd = casNedelja.datum

              datumEnd = new Date(casNedelja.datum)
  
              if (casNedelja.dupli_cas == 1) {
                datumEnd.setMinutes(datumEnd.getMinutes() + 120)
              }
              else {
                datumEnd.setMinutes(datumEnd.getMinutes() + 60)
              }
  
              if (casNedelja.status == "P") {
                this.casoviKalendar.push({
                  id: casNedelja._id,
                  title: "Potvrđen čas",
                  start: new Date(casNedelja.datum).toISOString(),
                  end: datumEnd.toISOString(),
                  backgroundColor: "green"
                })
              }
              else if (casNedelja.status == "Z") {
                
                this.casoviKalendar.push({
                  id: casNedelja._id,
                  title: "Zakazan čas",
                  start: new Date(casNedelja.datum).toISOString(),
                  end: datumEnd.toISOString(),
                  backgroundColor: "yellow"
                })
              }
            }

          }


          this.kalendar = {
            plugins: [interactionPlugin, timeGridPlugin],
            initialView: 'timeGridWeek',
            dateClick: this.odabranDatum2.bind(this),
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            },
            events: this.casoviKalendar,
            slotMinTime: '10:00:00',
            slotMaxTime: '18:00:00',
            slotDuration: '00:30:00'
          }

        })



      })

    })

    let pr = localStorage.getItem("prikazi")
    if(pr != null){
      this.prikazi = pr
    }

    let pr2 =  localStorage.getItem("prikazi2")
    if(pr2 != null){
      this.prikazi2 = pr2
    }
    

    let ot = localStorage.getItem("otkazi")
    if(ot != undefined){
      this.otkazi = JSON.parse(ot)
      let uc = this.otkazi.ucenikKombinovano.at(0)
      if(uc != undefined){
        this.otkaziIme = uc.ime
        this.otkaziPrezime = uc.prezime
      }

    }

    localStorage.removeItem("prikazi")
    localStorage.removeItem("prikazi2")
    localStorage.removeItem("otkazi")

    this.otkaziDatum = new Date(this.otkazi.datum)
  }

  index: number = 0
  kolone: string[] = ['rb', 'predmet', 'ucenik', 'pridruzi']
  kolone1: string[] = ['rb', 'ucenik', 'predmet', 'opis', 'ucenikocene', 'zahtev']


  nastavnik: string = ""
  casoviKalendar: any[] = []

  casovi: Cas[] = []
  zahtevi: Cas[] = []
  casoviNedelja: Cas[] = []

  kalendar: CalendarOptions = {};

  datum: Date = new Date()

  obrazlozenje: string = "";
  obrazlozenje2: string = "";

  datumRadno: Date | null | undefined;
  vremeOdRadno: string = "";
  vremeDoRadno: string = "";

  datumNeradno: Date | null | undefined;

  prikazi: string = "0";
  prikazi2: string = "0";

  otkazi: Cas = new Cas()
  otkaziDatum: Date = new Date()
  otkaziIme: string = ""
  otkaziPrezime: string = ""

  odabranDatum(event: { event: { id: string; }; }) {

    let cas: Cas = new Cas();
    for (let i = 0; i < this.casoviNedelja.length; i++) {
      
      let casNedelja = this.casoviNedelja.at(i)
      if(casNedelja != undefined){
        if (casNedelja._id == event.event.id) {
          cas = casNedelja
          break;
        }
      }

    }

    let danas = new Date()
    let datum = new Date(cas.datum)

    let razlika = datum.getTime() - danas.getTime()
    razlika = razlika / (60 * 60 * 1000)
    if (razlika <= 4) {
      alert("Čas je moguće otkazati do 4 sata pre početka")
      return
    }

    localStorage.setItem("prikazi", "1")
    localStorage.setItem("otkazi", JSON.stringify(cas))
    window.location.reload()

    /*
    const dialogRef = this.dialog.open(OtkazivanjeComponent, {
      data: {obrazlozenje: this.obrazlozenje},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.obrazlozenje = data
        alert(this.obrazlozenje)
        this.teacherService.otkaziCas(cas).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
    */
  }

  odabranDatum2(arg: DateClickArg) {

    let cas: Cas = new Cas();
    for (let i = 0; i < this.casoviNedelja.length; i++) {
      
      let casNedelja = this.casoviNedelja.at(i)
      if(casNedelja != undefined){
        if (casNedelja._id == arg.dayEl.id) {
          cas = casNedelja
          break;
        }
      }

    }

    let danas = new Date()
    let datum = new Date(cas.datum)

    let razlika = datum.getTime() - danas.getTime()
    razlika = razlika / (60 * 60 * 1000)
    if (razlika <= 4) {
      alert("Čas je moguće otkazati do 4 sata pre početka")
      return
    }

    localStorage.setItem("prikazi", "1")
    localStorage.setItem("otkazi", JSON.stringify(cas))
    window.location.reload()

    /*
    const dialogRef = this.dialog.open(OtkazivanjeComponent, {
      data: {obrazlozenje: this.obrazlozenje},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.obrazlozenje = data
        alert(this.obrazlozenje)
        this.teacherService.otkaziCas(cas).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload()
          }
        })
      }
    })
    */
  }

  prosecnaOcena(u: number[]) {

    let suma = 0;
    let broj = 0;
    u.forEach(function (ocena) {
      suma += ocena;
      broj++;
    })

    let result = Math.floor(suma / broj)

    return result;

  }

  potvrdi(cas: Cas) {
    this.teacherService.potvrdiCas(cas._id, cas).subscribe(data => {
      if (data != undefined) {
        alert(data.message)
        window.location.reload()
      }
    })
  }

  odbij2(cas: Cas){
    let danas = new Date()
    let datum = new Date(cas.datum)

    let razlika = datum.getTime() - danas.getTime()
    razlika = razlika / (60 * 60 * 1000)
    if (razlika <= 4) {
      alert("Čas je moguće otkazati do 4 sata pre početka")
      return
    }

    localStorage.setItem("prikazi2", "1")
    localStorage.setItem("otkazi", JSON.stringify(cas))
    window.location.reload()
  }

  odbij() {
    localStorage.setItem("prikazi", "")
    localStorage.setItem("prikazi2", "")

    this.otkazi.status = "O"
    this.otkazi.obrazlozenje = this.obrazlozenje2

    this.teacherService.otkaziCas(this.otkazi).subscribe(res => {
      if (res != null) {
        alert(res.message)
        window.location.reload()
      }
    })

    /*
    const dialogRef = this.dialog.open(OtkazivanjeComponent, {
      data: {obrazlozenje: this.obrazlozenje},
    });

    dialogRef.afterClosed().subscribe(data=> {
      if(data != undefined){
        this.obrazlozenje = data
        alert(this.obrazlozenje)
        this.teacherService.otkaziCas(cas).subscribe(res=>{
          if(res!=null){
            alert(res.message)
            window.location.reload
          }
        })
      }
    })*/
  }

  promenaRadnogVremena() {

    if (this.datumRadno == undefined || this.vremeOdRadno == undefined || this.vremeDoRadno == undefined) {
      alert("Niste uneli sve podatke")
      return
    }

    let d = new Date()

    if (new Date(this.datumRadno) < d) {
      alert("Datum je nevalidan")
      return
    }

    let d1 = new Date("2000-01-01T" + this.vremeOdRadno)
    let d2 = new Date("2000-01-01T" + this.vremeDoRadno)

    if (d1 > d2 || d1 == d2) {
      alert("Vremena nisu odgovarajuća")
      return
    }

    let r = new RadnoVreme()
    r.datum = this.datumRadno
    r.vremeOd = this.vremeOdRadno
    r.vremeDo = this.vremeDoRadno
    r.neradan = 0

    this.teacherService.promenaRadno(r, this.nastavnik).subscribe(data => {
      if (data != undefined) {
        alert(data.message)
        window.location.reload()
      }
    })

  }

  promenaNeradanDan() {

    if (this.datumNeradno == undefined) {
      alert("Niste uneli sve podatke")
      return
    }

    let d = new Date()

    if (new Date(this.datumNeradno) < d) {
      alert("Datum je nevalidan")
      return
    }

    let r = new RadnoVreme()
    r.datum = this.datumNeradno
    r.neradan = 1

    this.teacherService.promenaNeradno(r, this.nastavnik).subscribe(data => {
      if (data != undefined) {
        alert(data.message)
        window.location.reload()
      }
    })

  }

  pridruziSe(cas: Cas) {

    this.router.navigate(["jitsi-meet"])

  }

  prvih5() {
    localStorage.setItem("prvih", "5")
    window.location.reload()
  }

  prvih10() {
    localStorage.setItem("prvih", "10")
    window.location.reload()
  }

  svih() {
    localStorage.setItem("prvih", "")
    window.location.reload()
  }

  proveraPridruzi(cas: Cas) {
    let danas = new Date()
    let datum = new Date(cas.datum)

    let razlika = datum.getTime() - danas.getTime()
    razlika = razlika / (60 * 1000)
    if (razlika <= 15) {
      return true
    }

    return false
  }


}
