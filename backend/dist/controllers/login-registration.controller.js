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
exports.LoginRegistrationController = void 0;
const bezbedonosno_pitanje_1 = __importDefault(require("../models/bezbedonosno_pitanje"));
const ucenik_1 = __importDefault(require("../models/ucenik"));
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const cas_1 = __importDefault(require("../models/cas"));
const predmet_1 = __importDefault(require("../models/predmet"));
const admin_1 = __importDefault(require("../models/admin"));
const path = require('path');
const bcrypt = require('bcrypt');
class LoginRegistrationController {
    constructor() {
        this.bezbedonosnaPitanja = (req, res) => {
            bezbedonosno_pitanje_1.default.find({}).then(bezbedonosnaPitanja => {
                res.json(bezbedonosnaPitanja);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let korisnickoIme1 = req.query.korisnickoIme;
            let lozinka1 = req.query.lozinka;
            try {
                let u = yield ucenik_1.default.findOne({ korisnicko_ime: korisnickoIme1 });
                if (u) {
                    let matched = yield bcrypt.compare(lozinka1, u.lozinka);
                    if (matched) {
                        res.json({
                            korisnicko_ime: u.korisnicko_ime,
                            lozinka: u.lozinka,
                            bezbedonosno_pitanje: u.bezbedonosno_pitanje,
                            odgovor: u.odgovor,
                            ime: u.ime,
                            prezime: u.prezime,
                            pol: u.pol,
                            adresa: u.adresa,
                            kontakt_telefon: u.kontakt_telefon,
                            email: u.email,
                            profilna_slika: u.profilna_slika,
                            tip_skole: u.tip_skole,
                            trenutni_razred: u.trenutni_razred,
                            greska: "",
                            tip: "ucenik"
                        });
                    }
                    else {
                        res.json({ greska: "Nije ispravna lozinka ili korisničko ime" });
                    }
                }
                else {
                    let n = yield nastavnik_1.default.findOne({ korisnicko_ime: korisnickoIme1, odobren: 1 });
                    if (n) {
                        let matched = yield bcrypt.compare(lozinka1, n.lozinka);
                        if (matched) {
                            res.json({
                                korisnicko_ime: n.korisnicko_ime,
                                lozinka: n.lozinka,
                                bezbedonosno_pitanje: n.bezbedonosno_pitanje,
                                odgovor: n.odgovor,
                                ime: n.ime,
                                prezime: n.prezime,
                                pol: n.pol,
                                adresa: n.adresa,
                                kontakt_telefon: n.kontakt_telefon,
                                email: n.email,
                                profilna_slika: n.profilna_slika,
                                predmeti: n.predmeti,
                                uzrast: n.uzrast,
                                sajt: n.sajt,
                                greska: "",
                                tip: "nastavnik"
                            });
                        }
                        else {
                            res.json({ greska: "Nije ispravna lozinka ili korisničko ime" });
                        }
                    }
                    else {
                        res.json({ greska: "Korisničko ime ne postoji ili čeka odobrenje" });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.registerUcenik = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            let bezbedonosno_pitanje = req.body.bezbedonosno_pitanje;
            let odgovor = req.body.odgovor;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let pol = req.body.pol;
            let adresa = req.body.adresa;
            let kontakt_telefon = req.body.kontakt_telefon;
            let email = req.body.email;
            let profilna_slika = req.body.profilna_slika;
            let tip_skole = req.body.tip_skole;
            let trenutni_razred = req.body.trenutni_razred;
            let hashed = yield bcrypt.hash(lozinka, 10);
            ucenik_1.default.findOne({ korisnicko_ime: korisnicko_ime }).then((u) => {
                if (u) {
                    res.json({ message: "Korisničko ime je zauzeto" });
                }
                else {
                    nastavnik_1.default.findOne({ korisnicko_ime: korisnicko_ime }).then((n) => {
                        if (n) {
                            res.json({ message: "Korisničko ime je zauzeto" });
                        }
                        else {
                            ucenik_1.default.findOne({ email: email }).then((u1) => {
                                if (u1) {
                                    res.json({ message: "Email koristi postojeći korisnik" });
                                }
                                else {
                                    nastavnik_1.default.findOne({ email: email }).then((n1) => {
                                        if (n1) {
                                            res.json({ message: "Email koristi postojeći korisnik" });
                                        }
                                        else {
                                            let ucenik_insert = {
                                                korisnicko_ime: korisnicko_ime,
                                                lozinka: hashed,
                                                bezbedonosno_pitanje: bezbedonosno_pitanje,
                                                odgovor: odgovor,
                                                ime: ime,
                                                prezime: prezime,
                                                pol: pol,
                                                adresa: adresa,
                                                kontakt_telefon: kontakt_telefon,
                                                email: email,
                                                profilna_slika: profilna_slika,
                                                tip_skole: tip_skole,
                                                trenutni_razred: trenutni_razred,
                                                ocene: []
                                            };
                                            new ucenik_1.default(ucenik_insert).save().then(ok => {
                                                res.json({ message: "Uspešna registracija" });
                                            }).catch((err2) => {
                                                console.log(err2);
                                            });
                                        }
                                    });
                                }
                            }).catch((err1) => {
                                console.log(err1);
                            });
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        });
        this.registerProfilnaSlika = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let slika = req.file;
            let slikaFilename = slika === null || slika === void 0 ? void 0 : slika.filename;
            /*
         
            ucenik.updateOne({korisnicko_ime: korisnickoIme},{$set: {profilna_slika:slikaFilename}}).then((u)=>{
                res.json({message:"Uspesna slika"})
            }).catch((err)=>{
                res.json({message:"Neuspesna slika"})
            })*/
        };
        this.registerProfilnaSlikaDefault = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let slikaFilename = "default.jpg";
            ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { profilna_slika: slikaFilename } }).then((u) => {
            }).catch((err) => {
                console.log(err);
            });
        };
        this.registerNastavnik = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            let bezbedonosno_pitanje = req.body.bezbedonosno_pitanje;
            let odgovor = req.body.odgovor;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let pol = req.body.pol;
            let adresa = req.body.adresa;
            let kontakt_telefon = req.body.kontakt_telefon;
            let email = req.body.email;
            let profilna_slika = req.body.profilna_slika;
            let predmeti = req.body.predmeti;
            let uzrast = req.body.uzrast;
            let sajt = req.body.sajt;
            let cv = req.body.cv;
            let novi = req.query.novi;
            let hashed = yield bcrypt.hash(lozinka, 10);
            nastavnik_1.default.findOne({ korisnicko_ime: korisnicko_ime }).then((n) => {
                if (n) {
                    res.json({ message: "Korisničko ime je zauzeto" });
                }
                else {
                    ucenik_1.default.findOne({ korisnicko_ime: korisnicko_ime }).then((u) => {
                        if (u) {
                            res.json({ message: "Korisničko ime je zauzeto" });
                        }
                        else {
                            nastavnik_1.default.findOne({ email: email }).then((n1) => {
                                if (n1) {
                                    res.json({ message: "Email koristi postojeći korisnik" });
                                }
                                else {
                                    ucenik_1.default.findOne({ email: email }).then((u1) => {
                                        if (u1) {
                                            res.json({ message: "Email koristi postojeći korisnik" });
                                        }
                                        else {
                                            if (novi != "") {
                                                let insert_predmet = {
                                                    naziv: novi
                                                };
                                                new predmet_1.default(insert_predmet).save();
                                            }
                                            let nastavnik_insert = {
                                                korisnicko_ime: korisnicko_ime,
                                                lozinka: hashed,
                                                bezbedonosno_pitanje: bezbedonosno_pitanje,
                                                odgovor: odgovor,
                                                ime: ime,
                                                prezime: prezime,
                                                pol: pol,
                                                adresa: adresa,
                                                kontakt_telefon: kontakt_telefon,
                                                email: email,
                                                profilna_slika: profilna_slika,
                                                predmeti: predmeti,
                                                uzrast: uzrast,
                                                sajt: sajt,
                                                cv: cv,
                                                odobren: 0,
                                                ocene: [],
                                                deaktiviran: 0,
                                            };
                                            new nastavnik_1.default(nastavnik_insert).save().then(ok => {
                                                res.json({ message: "Registracija čeka odobrenje" });
                                            }).catch((err2) => {
                                                console.log(err2);
                                            });
                                        }
                                    });
                                }
                            }).catch((err1) => {
                                console.log(err1);
                            });
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        });
        this.dohvatiBrojUcenika = (req, res) => {
            ucenik_1.default.countDocuments().then((u) => {
                res.json(u);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiBrojNastavnika = (req, res) => {
            nastavnik_1.default.countDocuments({ odobren: 1 }).then((n) => {
                res.json(n);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiSedam = (req, res) => {
            let datum = new Date();
            let datumSedam = new Date(datum.getTime() - 7 * 24 * 60 * 60 * 1000);
            cas_1.default.countDocuments({ datum: { $gte: datumSedam, $lte: datum }, status: "P" }).then((s) => {
                res.json(s);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiMesec = (req, res) => {
            let datum = new Date();
            let datumSedam = new Date(datum.getTime() - 30 * 24 * 60 * 60 * 1000);
            cas_1.default.countDocuments({ datum: { $gte: datumSedam, $lte: datum }, status: "P" }).then((s) => {
                res.json(s);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiNastavnike = (req, res) => {
            nastavnik_1.default.find({ odobren: 1 }).then((n) => {
                if (n) {
                    res.json(n);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiPredmete = (req, res) => {
            predmet_1.default.find({}).then((p) => {
                res.json(p);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.registerCV = (req, res) => {
            let cv = req.file;
            res.json({ message: "Uspešno poslat" });
        };
        this.promeniLozinku = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let korisnicko_ime = req.query.korisnicko_ime;
            let staralozinka = req.query.staralozinka;
            let novalozinka = req.query.novalozinka;
            let hashed = yield bcrypt.hash(novalozinka, 10);
            try {
                let u = yield ucenik_1.default.findOne({ korisnicko_ime: korisnicko_ime });
                if (u) {
                    let matched = yield bcrypt.compare(staralozinka, u.lozinka);
                    if (matched) {
                        ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n) => {
                            res.json({ message: "Uspešna promena lozinke" });
                        });
                    }
                    else {
                        res.json({ message: "Neispravna lozinka" });
                    }
                }
                else {
                    let n = yield nastavnik_1.default.findOne({ korisnicko_ime: korisnicko_ime });
                    if (n) {
                        let matched = yield bcrypt.compare(staralozinka, n.lozinka);
                        if (matched) {
                            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n2) => {
                                res.json({ message: "Uspešna promena lozinke" });
                            });
                        }
                    }
                    else {
                        res.json({ message: "Neispravna lozinka" });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.loginAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let korisnickoIme1 = req.query.korisnickoIme;
            let lozinka1 = req.query.lozinka;
            try {
                let u = yield admin_1.default.findOne({ korisnicko_ime: korisnickoIme1 });
                if (u) {
                    let matched = yield bcrypt.compare(lozinka1, u.lozinka);
                    if (matched) {
                        res.json({ message: "Uspešno" });
                    }
                }
                else {
                    res.json({ message: "Neuspešno" });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.dohvatiBezbedonosnoPitanje = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            ucenik_1.default.findOne({ korisnicko_ime: korisnicko_ime }).then((u) => {
                if (u) {
                    let bezbedonosno = u.bezbedonosno_pitanje;
                    bezbedonosno_pitanje_1.default.findOne({ _id: bezbedonosno }).then((b) => {
                        res.json(b);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.proveriOdgovor = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let pitanje = req.query.pitanje;
            let odgovor = req.query.odgovor;
            ucenik_1.default.findOne({ korisnicko_ime: korisnicko_ime, bezbedonosno_pitanje: pitanje, odgovor: odgovor }).then((u) => {
                if (u) {
                    res.json({ message: "OK" });
                }
                else {
                    res.json({ message: "Odgovor nije tačan" });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.zaboravljenaLozinka = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let korisnicko_ime = req.query.korisnicko_ime;
            let lozinka = req.query.lozinka;
            let hashed = yield bcrypt.hash(lozinka, 10);
            try {
                let u = yield ucenik_1.default.findOne({ korisnicko_ime: korisnicko_ime });
                if (u) {
                    ucenik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n) => {
                        res.json({ message: "Uspešna promena lozinke" });
                    });
                }
                else {
                    let n = yield nastavnik_1.default.findOne({ korisnicko_ime: korisnicko_ime });
                    if (n) {
                        nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n2) => {
                            res.json({ message: "Uspešna promena lozinke" });
                        });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        this.promeniLozinkuAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let korisnicko_ime = req.query.korisnicko_ime;
            let staralozinka = req.query.staralozinka;
            let novalozinka = req.query.novalozinka;
            let hashed = yield bcrypt.hash(novalozinka, 10);
            try {
                let a = yield admin_1.default.findOne({ korisnicko_ime: korisnicko_ime });
                if (a) {
                    let matched = yield bcrypt.compare(staralozinka, a.lozinka);
                    if (matched) {
                        admin_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((a) => {
                            res.json({ message: "Uspešna promena lozinke" });
                        });
                    }
                    else {
                        res.json({ message: "Neispravna lozinka" });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.LoginRegistrationController = LoginRegistrationController;
