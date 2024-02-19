import { Nastavnik } from "./nastavnik";
import { Ucenik } from "./ucenik";

export class Cas{
    _id: string = "";
    nastavnik: string = "";
    ucenik: string = "";
    predmet: string = "";
    datum: Date = new Date();
    opis: string = "";
    dupli_cas: number = 0;
    status: string = ""; // Z - zakazan, P - potvrdjen, O - otkazan
    komentarUcenik: string = "";
    ocenaUcenik: number = 0;
    obrazlozenje: string = "";
    nastavnikKombinovano: Nastavnik = new Nastavnik()
    ucenikKombinovano: Array<Ucenik> = [];
    komentarNastavnik: string = "";
    ocenaNastavnik: number = 0;
    obavesti: number = 0;
}