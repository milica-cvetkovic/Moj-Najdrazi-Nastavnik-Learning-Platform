export class Nastavnik{
    korisnicko_ime: string = "";
    lozinka: string = "";
    bezbedonosno_pitanje: string = "";
    odgovor: string = "";
    ime: string = "";
    prezime: string = "";
    pol: string = "";
    adresa: string = "";
    kontakt_telefon: string = "";
    email: string = "";
    profilna_slika: string = "";
    predmeti: Array<string> = [];
    uzrast: Array<string> = [];
    sajt: string = "";
    cv: string = "";
    ocene: Array<number> = [];
    zvezdice: number = 0;
    odobren: number = 0;
    deaktiviran: number = 0;
}