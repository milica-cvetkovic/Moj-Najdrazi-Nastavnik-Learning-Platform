import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { Nastavnik } from 'src/app/models/nastavnik';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {

    this.adminService.dohvatiNastavnikePredmete().subscribe(data => {
      this.predmeti = data

      // NASTAVNICI PREDMETI

      for (let i = 0; i < this.predmeti.length; i++) {
        this.predmeti.at(i).predmeti.forEach((predmet: string) => {
          if (this.predmetiMap.has(predmet)) {
            let n = this.predmetiMap.get(predmet)
            if(n != undefined){
              n++;
              this.predmetiMap.set(predmet, n)
            }

          }
          else {
            this.predmetiMap.set(predmet, 1)
          }
        });
      }

      let dataPointsPredmet: any[] = []
      this.predmetiMap.forEach((value, key) => {
        let label = key
        let y = value
        dataPointsPredmet.push({ label: label, y: y })
      })

      this.chartOptionsPredmet = {
        title: {
          text: "Broj nastavnika za svaki predmet"
        },
        animationEnabled: true,
        axisY: {
          includeEnabled: true
        },
        data: [
          {
            type: "column",
            dataPoints: dataPointsPredmet
          }
        ]
      }

      // NASTAVNICI UZRAST

      for (let i = 0; i < this.predmeti.length; i++) {
        this.predmeti.at(i).uzrast.forEach((uzrast: string) => {
          if (this.uzrastiMap.has(uzrast)) {
            let n = this.uzrastiMap.get(uzrast)
            if(n != undefined){
              n++;
              this.uzrastiMap.set(uzrast, n)
            }

          }
          else {
            this.uzrastiMap.set(uzrast, 1)
          }
        });
      }

      let dataPointsUzrast: { label: string; y: number; }[] = []
      this.uzrastiMap.forEach((value, key) => {
        let label = key
        let y = value
        dataPointsUzrast.push({ label: label, y: y })
      })

      this.chartOptionsUzrast = {
        title: {
          text: "Broj nastavnika za svaki uzrast"
        },
        animationEnabled: true,
        axisY: {
          includeEnabled: true
        },
        data: [
          {
            type: "column",
            dataPoints: dataPointsUzrast
          }
        ]
      }

      // NASTAVNICI POL

      let nastavniciZ = 0
      let nastavniciM = 0
      for (let i = 0; i < this.predmeti.length; i++) {
        if (this.predmeti.at(i).pol == "Ž") {
          nastavniciZ++;
        }
        else {
          nastavniciM++;
        }
      }

      let dataPointsNastavnikPol = []
      dataPointsNastavnikPol.push({ y: nastavniciZ, pol: "Ženski" })
      dataPointsNastavnikPol.push({ y: nastavniciM, pol: "Muški" })

      this.chartOptionsNastavnikPol = {
        title: {
          text: "Raspodela nastavnika po polu"
        },
        animationEnabled: true,
        axisY: {
          includeEnabled: true
        },
        data: [
          {
            type: "pie",
            startAngle: -90,
            indexLabel: "{pol}: {y}",
            dataPoints: dataPointsNastavnikPol
          }
        ]
      }

    })


    this.adminService.dohvatiSveUcenike().subscribe(data => {
      this.ucenici = data

      let ucenikZ = 0
      let ucenikM = 0

      for (let i = 0; i < this.ucenici.length; i++) {
        if (this.ucenici.at(i).pol == "Ž") {
          ucenikZ++;
        }
        else {
          ucenikM++;
        }
      }

      let dataPointsUcenikPol = []
      dataPointsUcenikPol.push({ y: ucenikZ, pol: "Ženski" })
      dataPointsUcenikPol.push({ y: ucenikM, pol: "Muški" })

      this.chartOptionsUcenikPol = {
        title: {
          text: "Raspodela učenika po polu"
        },
        animationEnabled: true,
        axisY: {
          includeEnabled: true
        },
        data: [
          {
            type: "pie",
            startAngle: -90,
            indexLabel: "{pol}: {y}",
            dataPoints: dataPointsUcenikPol
          }
        ]
      }

    })

    this.dani.set("PON", 0)
    this.dani.set("UTO", 0)
    this.dani.set("SRE", 0)
    this.dani.set("CET", 0)
    this.dani.set("PET", 0)
    this.dani.set("SUB", 0)
    this.dani.set("NED", 0)

    this.adminService.dohvatiCasoveProslaGodina().subscribe(data => {

      this.casovi2023 = data

      // DANI U NEDELJI

      this.casovi2023.forEach(c => {
        let datum = new Date(c.datum)
        let dan = datum.getDay()
        if (dan == 1) {
          let broj = this.dani.get("PON")
          if(broj != undefined)
          this.dani.set("PON", ++broj)
        }
        else if (dan == 2) {
          let broj = this.dani.get("UTO")
          if(broj != undefined)
          this.dani.set("UTO", ++broj)
        }
        else if (dan == 3) {
          let broj = this.dani.get("SRE")
          if(broj != undefined)
          this.dani.set("SRE", ++broj)
        }
        else if (dan == 4) {
          let broj = this.dani.get("CET")
          if(broj != undefined)
          this.dani.set("CET", ++broj)
        }
        else if (dan == 5) {
          let broj = this.dani.get("PET")
          if(broj != undefined)
          this.dani.set("PET", ++broj)
        }
        else if (dan == 6) {
          let broj = this.dani.get("SUB")
          if(broj != undefined)
          this.dani.set("SUB", ++broj)
        }
        else if (dan == 7) {
          let broj = this.dani.get("NED")
          if(broj != undefined)
          this.dani.set("NED", ++broj)
        }
      })

      let dataPointsDani: { label: string; y: number; }[] = []
      this.dani.forEach((value, key) => {
        dataPointsDani.push({ label: key, y: value })
      });

      this.chartOptionsDaniUNedelji = {
        title: {
          text: 'Prosečan broj održanih časova po danima',
        },
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        axisY: {
          includeZero: true,
        },
        data: [
          {
            type: 'column',
            color: '#01b8aa',
            dataPoints: dataPointsDani
          }
        ]
      }

      // ANGAZOVANOST PO MESECIMA

      let mapAngazovanost = new Map<string, number>()

      this.casovi2023.forEach(c => {
        if ( mapAngazovanost.has(c.nastavnik)) {
          let nst = mapAngazovanost.get(c.nastavnik)
          if(nst != undefined)
          mapAngazovanost.set(c.nastavnik, nst + 1)
        }
        else {
          mapAngazovanost.set(c.nastavnik, 1)
        }
      })

      let sortirani = Array.from(mapAngazovanost.entries()).sort((a, b) => b[1] - a[1])

      this.najangazovaniji = sortirani.slice(0, 10).map(entry => entry[0]);

      let mapa = new Map<string, Map<string, number>>()

      this.najangazovaniji.forEach(n => {
        let map = new Map<string, number>()
        map.set("JAN", 0)
        map.set("FEB", 0)
        map.set("MAR", 0)
        map.set("APR", 0)
        map.set("MAY", 0)
        map.set("JUN", 0)
        map.set("JUL", 0)
        map.set("AUG", 0)
        map.set("SEP", 0)
        map.set("OCT", 0)
        map.set("NOV", 0)
        map.set("DEC", 0)
        mapa.set(n, map)
      })

      this.casovi2023.forEach(c => {
        if (mapa.has(c.nastavnik)) {
          let datum = new Date(c.datum);
          let mesec = datum.getMonth()

          if (mesec == 0) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("JAN")
              if(br != undefined)
              mapa1.set("JAN", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }
            
          }
          else if (mesec == 1) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("FEB")
              if(br != undefined)
              mapa1.set("FEB", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 2) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("MAR")
              if(br != undefined)
              mapa1.set("MAR", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }
            
          }
          else if (mesec == 3) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("APR")
              if(br != undefined)
              mapa1.set("APR", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 4) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("MAY")
              if(br != undefined)
              mapa1.set("MAY", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 5) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("JUN")
              if(br != undefined)
              mapa1.set("JUN", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 6) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("JUL")
              if(br != undefined)
              mapa1.set("JUL", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 7) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("AUG")
              if(br != undefined)
              mapa1.set("AUG", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 8) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("SEP")
              if (br != undefined)
              mapa1.set("SEP", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 9) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("OCT")
              if(br != undefined)
              mapa1.set("OCT", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 10) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("NOV")
              if(br != undefined)
              mapa1.set("NOV", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }
          else if (mesec == 11) {
            let mapa1 = mapa.get(c.nastavnik)
            if(mapa1 != undefined){
              let br = mapa1.get("DEC")
              if(br != undefined)
              mapa1.set("DEC", br + 1)
              mapa.set(c.nastavnik, mapa1)
            }

          }

        }
      })

      let dataAngazovani: { type: string; name: string; showInLegend: boolean; dataPoints: any[]; }[] = []

      mapa.forEach((value, key) => {
        let dataPointsAngazovani: { label: string; y: number; }[] = []
        value.forEach((value1, key1) => {
          dataPointsAngazovani.push({ label: key1, y: value1 })
        })
        let obj = {
          type: "line",
          name: key,
          showInLegend: true,
          dataPoints: dataPointsAngazovani
        }
        dataAngazovani.push(obj)
      })

      this.chartOptionsAngazovani = {
        theme: "light2",
        animationEnabled: true,
        title: {
          text: "Broj održanih časova 10 najangažovanijih nastavnika"
        },
        axisY: {
          title: "Broj časova",
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: function (e: any) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        data: dataAngazovani
      }

      // *** DODATNO *** OTKAZANI U 2023

      let map = new Map<string, number>()
      map.set("JAN", 0)
      map.set("FEB", 0)
      map.set("MAR", 0)
      map.set("APR", 0)
      map.set("MAY", 0)
      map.set("JUN", 0)
      map.set("JUL", 0)
      map.set("AUG", 0)
      map.set("SEP", 0)
      map.set("OCT", 0)
      map.set("NOV", 0)
      map.set("DEC", 0)

      this.casovi2023.forEach(c => {

        if(c.status == "O"){
          let datum = new Date(c.datum);
        let mesec = datum.getMonth()

        if (mesec == 0) {
          let br = map.get("JAN")
          if(br != undefined)
            map.set("JAN", br + 1)
        }
        else if (mesec == 1) {
          let br = map.get("FEB")
          if(br != undefined)
            map.set("FEB", br + 1)
        }
        else if (mesec == 2) {
          let br = map.get("MAR")
          if(br != undefined)
            map.set("MAR", br + 1)
        }
        else if (mesec == 3) {
          let br = map.get("APR")
          if(br != undefined)
            map.set("APR", br + 1)
        }
        else if (mesec == 4) {
          let br = map.get("MAY")
          if(br != undefined)
            map.set("MAY", br + 1)
        }
        else if (mesec == 5) {
          let br = map.get("JUN")
          if(br != undefined)
            map.set("JUN", br + 1)
        }
        else if (mesec == 6) {
          let br = map.get("JUL")
          if(br != undefined)
            map.set("JUL", br + 1)
        }
        else if (mesec == 7) {
          let br = map.get("AUG")
          if(br != undefined)
            map.set("AUG", br + 1)
        }
        else if (mesec == 8) {
          let br = map.get("SEP")
          if(br != undefined)
            map.set("SEP", br + 1)
        }
        else if (mesec == 9) {
          let br = map.get("OCT")
          if(br != undefined)
            map.set("OCT", br + 1)
        }
        else if (mesec == 10) {
          let br = map.get("NOV")
          if(br != undefined)
            map.set("NOV", br + 1)
        }
        else if (mesec == 10) {
          let br = map.get("DEC")
          if(br != undefined)
            map.set("DEC", br + 1)
        }
        }

      })

      let dataPointsOtkazani: { x: Date; y: number; }[] = []

      map.forEach((value, key) => {
        let datum;
        if(key == "JAN"){
          datum = new Date(2023, 0 ,1)
        }
        else if(key == "FEB"){
          datum = new Date(2023, 1, 1)
        }
        else if(key == "MAR"){
          datum = new Date(2023, 2, 1)
        }
        else if(key == "APR"){
          datum = new Date(2023, 3, 1)
        }
        else if(key == "MAY"){
          datum = new Date(2023, 4, 1)
        }
        else if(key == "JUN"){
          datum = new Date(2023, 5, 1)
        }
        else if(key == "JUL"){
          datum = new Date(2023, 6, 1)
        }
        else if(key == "AUG"){
          datum = new Date(2023, 7, 1)
        }
        else if(key == "SEP"){
          datum = new Date(2023, 8, 1)
        }
        else if(key == "OCT"){
          datum = new Date(2023, 9, 1)
        }
        else if(key == "NOV"){
          datum = new Date(2023, 10, 1)
        }
        else{
          datum = new Date(2023, 11, 1)
        }
        let obj = { x: datum, y: value }
        dataPointsOtkazani.push(obj)
      })

      this.chartOptionsOtkazaniMesec = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Broj otkazanih časova u 2023. po mesecima"
        },
        data: [{
          type: "stepLine",
          dataPoints: dataPointsOtkazani
        }]
      }

    })

    this.adminService.dohvatiSveNastavnike().subscribe(data=>{
      this.nastavnici = data
      
      let map = new Map<number, number>()
      map.set(1, 0)
      map.set(2, 0)
      map.set(3, 0)
      map.set(4, 0)
      map.set(5, 0)

      this.nastavnici.forEach(n=>{

        if(n.ocene.length > 0){
          let suma = 0;
          let broj = 0;
          n.ocene.forEach(function(ocena){
            suma += ocena;
            broj++;
          })
      
          let result = Math.floor(suma/broj)
          
          let br = map.get(result)
          if(br != undefined){
            map.set(result, br + 1)
          }
          
        }


      })

      let dataPointsOcene: { label: number; y: number; }[] = []

      map.forEach((value, key) => {
        let obj = {label: key, y: value}
        dataPointsOcene.push(obj)

      })

      this.chartOptionsProsecnaNastavnik = {
        animationEnabled: true,
        theme: "light2",
        exportEnabled: true,
        title: {
          text: "Prosečna ocena nastavnika"
        },
        data: [{
          type: "pie", 
          dataPoints: dataPointsOcene
        }]
      }

    })

  }

  /* 
      title: {
      text: "Broj nastavnika za svaki predmet i za svaki od uzrasta"
    },
    animationEnabled: true,
    axisY: {
      includeEnabled: true
    },
    data: [
      {
        type: "column",
        dataPoints: [{}]
      }
    ]
  */

  chartOptionsPredmet = {

  }

  /*
      title: {
      text: "Broj nastavnika za svaki od uzrasta"
    },
    animationEnabled: true,
    axisY: {
      includeEnabled: true
    },
    data: [
      {
        type: "column",
        dataPoints: []
      }
    ]
  */

  chartOptionsUzrast = {

  }

  /*
      title: {
      text: "Raspodela nastavnika po polu"
    },
    animationEnabled: true,
    axisY: {
      includeEnabled: true
    },
    data: [
      {
        type: "pie",
        startAngle: -90,
        indexLabel: "{pol}: {y}",
        dataPoints: []
      }
    ]
  */

  chartOptionsNastavnikPol = {

  }

  /*
      title: {
      text: "Raspodela učenika po polu"
    },
    animationEnabled: true,
    axisY: {
      includeEnabled: true
    },
    data: [
      {
        type: "pie",
        startAngle: -90,
        indexLabel: "{pol}: {y}",
        dataPoints: []
      }
    ]
  */

  chartOptionsUcenikPol = {

  }

  /*
      title: {
      text: 'Prosečan broj održanih časova po danima',
    },
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column',
        color: '#01b8aa',
        dataPoints: []
      }
    ]
  */

  chartOptionsDaniUNedelji = {

  }

  /*
  theme: "light2",
    animationEnabled: true,
    title: {
      text: "Broj održanih časova 10 najangažovanijih nastavnika"
    },
    axisY: {
      title: "Broj časova",
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: []
  */

  chartOptionsAngazovani = {
    

  }

  /*
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Broj otkazanih časova u 2023. po mesecima"
    },
    data: [{
      type: "stepLine",
      dataPoints: []
    }]
   */

  chartOptionsOtkazaniMesec = {

  }

  /*
  	  animationEnabled: true,
	  theme: "dark2",
	  exportEnabled: true,
	  title: {
		  text: "Prosečna ocena nastavnika"
	  },
	  data: [{
		  type: "pie", 
		  dataPoints: []
	  }]
  */

  chartOptionsProsecnaNastavnik = {

	}


  predmeti: any[] = []
  predmetiMap = new Map<string, number>
  uzrastiMap = new Map<string, number>
  casovi2023: Cas[] = []

  ucenici: any[] = []
  dani: Map<string, number> = new Map()

  najangazovaniji: string[] = []
  angazovani: any[] = []

  nastavnici: Nastavnik[] = []

}
