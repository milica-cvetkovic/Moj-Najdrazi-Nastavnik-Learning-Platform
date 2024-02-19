import { Component, OnInit } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import { Nastavnik } from 'src/app/models/nastavnik';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Cas } from 'src/app/models/cas';


@Component({
  selector: 'app-drugo-zakazivanje',
  templateUrl: './drugo-zakazivanje.component.html',
  styleUrls: ['./drugo-zakazivanje.component.css']
})
export class DrugoZakazivanjeComponent implements OnInit {

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit(): void {

    let uc = localStorage.getItem("logged")
    if (uc != null) {
      this.ucenik = uc
    }

    let na = localStorage.getItem("nastavnikInfo")
    if (na != null) {
      this.nastavnik = JSON.parse(na)
    }


    if (this.nastavnik.predmeti.length == 1) {
      this.disabledPredmet = 1
    }

    this.kalendar = {
      plugins: [interactionPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      dateClick: this.odabranDatum.bind(this),
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      slotMinTime: '10:00:00',
      slotMaxTime: '18:00:00',
      slotDuration: '00:30:00'
    }

    this.studentService.dohvatiCasoveNastavnika(this.nastavnik.korisnicko_ime).subscribe(data => {
      this.casoviNastavnika = data

      for (let i = 0; i < this.casoviNastavnika.length; i++) {

        let cas = this.casoviNastavnika.at(i)
        if (cas != undefined) {
          let datumEnd = cas.datum

          datumEnd = new Date(cas.datum)

          if (cas.dupli_cas == 1) {
            datumEnd.setMinutes(datumEnd.getMinutes() + 120)
          }
          else {
            datumEnd.setMinutes(datumEnd.getMinutes() + 60)
          }

          this.casovi.push({
            title: this.proveraStatus(cas.status),
            start: new Date(cas.datum).toISOString(),
            end: datumEnd.toISOString(),
            backgroundColor: this.bojaCasa(cas.status)
          })
        }


      }

      this.studentService.dohvatiRadnoVreme(this.nastavnik.korisnicko_ime).subscribe(data1 => {

        for (let i = 0; i < data1.length; i++) {

          let radan = data1.at(i)

          if (radan != undefined) {
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
  
              this.casovi.push({
                title: "Neradno vreme",
                start: datumOdStart.toISOString(),
                end: datumOd.toISOString(),
                backgroundColor: "red"
              })
  
              let datumDoStart = new Date(datumDo)
              datumDoStart.setHours(23)
              datumDoStart.setMinutes(59)
              datumDoStart.setSeconds(59)
  
              this.casovi.push({
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
  
              this.casovi.push({
                title: "Neradno vreme",
                start: dtmStart.toISOString(),
                end: dtmEnd.toISOString(),
                backgroundColor: "red"
              })
  
            }
          }
          

        }

        this.kalendar = {
          plugins: [interactionPlugin, timeGridPlugin],
          initialView: 'timeGridWeek',
          dateClick: this.odabranDatum.bind(this),
          headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
          },
          events: this.casovi,
          slotMinTime: '10:00:00',
          slotMaxTime: '18:00:00',
          slotDuration: '00:30:00'
        }

      })

    })

  }

  kalendar: CalendarOptions = {};

  nastavnik: Nastavnik = new Nastavnik()
  ucenik: string = ""

  datetime: Date = new Date()

  disabledPredmet: number = 0
  predmet: string = ""
  opis: string = ""

  casoviNastavnika: Cas[] = []
  casovi: any[] = [];

  odabranDatum(event: any) {
    this.datetime = new Date(event.dateStr)
  }

  bojaCasa(b: string) {
    if (b == "Z") {
      return "yellow";
    }
    else if (b == "P") {
      return "green";
    }
    else {
      return "red";
    }
  }

  proveraStatus(status: string) {
    if (status == "P") {
      return "Zakazan"
    }
    else if (status == "Z") {
      return "Na čekanju"
    }
    else {
      return "Otkazan"
    }
  }

  zakazi() {

    if (this.predmet == "") {
      alert("Mora biti unet predmet")
      return
    }
    if (this.datetime == null) {
      alert("Mora biti izabran datum")
      return
    }

    let nastavak = confirm("Izabran datum " + this.datetime)

    if (nastavak == true) {
      this.studentService.zakazi(this.nastavnik.korisnicko_ime, this.ucenik, this.predmet, this.datetime, this.opis, 0).subscribe(data => {
        if (data != null) {
          alert(data.message)
          window.location.reload()
        }
      })
    }

  }

}
