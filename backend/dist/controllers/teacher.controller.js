"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const ucenik_1 = __importDefault(require("../models/ucenik"));
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const cas_1 = __importDefault(require("../models/cas"));
const radno_vreme_1 = __importDefault(require("../models/radno_vreme"));
const obavestenje_1 = __importDefault(require("../models/obavestenje"));
const path = require('path');
const fs = require('fs');
const util = require('util');
class TeacherController {
    constructor() {
        this.dohvatiProfil = (req, res) => {
            let korisnickoIme = req.query.korisnickoIme;
            nastavnik_1.default.findOne({ korisnicko_ime: korisnickoIme }).then((u) => {
                res.json(u);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiProfilnuSliku = (req, res) => {
            let profilna_slika = req.query.profilna_slika;
            let slikaPath = path.join(__dirname, '../..', 'src', 'uploads', profilna_slika);
            fs.readFile(slikaPath, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Greška");
                }
                else {
                    console.log(data);
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(data);
                }
            });
        };
        this.promeniIme = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let ime = req.query.ime;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { ime: ime } }).then((u) => {
                res.json({ message: "Uspešno promenjeno ime" });
            }).catch((err) => {
                res.json({ message: "Ime nije promenjeno" });
            });
        };
        this.promeniPrezime = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let prezime = req.query.prezime;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { prezime: prezime } }).then((u) => {
                res.json({ message: "Uspešno promenjeno prezime" });
            }).catch((err) => {
                res.json({ message: "Prezime nije promenjeno" });
            });
        };
        this.promeniAdresu = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let adresa = req.query.adresa;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { adresa: adresa } }).then((u) => {
                res.json({ message: "Uspešno promenjena adresa" });
            }).catch((err) => {
                res.json({ message: "Adresa nije promenjena" });
            });
        };
        this.promeniEmail = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let email = req.query.email;
            nastavnik_1.default.findOne({ email: email }).then((u) => {
                if (u) {
                    res.json({ message: "Email već koristi drugi korisnik" });
                }
                else {
                    ucenik_1.default.findOne({ email: email }).then((u1) => {
                        if (u1) {
                            res.json({ message: "Email već koristi drugi korisnik" });
                        }
                        else {
                            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { email: email } }).then((u1) => {
                                res.json({ message: "Uspešno promenjen email" });
                            }).catch((err1) => {
                                res.json({ message: "Email nije promenjen" });
                            });
                        }
                    });
                }
            }).catch((err) => {
                res.json({ message: "Email nije promenjen" });
            });
        };
        this.promeniKontaktTelefon = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let kontakt_telefon = req.query.kontakt_telefon;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { kontakt_telefon: kontakt_telefon } }).then((u) => {
                res.json({ message: "Uspešno promenjen kontakt telefon" });
            }).catch((err) => {
                res.json({ message: "Kontakt telefon nije promenjen" });
            });
        };
        this.dodajPredmet = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let predmet = req.query.predmet;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $push: { predmeti: predmet } }).then((u) => {
                res.json({ message: "Uspešno dodat predmet" });
            }).catch((err) => {
                res.json({ message: "Predmet nije dodat" });
            });
        };
        this.obrisiPredmet = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let predmet = req.query.predmet;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $pull: { predmeti: predmet } }).then((u) => {
                res.json({ message: "Uspešno obrisan predmet" });
            }).catch((err) => {
                res.json({ message: "Predmet nije obrisan" });
            });
        };
        this.dodajUzrast = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let uzrast = req.query.uzrast;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $push: { uzrast: uzrast } }).then((u) => {
                res.json({ message: "Uspešno dodat uzrast" });
            }).catch((err) => {
                res.json({ message: "Uzrast nije dodat" });
            });
        };
        this.dohvatiCasove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let nastavnik = req.query.nastavnik;
            let datum = new Date();
            let datum3 = new Date();
            datum3.setDate(datum3.getDate() + 3);
            try {
                let data = yield cas_1.default.aggregate([
                    {
                        $match: {
                            nastavnik: nastavnik,
                            status: "P",
                            datum: { $lte: datum3, $gte: datum }
                        }
                    },
                    {
                        $lookup: {
                            from: 'ucenici',
                            localField: 'ucenik',
                            foreignField: 'korisnicko_ime',
                            as: 'ucenikKombinovano'
                        }
                    }
                ]);
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.otkaziCas = (req, res) => {
            let cas1 = req.body;
            let id = req.query.id;
            const mongoose = require('mongoose');
            const objectId = new mongoose.Types.ObjectId(id);
            cas_1.default.updateOne({ _id: id }, { $set: cas1 }).then((u) => {
                if (u) {
                    let insert = {
                        datum: cas1.datum,
                        nastavnik: cas1.nastavnik,
                        ucenik: cas1.ucenik,
                        status: "O",
                        predmet: cas1.predmet,
                        procitano: 0,
                    };
                    new obavestenje_1.default(insert).save();
                    res.json({ message: "Uspešno otkazan čas" });
                }
                else {
                    res.json({ message: "Čas nije otkazan" });
                }
            });
        };
        this.dohvatiZahteve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let nastavnik = req.query.nastavnik;
            try {
                let data = yield cas_1.default.aggregate([
                    {
                        $match: {
                            nastavnik: nastavnik,
                            status: "Z",
                        }
                    },
                    {
                        $lookup: {
                            from: 'ucenici',
                            localField: 'ucenik',
                            foreignField: 'korisnicko_ime',
                            as: 'ucenikKombinovano'
                        }
                    }
                ]);
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.potvrdiCas = (req, res) => {
            let id = req.query.id;
            let cas1 = req.body;
            cas_1.default.updateOne({ _id: id }, { status: "P" }).then((c) => {
                let insert = {
                    datum: cas1.datum,
                    nastavnik: cas1.nastavnik,
                    ucenik: cas1.ucenik,
                    status: "P",
                    predmet: cas1.predmet,
                    procitano: 0,
                };
                new obavestenje_1.default(insert).save();
                res.json({ message: "Uspešno potvrđen cas" });
            }).catch((err) => {
                res.json({ message: "Cas nije potvrđen" });
            });
        };
        this.promeniRadno = (req, res) => {
            let datum = req.body.datum;
            let vremeOd = req.body.vremeOd;
            let vremeDo = req.body.vremeDo;
            let neradan = req.body.neradan;
            let korisnicko_ime = req.query.korisnicko_ime;
            datum = new Date(datum);
            let insert = {
                datum: datum,
                vremeOd: vremeOd,
                vremeDo: vremeDo,
                neradan: neradan,
                korisnicko_ime: korisnicko_ime
            };
            cas_1.default.find({ nastavnik: korisnicko_ime, datum: datum }).then((c) => {
                if (c) {
                    res.json({ message: "Neuspešno - imate časove tog dana" });
                }
                else {
                    new radno_vreme_1.default(insert).save().then(ok => {
                        res.json({ message: "Uspešna promena radnog vremena" });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        };
        this.promeniNeradno = (req, res) => {
            let datum = req.body.datum;
            let neradan = req.body.neradan;
            let korisnicko_ime = req.query.korisnicko_ime;
            datum = new Date(datum);
            let insert = {
                datum: datum,
                neradan: neradan,
                korisnicko_ime: korisnicko_ime
            };
            cas_1.default.find({ nastavnik: korisnicko_ime, datum: datum }).then((c) => {
                if (c) {
                    res.json({ message: "Neuspešno - imate časove tog dana" });
                }
                else {
                    new radno_vreme_1.default(insert).save().then(ok => {
                        res.json({ message: "Uspešna promena neradnog vremena" });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        };
        this.dohvatiSveCasove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let nastavnik = req.query.nastavnik;
            let datum = new Date();
            try {
                let data = yield cas_1.default.aggregate([
                    {
                        $match: {
                            nastavnik: nastavnik,
                            status: "P",
                            datum: { $lt: datum }
                        }
                    },
                    {
                        $lookup: {
                            from: 'ucenici',
                            localField: 'ucenik',
                            foreignField: 'korisnicko_ime',
                            as: 'ucenikKombinovano'
                        }
                    }
                ]);
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.oceniUcenika = (req, res) => {
            let id = req.query.id;
            let cas1 = req.body;
            cas_1.default.updateOne({ _id: id }, { $set: cas1 }).then((u) => {
                if (u) {
                    ucenik_1.default.updateOne({ korisnicko_ime: cas1.ucenik }, { $push: { ocene: cas1.ocenaNastavnik } }).then((u1) => {
                        res.json({ message: "Uspešno unet komentar i ocena" });
                    });
                }
                else {
                    res.json({ message: "Komentar i ocena nisu uneti" });
                }
            });
        };
        this.promeniProfilnuSliku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let slika = req.file;
            let slikaFilename = slika === null || slika === void 0 ? void 0 : slika.filename;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnickoIme }, { $set: { profilna_slika: slikaFilename } }).then((u) => {
                res.json({ message: "Uspešna promena slike" });
            }).catch((err) => {
                res.json({ message: "Neuspešna promena slike" });
            });
        };
        this.obrisiUzrast = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let uzrast = req.query.uzrast;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $pull: { uzrast: uzrast } }).then((u) => {
                res.json({ message: "Uspešno obrisan uzrast" });
            }).catch((err) => {
                res.json({ message: "Uzrast nije obrisan" });
            });
        };
        this.dohvatiCasoveNedelja = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let nastavnik = req.query.nastavnik;
            let datum = new Date();
            try {
                let data = yield cas_1.default.aggregate([
                    {
                        $match: {
                            nastavnik: nastavnik,
                            datum: { $gte: datum }
                        }
                    },
                    {
                        $lookup: {
                            from: 'ucenici',
                            localField: 'ucenik',
                            foreignField: 'korisnicko_ime',
                            as: 'ucenikKombinovano'
                        }
                    }
                ]);
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.TeacherController = TeacherController;
