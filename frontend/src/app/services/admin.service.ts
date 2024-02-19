import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { Nastavnik } from '../models/nastavnik';
import { Predmet } from '../models/predmet';
import { Cas } from '../models/cas';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  backendUrl: string = "http://localhost:4000"

  dohvatiNastavnikePredmete(){
    return this.http.get<any>(`${this.backendUrl}/admin/dohvatiNastavnikePredmete`)
  }

  dohvatiSveUcenike(){
    return this.http.get<any>(`${this.backendUrl}/admin/dohvatiSveUcenike`)
  }

  dohvatiSveNastavnike(){
    return this.http.get<any>(`${this.backendUrl}/admin/dohvatiSveNastavnike`)
  }

  deaktiviraj(n: string){
    let params = new HttpParams()
    params = params.append("korisnicko_ime", n)
    return this.http.get<Message>(`${this.backendUrl}/admin/deaktiviraj`, {params: params})
  }

  promeniIme(k: string, i: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("ime", i);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/promeniIme`, {params: params})
  }

  promeniPrezime(k: string, p: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("prezime", p);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/promeniPrezime`, {params: params})
  }

  promeniAdresu(k: string, a: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("adresa", a);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/promeniAdresu`, {params: params})
  }

  promeniEmail(k: string, e: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("email", e);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/promeniEmail`, {params: params})
  }

  promeniKontaktTelefon(k: string, t: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("kontakt_telefon", t);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/promeniKontaktTelefon`, {params: params})
  }

  dodajPredmet(k: string, p: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("predmet", p);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/dodajPredmet`, {params: params})
  }

  obrisiPredmet(k: string, p: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("predmet", p);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/obrisiPredmet`, {params: params})
  }

  dodajUzrast(k: string, u: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("uzrast", u);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/dodajUzrast`, {params: params})
  }

  obrisiUzrast(k: string, u: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("uzrast", u);
    return this.http.get<Message>(`${this.backendUrl}/nastavnik/obrisiUzrast`, {params: params})
  }

  promeniProfilnuSliku(p:File, k: string){
    let body = new FormData();
    let slikaNaziv = k + "-" + p.name;
    body.append('profilna_slika', p, slikaNaziv)
    body.append('korisnickoIme', k)
    return this.http.post<Message>(`${this.backendUrl}/nastavnik/promeniProfilnuSliku`, body)
  }

  dohvatiProfilnuSliku(profilna_slika: string): Observable<Blob>{

    let params = new HttpParams();
    params = params.append("profilna_slika", profilna_slika);

    let headers = new HttpHeaders({
      'Content-Type': 'image/jpg, image/png',
      'Accept': 'image/jpg, image/png'
    })
    return this.http.get(`${this.backendUrl}/nastavnik/dohvatiProfilnuSliku`,{
      responseType: 'blob',
      headers: headers,
      params: params
    })

  }

  dohvatiProfil(n: string){
    let params = new HttpParams();
    params = params.append("korisnickoIme", n);
    return this.http.get<Nastavnik>(`${this.backendUrl}/nastavnik/dohvatiProfil`, {params:params})
  }

  zahtevi(){
    return this.http.get<Nastavnik[]>(`${this.backendUrl}/admin/zahtevi`)
  }

  odobren(z: string, o: number){
    let params = new HttpParams()
    params = params.append("korisnicko_ime", z)
    params = params.append("odobren", o)
    return this.http.get<Message>(`${this.backendUrl}/admin/odobren`, {params: params})
  }

  dohvatiSvePredmete(){
    return this.http.get<Predmet[]>(`${this.backendUrl}/admin/dohvatiSvePredmete`)
  }

  unesiPredmet(p: string){
    let params = new HttpParams()
    params = params.append("naziv", p)
    return this.http.get<Message>(`${this.backendUrl}/admin/unesiPredmet`, {params: params})
  }

  dohvatiCasoveProslaGodina(){
    return this.http.get<Cas[]>(`${this.backendUrl}/admin/dohvatiCasoveProslaGodina`)
  }

  dohvatiCV(cv: string): Observable<Blob>{
    let params = new HttpParams()
    params = params.append("cv", cv)
    return this.http.get(`${this.backendUrl}/admin/dohvatiCV`, {responseType: 'blob', params: params})
  }

  odbijen(z: string, o: number){
    let params = new HttpParams()
    params = params.append("korisnicko_ime", z)
    params = params.append("odobren", o)
    return this.http.get<Message>(`${this.backendUrl}/admin/odbijen`, {params: params})
  }

}
