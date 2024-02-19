import mongoose from "mongoose";

const ucenikSchema = new mongoose.Schema(
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
        tip_skole: String,
        trenutni_razred: Number,
        ocene: Array<Number>,
    }, { versionKey: false }
)

export default mongoose.model('UcenikModel', ucenikSchema, 'ucenici')