"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ucenikSchema = new mongoose_1.default.Schema({
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
    ocene: (Array),
}, { versionKey: false });
exports.default = mongoose_1.default.model('UcenikModel', ucenikSchema, 'ucenici');
