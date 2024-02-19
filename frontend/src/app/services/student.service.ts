import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ucenik } from '../models/ucenik';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Nastavnik } from '../models/nastavnik';
import { Cas } from '../models/cas';
import { RadnoVreme } from '../models/radnovreme';
import { Obavestenje } from '../models/obavestenje';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  backendUrl: string = "http://localhost:4000"

  dohvatiProfil(u: string){
    let params = new HttpParams();
    params = params.append("korisnickoIme", u);
    return this.http.get<Ucenik>(`${this.backendUrl}/ucenik/dohvatiProfil`, {params:params})
  }

  dohvatiProfilnuSliku( profilna_slika: string): Observable<Blob>{

    let params = new HttpParams();
    params = params.append("profilna_slika", profilna_slika);

    let headers = new HttpHeaders({
      'Content-Type': 'image/jpg, image/png',
      'Accept': 'image/jpg, image/png'
    })
    return this.http.get(`${this.backendUrl}/ucenik/dohvatiProfilnuSliku`,{
      responseType: 'blob',
      headers: headers,
      params: params
    })

  }

  promeniIme(k: string, i: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("ime", i);
    return this.http.get<Message>(`${this.backendUrl}/ucenik/promeniIme`, {params: params})
  }

  promeniPrezime(k: string, p: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("prezime", p);
    return this.http.get<Message>(`${this.backendUrl}/ucenik/promeniPrezime`, {params: params})
  }

  promeniAdresu(k: string, a: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("adresa", a);
    return this.http.get<Message>(`${this.backendUrl}/ucenik/promeniAdresu`, {params: params})
  }

  promeniEmail(k: string, e: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("email", e);
    return this.http.get<Message>(`${this.backendUrl}/ucenik/promeniEmail`, {params: params})
  }

  promeniKontaktTelefon(k: string, t: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("kontakt_telefon", t);
    return this.http.get<Message>(`${this.backendUrl}/ucenik/promeniKontaktTelefon`, {params: params})
  }

  promeniTipSkole(k: string, t: string){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("tip_skole", t);
    return this.http.get<Message>(`${this.backendUrl}/ucenik/promeniTipSkole`, {params: params})
  }

  promeniTrenutniRazred(k: string, t: number){
    let params = new HttpParams();
    params = params.append("korisnicko_ime", k);
    params = params.append("trenutni_razred", t);
    return this.http.get<Message>(`${this.backendUrl}/ucenik/promeniTrenutniRazred`, {params: params})
  }

  dohvatiNastavnike(tip: string){
    let params = new HttpParams();
    params = params.append("tip", tip);
    return this.http.get<Nastavnik[]>(`${this.backendUrl}/ucenik/dohvatiNastavnike`, {params: params})
  }

  zakazi(nastavnik: string, ucenik: string, predmet: string, datum: Date,opis: string, dupli_cas: number){
    let body = {
      nastavnik: nastavnik,
      ucenik: ucenik,
      predmet: predmet,
      datum: datum,
      opis: opis,
      dupli_cas: dupli_cas
    }
    return this.http.post<Message>(`${this.backendUrl}/ucenik/zakaziCas`, body)
  }

  dohvatiCasoveNastavnika(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n);
    return this.http.get<Cas[]>(`${this.backendUrl}/ucenik/dohvatiCasoveNastavnika`, {params: params})
  }

  dohvatiArhivuCasovaUcenika(u: string){
    let params = new HttpParams();
    params = params.append("ucenik", u)
    return this.http.get<Cas[]>(`${this.backendUrl}/ucenik/dohvatiArhivuCasovaUcenika`, {params: params}) 
  }

  oceniNastavnika(cas: Cas){
    let params = new HttpParams();
    params = params.append("id", cas._id)
    return this.http.post<Message>(`${this.backendUrl}/ucenik/oceniNastavnika`, cas, {params: params}) 
  }

  dohvatiBuduceCasoveUcenika(u: string){
    let params = new HttpParams();
    params = params.append("ucenik", u)
    return this.http.get<Cas[]>(`${this.backendUrl}/ucenik/dohvatiBuduceCasoveUcenika`, {params: params}) 
  }

  promeniProfilnuSliku(p:File, k: string){
    let body = new FormData();
    let slikaNaziv = k + "-" + p.name;
    body.append('profilna_slika', p, slikaNaziv)
    body.append('korisnickoIme', k)
    return this.http.post<Message>(`${this.backendUrl}/ucenik/promeniProfilnuSliku`, body)
  }

  dohvatiKomentareNastavnika(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n)
    return this.http.get<Cas[]>(`${this.backendUrl}/ucenik/dohvatiKomentareNastavnika`, {params: params})
  }

  dohvatiRadnoVreme(n: string){
    let params = new HttpParams();
    params = params.append("nastavnik", n)
    return this.http.get<RadnoVreme[]>(`${this.backendUrl}/ucenik/dohvatiRadnoVreme`, {params: params})

  }

  dohvatiObavestenja(u: string){
    let params = new HttpParams();
    params = params.append("ucenik", u)
    return this.http.get<Obavestenje[]>(`${this.backendUrl}/ucenik/dohvatiObavestenja`, {params: params})
  }

  oznaciKaoProcitano(cas: Obavestenje){
    let params = new HttpParams();
    params = params.append("id", cas._id)
    return this.http.get<number>(`${this.backendUrl}/ucenik/oznaciKaoProcitano`, {params: params})
  }

}
