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
exports.StudentController = void 0;
const ucenik_1 = __importDefault(require("../models/ucenik"));
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const cas_1 = __importDefault(require("../models/cas"));
const radno_vreme_1 = __importDefault(require("../models/radno_vreme"));
const mongoose_1 = __importDefault(require("mongoose"));
const obavestenje_1 = __importDefault(require("../models/obavestenje"));
const path = require('path');
const fs = require('fs');
const util = require('util');
class StudentController {
    constructor() {
        this.dohvatiProfil = (req, res) => {
            let korisnickoIme = req.query.korisnickoIme;
            ucenik_1.default.findOne({ korisnicko_ime: korisnickoIme }).then((u) => {
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
                    res.status(500).send("Greška");
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(data);
                }
            });
            /*
            if (fs.existsSync(slikaPath)) {
                let fileStream = fs.createReadStream(profilna_slika)
                fileStream.pipe(res);
            }
            else {
                res.send("Slika nije pronadjena")
            }*/
        };
        this.promeniIme = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let ime = req.query.ime;
            ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { ime: ime } }).then((u) => {
                res.json({ message: "Uspešno promenjeno ime" });
            }).catch((err) => {
                res.json({ message: "Ime nije promenjeno" });
            });
        };
        this.promeniPrezime = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let prezime = req.query.prezime;
            ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { prezime: prezime } }).then((u) => {
                res.json({ message: "Uspešno promenjeno prezime" });
            }).catch((err) => {
                res.json({ message: "Prezime nije promenjeno" });
            });
        };
        this.promeniAdresu = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let adresa = req.query.adresa;
            ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { adresa: adresa } }).then((u) => {
                res.json({ message: "Uspešno promenjena adresa" });
            }).catch((err) => {
                res.json({ message: "Adresa nije promenjena" });
            });
        };
        this.promeniEmail = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let email = req.query.email;
            ucenik_1.default.findOne({ email: email }).then((u) => {
                if (u) {
                    res.json({ message: "Email već koristi drugi korisnik" });
                }
                else {
                    ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { email: email } }).then((u1) => {
                        res.json({ message: "Uspešno promenjen email" });
                    }).catch((err1) => {
                        res.json({ message: "Email nije promenjen" });
                    });
                }
            }).catch((err) => {
                res.json({ message: "Email nije promenjen" });
            });
        };
        this.promeniKontaktTelefon = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let kontakt_telefon = req.query.kontakt_telefon;
            ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { kontakt_telefon: kontakt_telefon } }).then((u) => {
                res.json({ message: "Uspešno promenjen kontakt telefon" });
            }).catch((err) => {
                res.json({ message: "Kontakt telefon nije promenjen" });
            });
        };
        this.promeniTipSkole = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let tip_skole = req.query.tip_skole;
            ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { tip_skole: tip_skole } }).then((u) => {
                if (u) {
                    if (tip_skole == "srednja-gimnazija" || tip_skole == "srednja-umetnicka" || tip_skole == "srednja-strucna") {
                        ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { trenutni_razred: 1 } }).then((u1) => {
                            res.json({ message: "Uspešno promenjen tip škole" });
                        });
                    }
                }
                else {
                    res.json({ message: "Tip škole nije promenjen" });
                }
            }).catch((err) => {
                res.json({ message: "Tip skole nije promenjen" });
            });
        };
        this.promeniTrenutniRazred = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let trenutni_razred = req.query.trenutni_razred;
            ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { trenutni_razred: trenutni_razred } }).then((u) => {
                res.json({ message: "Uspešno promenjen trenutni razred" });
            }).catch((err) => {
                res.json({ message: "Trenutni razred nije promenjen" });
            });
        };
        this.dohvatiNastavnike = (req, res) => {
            let tip = req.query.tip;
            nastavnik_1.default.find({ uzrast: { $in: [tip] }, odobren: 1 }).then((n) => {
                if (n) {
                    res.json(n);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.zakaziCas = (req, res) => {
            let nastavnik = req.body.nastavnik;
            let ucenik = req.body.ucenik;
            let predmet = req.body.predmet;
            let datum = new Date(req.body.datum);
            let opis = req.body.opis;
            let dupli_cas = req.body.dupli_cas;
            let datumStr = req.body.datum;
            datumStr = datumStr.substring(0, 10);
            let noviDatum = new Date(datumStr);
            let satiPocetak = datum.getHours();
            let satiKraj;
            let minutiPocetak = datum.getMinutes();
            let minutiKraj;
            let datumEnd = new Date(datum);
            if (dupli_cas == 1) {
                datumEnd.setMinutes(datumEnd.getMinutes() + 120);
            }
            else {
                datumEnd.setMinutes(datumEnd.getMinutes() + 60);
            }
            satiKraj = datumEnd.getHours();
            minutiKraj = datumEnd.getMinutes();
            let pocetakSati = satiPocetak < 10 ? '0' + satiPocetak : satiPocetak;
            let pocetakMinuti = minutiPocetak < 10 ? '0' + minutiPocetak : minutiPocetak;
            let krajSati = satiKraj < 10 ? '0' + satiKraj : satiKraj;
            let krajMinuti = minutiKraj < 10 ? '0' + minutiKraj : minutiKraj;
            let pocetak = pocetakSati + ":" + pocetakMinuti;
            let kraj = krajSati + ":" + krajMinuti;
            cas_1.default.find({ nastavnik: nastavnik, datum: { $gte: datum, $lte: datumEnd } }).then((c) => {
                if (c.length != 0) {
                    res.json({ message: "Nastavnik zauzet zbog drugog časa" });
                    console.log(c);
                }
                else {
                    radno_vreme_1.default.find({ korisnicko_ime: nastavnik, neradan: 1, datum: noviDatum }).then((r) => {
                        if (r.length != 0) {
                            res.json({ message: "Nastavnik ne radi tog dana" });
                        }
                        else {
                            radno_vreme_1.default.find({ korisnicko_ime: nastavnik, datum: noviDatum, $and: [{ vremeOd: { $gte: pocetak } }, { vremeDo: { $lte: kraj } }] }).then((r2) => {
                                if (r2.length != 0) {
                                    res.json({ message: "Nastavnik ne radi u tom periodu" });
                                }
                                else {
                                    let cas_insert = {
                                        _id: new mongoose_1.default.Types.ObjectId(),
                                        nastavnik: nastavnik,
                                        ucenik: ucenik,
                                        predmet: predmet,
                                        datum: datum,
                                        opis: opis,
                                        status: "Z",
                                        dupli_cas: dupli_cas
                                    };
                                    new cas_1.default(cas_insert).save().then(ok => {
                                        res.json({ message: "Uspešno zakazan čas" });
                                    }).catch((err2) => {
                                        console.log(err2);
                                    });
                                }
                            });
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiCasoveNastavnika = (req, res) => {
            let nastavnik = req.query.nastavnik;
            cas_1.default.find({ nastavnik: nastavnik, status: { $ne: "O" } }).then((c) => {
                res.json(c);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiArhivuCasovaUcenika = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let ucenik = req.query.ucenik;
            let danas = new Date();
            try {
                let data = yield cas_1.default.aggregate([
                    {
                        $match: {
                            ucenik: ucenik,
                            status: "P",
                            datum: { $lt: danas }
                        }
                    },
                    {
                        $lookup: {
                            from: 'nastavnici',
                            localField: 'nastavnik',
                            foreignField: 'korisnicko_ime',
                            as: 'nastavnikKombinovano'
                        }
                    }
                ]);
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.oceniNastavnika = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.body._id;
            let cas1 = req.body;
            let nastavnik1 = cas1.nastavnik;
            let ocena = cas1.ocenaUcenik;
            cas_1.default.updateOne({ _id: id }, { $set: cas1 }).then((u) => {
                if (u) {
                    nastavnik_1.default.updateOne({ korisnicko_ime: nastavnik1 }, { $push: { ocene: ocena } }).then(n => {
                        res.json({ message: "Komentar i ocena uneti" });
                    });
                }
                else {
                    res.json({ message: "Komentar i ocena nisu uneti" });
                    return;
                }
            }).catch((err) => {
                console.log(err);
            });
        });
        this.dohvatiBuduceCasoveUcenika = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let ucenik = req.query.ucenik;
            let danas = new Date();
            try {
                let data = yield cas_1.default.aggregate([
                    {
                        $match: {
                            ucenik: ucenik,
                            status: "Z",
                            datum: { $gte: danas }
                        }
                    },
                    {
                        $lookup: {
                            from: 'nastavnici',
                            localField: 'nastavnik',
                            foreignField: 'korisnicko_ime',
                            as: 'nastavnikKombinovano'
                        }
                    }
                ]);
                console.log(data);
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.promeniProfilnuSliku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let slika = req.file;
            let slikaFilename = slika === null || slika === void 0 ? void 0 : slika.filename;
            ucenik_1.default.updateOne({ korisnicko_ime: korisnickoIme }, { $set: { profilna_slika: slikaFilename } }).then((u) => {
                res.json({ message: "Uspešna promena slike" });
            }).catch((err) => {
                res.json({ message: "Neuspešna promena slike" });
            });
        };
        this.dohvatiKomentareNastavnika = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let nastavnik = req.query.nastavnik;
            try {
                let data = yield cas_1.default.aggregate([
                    {
                        $match: {
                            nastavnik: nastavnik,
                            status: "P"
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
        this.dohvatiRadnoVreme = (req, res) => {
            let nastavnik = req.query.nastavnik;
            radno_vreme_1.default.find({ korisnicko_ime: nastavnik }).then((r) => {
                res.json(r);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiObavestenja = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let ucenik = req.query.ucenik;
            try {
                let data = yield obavestenje_1.default.aggregate([
                    {
                        $match: {
                            ucenik: ucenik,
                        }
                    },
                    {
                        $lookup: {
                            from: 'nastavnici',
                            localField: 'nastavnik',
                            foreignField: 'korisnicko_ime',
                            as: 'nastavnikKombinovano'
                        }
                    }
                ]);
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.oznaciKaoProcitano = (req, res) => {
            let id = req.query.id;
            obavestenje_1.default.updateOne({ _id: id }, { $set: { procitano: 1 } }).then((o) => {
                res.json({ message: "Uspešno" });
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.StudentController = StudentController;
