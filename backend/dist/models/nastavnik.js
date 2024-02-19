"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nastavnikSchema = new mongoose_1.default.Schema({
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
    predmeti: (Array),
    uzrast: (Array),
    sajt: String,
    cv: String,
    odobren: Number,
    ocene: (Array),
    deaktiviran: Number,
}, { versionKey: false });
exports.default = mongoose_1.default.model('NastavnikModel', nastavnikSchema, 'nastavnici');
