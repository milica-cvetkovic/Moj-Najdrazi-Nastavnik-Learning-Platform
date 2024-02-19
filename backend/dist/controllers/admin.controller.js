"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const ucenik_1 = __importDefault(require("../models/ucenik"));
const predmet_1 = __importDefault(require("../models/predmet"));
const cas_1 = __importDefault(require("../models/cas"));
const path = require('path');
const fs = require('fs');
const util = require('util');
class AdminController {
    constructor() {
        this.dohvatiNastavnikePredmete = (req, res) => {
            nastavnik_1.default.find({ odobren: 1 }).then((n) => {
                if (n) {
                    res.json(n);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiSveUcenike = (req, res) => {
            ucenik_1.default.find({}).then((u) => {
                if (u) {
                    res.json(u);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiSveNastavnike = (req, res) => {
            nastavnik_1.default.find().then((n) => {
                if (n) {
                    res.json(n);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.deaktiviraj = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { odobren: 0, deaktiviran: 1 } }).then((n) => {
                if (n) {
                    res.json({ message: "Uspešno deaktiviran nastavnik" });
                }
                else {
                    res.json({ message: "Neuspešna deaktivacija" });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.zahtevi = (req, res) => {
            nastavnik_1.default.find({ odobren: 0, deaktiviran: 0 }).then((n) => {
                res.json(n);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odobren = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let odobren = req.query.odobren;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { odobren: odobren } }).then((n) => {
                if (n) {
                    res.json({ message: "Uspešna promena" });
                }
                else {
                    res.json({ message: "Neuspešna promena" });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odbijen = (req, res) => {
            let korisnicko_ime = req.query.korisnicko_ime;
            let odobren = req.query.odobren;
            nastavnik_1.default.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { odobren: odobren, deaktiviran: 1 } }).then((n) => {
                if (n) {
                    res.json({ message: "Uspešna promena" });
                }
                else {
                    res.json({ message: "Neuspešna promena" });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiSvePredmete = (req, res) => {
            predmet_1.default.find({}).then((p) => {
                res.json(p);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.unesiPredmet = (req, res) => {
            let naziv = req.query.naziv;
            let insert = {
                naziv: naziv
            };
            new predmet_1.default(insert).save().then(ok => {
                res.json({ message: "Uspešno dodat predmet" });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiCasoveProslaGodina = (req, res) => {
            let start = new Date('2023-01-01');
            let end = new Date('2023-12-31T23:59:59.999');
            cas_1.default.find({ datum: { $gte: start, $lt: end } }).then((d) => {
                res.json(d);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiCV = (req, res) => {
            let cv = req.query.cv;
            let cvPath = path.join(__dirname, '../..', 'src', 'uploads', cv);
            fs.readFile(cvPath, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Greška");
                }
                else {
                    console.log(data);
                    res.writeHead(200, { 'Content-Type': 'application/pdf' });
                    res.end(data);
                }
            });
        };
    }
}
exports.AdminController = AdminController;
