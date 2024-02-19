import mongoose from "mongoose";

const nastavnikSchema = new mongoose.Schema(
    {
        korisnicko_ime: String,
        lozinka: String,
        bezbedonosno_pitanje: String,
        odgovor: String,
        ime: String,
        prezime: String,
        pol: String,
        adresa: String,
        kontakt_telefon: String,
        email: String,
        profilna_slika: String,
        predmeti: Array<String>,
        uzrast: Array<String>,
        sajt: String,
        cv: String,
        odobren: Number,
        ocene: Array<String>,
        deaktiviran: Number,
    }, { versionKey: false }
)

export default mongoose.model('NastavnikModel', nastavnikSchema, 'nastavnici')