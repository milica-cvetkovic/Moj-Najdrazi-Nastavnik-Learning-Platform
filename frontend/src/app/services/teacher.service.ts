import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Ucenik } from '../models/ucenik';
import { Nastavnik } from '../models/nastavnik';
import { Cas } from '../models/cas';
import { RadnoVreme } from '../models/radnovreme';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  backendUrl: string = "http://localhost:4000"

  dohvatiProfil(n: string){
    let params = new HttpParams();
    params = params.append("korisnickoIme", n);
    return this.http.get<Nastavnik>(`${this.backendUrl}/nastavnik/dohvatiProfil`, {params:params})
  }

  dohvatiProfilnuSliku( profilna_slika: string): Observable<Blob>{
    let params = new HttpParams();
    params = params.append("profilna_slika", profilna_slika);
    return this.http.get(`${this.backendUrl}/nastavnik/dohvatiProfilnuSliku`, {params: params, responseType: 'blob'})
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

  dohvatiCasove(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n);
    return this.http.get<Cas[]>(`${this.backendUrl}/nastavnik/dohvatiCasove`, {params: params})
  }

  otkaziCas(cas: Cas){
    let params = new HttpParams();
    params = params.append("id", cas._id)
    return this.http.post<Message>(`${this.backendUrl}/nastavnik/otkaziCas`, cas, {params: params}) 
  }

  dohvatiZahteve(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n);
    return this.http.get<Cas[]>(`${this.backendUrl}/nastavnik/dohvatiZahteve`, {params: params})
  }

  potvrdiCas(id: string, cas: Cas){
    let params = new HttpParams();
    params = params.append("id", id)
    return this.http.post<Message>(`${this.backendUrl}/nastavnik/potvrdiCas`, cas, {params: params}) 
  }

  promenaRadno(r: RadnoVreme, k: string){
    let params = new HttpParams()
    params = params.append("korisnicko_ime", k)
    return this.http.post<Message>(`${this.backendUrl}/nastavnik/promeniRadno`, r, {params: params})
  }

  promenaNeradno(r: RadnoVreme, k: string){
    let params = new HttpParams()
    params = params.append("korisnicko_ime", k)
    return this.http.post<Message>(`${this.backendUrl}/nastavnik/promeniNeradno`, r, {params: params})
  }

  dohvatiSveCasove(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n);
    return this.http.get<Cas[]>(`${this.backendUrl}/nastavnik/dohvatiSveCasove`, {params: params})
  }

  oceniUcenika(cas: Cas){
    let params = new HttpParams();
    params = params.append("id", cas._id)
    return this.http.post<Message>(`${this.backendUrl}/nastavnik/oceniUcenika`, cas, {params: params}) 
  }

  promeniProfilnuSliku(p:File, k: string){
    let body = new FormData();
    let slikaNaziv = k + "-" + p.name;
    body.append('profilna_slika', p, slikaNaziv)
    body.append('korisnickoIme', k)
    return this.http.post<Message>(`${this.backendUrl}/nastavnik/promeniProfilnuSliku`, body)
  }

  dohvatiRadnoVreme(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n)
    return this.http.get<RadnoVreme[]>(`${this.backendUrl}/ucenik/dohvatiRadnoVreme`, {params: params})

  }

  dohvatiCasoveNedelja(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n);
    return this.http.get<Cas[]>(`${this.backendUrl}/nastavnik/dohvatiCasoveNedelja`, {params: params})
  }

}
