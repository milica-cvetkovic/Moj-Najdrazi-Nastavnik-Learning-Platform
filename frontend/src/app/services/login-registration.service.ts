import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BezbedonosnoPitanje } from '../models/bezbedonosno_pitanje';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
import { Message } from '../models/message';
import { Nastavnik } from '../models/nastavnik';
import { Predmet } from '../models/predmet';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistrationService {

  constructor(private http: HttpClient) { }

  backendUrl: string = "http://localhost:4000"

  bezbedonosnaPitanja(){
    return this.http.get<BezbedonosnoPitanje[]>(`${this.backendUrl}/loginRegistration/bezbedonosnaPitanja`)
  }

  login(k: string, l:string){
    let params = new HttpParams();
    params = params.append("korisnickoIme", k);
    params = params.append("lozinka", l);
    return this.http.get<Korisnik>(`${this.backendUrl}/loginRegistration/login`, {params: params})
  }

  registerUcenik(u: Ucenik){
    return this.http.post<Message>(`${this.backendUrl}/loginRegistration/registerUcenik`, u)
  }

  registerProfilnaSlika(p:File, k: string){
    let body = new FormData();
    let slikaNaziv = k + "-" + p.name;
    body.append('profilna_slika', p, slikaNaziv)
    body.append('korisnickoIme', k)
    return this.http.post<Message>(`${this.backendUrl}/loginRegistration/registerProfilnaSlika`, body)
  }

  registerNastavnik(n: Nastavnik, p: string){
    let params = new HttpParams();
    params = params.append("novi", p);
    return this.http.post<Message>(`${this.backendUrl}/loginRegistration/registerNastavnik`, n, {params: params})
  }

  dohvatiBrojUcenika(){
    return this.http.get<number>(`${this.backendUrl}/loginRegistration/dohvatiBrojUcenika`)
  }

  dohvatiBrojNastavnika(){
    return this.http.get<number>(`${this.backendUrl}/loginRegistration/dohvatiBrojNastavnika`)
  }

  dohvatiSedam(){
    return this.http.get<number>(`${this.backendUrl}/loginRegistration/dohvatiSedam`)
  }

  dohvatiMesec(){
    return this.http.get<number>(`${this.backendUrl}/loginRegistration/dohvatiMesec`)
  }

  dohvatiNastavnike(){
    return this.http.get<Nastavnik[]>(`${this.backendUrl}/loginRegistration/dohvatiNastavnike`)
  }

  dohvatiPredmete(){
    return this.http.get<Predmet[]>(`${this.backendUrl}/loginRegistration/dohvatiPredmete`)
  }

  registerCV(c:File, k: string){
    let body = new FormData();
    let cvNaziv = k + "-" + c.name;
    body.append('cv', c, cvNaziv)
    body.append('korisnickoIme', k)
    return this.http.post<Message>(`${this.backendUrl}/loginRegistration/registerCV`, body)
  }

  promeniLozinku(k: string, s: string, n: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("staralozinka", s);
    params = params.append("novalozinka", n);
    return this.http.get<Message>(`${this.backendUrl}/loginRegistration/promeniLozinku`, {params: params})
  }

  loginAdmin(k: string, l:string){
    let params = new HttpParams();
    params = params.append("korisnickoIme", k);
    params = params.append("lozinka", l);
    return this.http.get<Message>(`${this.backendUrl}/loginRegistration/loginAdmin`, {params: params})
  }

  dohvatiBezbedonosnoPitanje(k: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    return this.http.get<BezbedonosnoPitanje>(`${this.backendUrl}/loginRegistration/dohvatiBezbedonosnoPitanje`, {params: params})
  }

  proveriOdgovor(k: string, p: string, o: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("pitanje", p)
    params = params.append("odgovor", o)
    return this.http.get<Message>(`${this.backendUrl}/loginRegistration/proveriOdgovor`, {params: params})
  }

  zaboravljenaLozinka(k: string, n: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("lozinka", n);
    return this.http.get<Message>(`${this.backendUrl}/loginRegistration/zaboravljenaLozinka`, {params: params})
  }

  registerProfilnaSlikaDefault(){
    return this.http.get<Message>(`${this.backendUrl}/loginRegistration/registerProfilnaSlikaDefault`)
  }

  promeniLozinkuAdmin(k: string, s: string, n: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("staralozinka", s);
    params = params.append("novalozinka", n);
    return this.http.get<Message>(`${this.backendUrl}/loginRegistration/promeniLozinkuAdmin`, {params: params})
  }


}
