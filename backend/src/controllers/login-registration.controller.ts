import express from 'express'
import bezbedonosno_pitanje from '../models/bezbedonosno_pitanje'
import ucenik from '../models/ucenik'
import nastavnik from '../models/nastavnik'
import cas from '../models/cas';
import predmet from '../models/predmet';
import admin from '../models/admin';

const path = require('path');
const bcrypt = require('bcrypt');

export class LoginRegistrationController {

    bezbedonosnaPitanja = (req: express.Request, res: express.Response) => {

        bezbedonosno_pitanje.find({}).then(bezbedonosnaPitanja => {
            res.json(bezbedonosnaPitanja)
        }).catch((err) => {
            console.log(err)
        })

    }

    login = async (req: express.Request, res: express.Response) => {

        let korisnickoIme1 = req.query.korisnickoIme;
        let lozinka1 = req.query.lozinka;

        try {
            let u = await ucenik.findOne({ korisnicko_ime: korisnickoIme1 })

            if (u) {
                let matched = await bcrypt.compare(lozinka1, u.lozinka)
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
                    })
                }
                else {
                    res.json({ greska: "Nije ispravna lozinka ili korisničko ime" })
                }

            }
            else {
                let n = await nastavnik.findOne({ korisnicko_ime: korisnickoIme1, odobren: 1 })
                if (n) {
                    let matched = await bcrypt.compare(lozinka1, n.lozinka)
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
                        })
                    }
                    else {
                        res.json({ greska: "Nije ispravna lozinka ili korisničko ime" })
                    }

                }else{
                    res.json({greska: "Korisničko ime ne postoji ili čeka odobrenje"})
                }
            }

        } catch (err) {
            console.log(err)
        }

    }

    registerUcenik = async (req: express.Request, res: express.Response) => {

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

        let hashed = await bcrypt.hash(lozinka, 10)

        ucenik.findOne({ korisnicko_ime: korisnicko_ime }).then((u) => {

            if (u) {
                res.json({ message: "Korisničko ime je zauzeto" })
            }
            else {

                nastavnik.findOne({ korisnicko_ime: korisnicko_ime }).then((n) => {

                    if (n) {
                        res.json({ message: "Korisničko ime je zauzeto" })
                    }
                    else {
                        ucenik.findOne({ email: email }).then((u1) => {
                            
                            if (u1) {
                                res.json({ message: "Email koristi postojeći korisnik" })
                            }
                            else {

                                nastavnik.findOne({ email: email }).then((n1) => {

                                    if (n1) {
                                        res.json({ message: "Email koristi postojeći korisnik" })
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
                                        }

                                        new ucenik(ucenik_insert).save().then(ok => {
                                            res.json({ message: "Uspešna registracija" })
                                        }).catch((err2) => {
                                            console.log(err2)
                                        })
                                    }

                                })

                            }
                        }).catch((err1) => {
                            console.log(err1)
                        })
                    }

                })


            }
        }).catch((err) => {
            console.log(err)
        })

    }

    registerProfilnaSlika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let slika = req.file;

        let slikaFilename = slika?.filename
        /*
     
        ucenik.updateOne({korisnicko_ime: korisnickoIme},{$set: {profilna_slika:slikaFilename}}).then((u)=>{
            res.json({message:"Uspesna slika"})
        }).catch((err)=>{
            res.json({message:"Neuspesna slika"})
        })*/
    }

    registerProfilnaSlikaDefault = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime
        let slikaFilename = "default.jpg";
     
        ucenik.updateOne({korisnicko_ime: korisnicko_ime},{$set: {profilna_slika:slikaFilename}}).then((u)=>{
            
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    registerNastavnik = async (req: express.Request, res: express.Response) => {

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

        let hashed = await bcrypt.hash(lozinka, 10)

        nastavnik.findOne({ korisnicko_ime: korisnicko_ime }).then((n) => {
            if (n) {
                res.json({ message: "Korisničko ime je zauzeto" })
            }
            else {
                ucenik.findOne({ korisnicko_ime: korisnicko_ime }).then((u) => {
                    if (u) {
                        res.json({ message: "Korisničko ime je zauzeto" })
                    }
                    else {

                        nastavnik.findOne({ email: email }).then((n1) => {
                            if (n1) {
                                res.json({ message: "Email koristi postojeći korisnik" })
                            }
                            else {

                                ucenik.findOne({ email: email }).then((u1) => {

                                    if (u1) {
                                        res.json({ message: "Email koristi postojeći korisnik" })
                                    }
                                    else {
                                        if(novi != ""){
                                            let insert_predmet = {
                                                naziv: novi
                                            }
    
                                            new predmet(insert_predmet).save()
    
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
                                        }

                                        new nastavnik(nastavnik_insert).save().then(ok => {
                                            res.json({ message: "Registracija čeka odobrenje" })
                                        }).catch((err2) => {
                                            console.log(err2)
                                        })
                                    }

                                })


                            }
                        }).catch((err1) => {
                            console.log(err1)
                        })

                    }


                })

            }
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiBrojUcenika = (req: express.Request, res: express.Response) => {

        ucenik.countDocuments().then((u) => {
            res.json(u)
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiBrojNastavnika = (req: express.Request, res: express.Response) => {

        nastavnik.countDocuments({ odobren: 1 }).then((n) => {
            res.json(n)
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiSedam = (req: express.Request, res: express.Response) => {

        let datum = new Date()
        let datumSedam = new Date(datum.getTime() - 7 * 24 * 60 * 60 * 1000)

        cas.countDocuments({ datum: { $gte: datumSedam, $lte: datum }, status: "P" }).then((s) => {
            res.json(s)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiMesec = (req: express.Request, res: express.Response) => {

        let datum = new Date()
        let datumSedam = new Date(datum.getTime() - 30 * 24 * 60 * 60 * 1000)

        cas.countDocuments({ datum: { $gte: datumSedam, $lte: datum }, status: "P" }).then((s) => {
            res.json(s)
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiNastavnike = (req: express.Request, res: express.Response) => {


        nastavnik.find({ odobren: 1 }).then((n) => {
            if (n) {
                res.json(n)
            }
        }).catch((err) => {
            console.log(err)
        })


    }

    dohvatiPredmete = (req: express.Request, res: express.Response) => {

        predmet.find({}).then((p) => {
            res.json(p)
        }).catch((err) => {
            console.log(err)
        })

    }

    registerCV = (req: express.Request, res: express.Response) => {

        let cv = req.file

        res.json({ message: "Uspešno poslat" })

    }

    promeniLozinku = async (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime
        let staralozinka = req.query.staralozinka
        let novalozinka = req.query.novalozinka

        let hashed = await bcrypt.hash(novalozinka, 10)

        try {

            let u = await ucenik.findOne({ korisnicko_ime: korisnicko_ime })

            if (u) {
                let matched = await bcrypt.compare(staralozinka, u.lozinka)
                if (matched) {

                    ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n) => {
                        res.json({ message: "Uspešna promena lozinke" })
                    })

                }
                else {
                    res.json({ message: "Neispravna lozinka" })
                }
            }
            else {

                let n = await nastavnik.findOne({ korisnicko_ime: korisnicko_ime })
                if (n) {
                    let matched = await bcrypt.compare(staralozinka, n.lozinka)
                    if (matched) {
                        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n2) => {
                            res.json({ message: "Uspešna promena lozinke" })
                        })
                    }
                }
                else {
                    res.json({ message: "Neispravna lozinka" })
                }

            }

        } catch (err) {
            console.log(err)
        }

    }

    loginAdmin = async (req: express.Request, res: express.Response) => {

        let korisnickoIme1 = req.query.korisnickoIme;
        let lozinka1 = req.query.lozinka;

        try {
            let u = await admin.findOne({ korisnicko_ime: korisnickoIme1 })
    
            if (u) {
                let matched = await bcrypt.compare(lozinka1, u.lozinka)
                if (matched) {
                    res.json({ message: "Uspešno" })
                }
            }
            else{
                res.json({ message: "Neuspešno" })
            }
        }catch (err) {
            console.log(err)
        }

    }

    dohvatiBezbedonosnoPitanje = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime

        ucenik.findOne({korisnicko_ime: korisnicko_ime}).then((u)=>{
            if(u){
                let bezbedonosno = u.bezbedonosno_pitanje
                bezbedonosno_pitanje.findOne({_id: bezbedonosno}).then((b)=>{
                    res.json(b)
                })
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    proveriOdgovor = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime
        let pitanje = req.query.pitanje
        let odgovor = req.query.odgovor

        ucenik.findOne({korisnicko_ime: korisnicko_ime, bezbedonosno_pitanje: pitanje, odgovor: odgovor}).then((u)=>{
            if(u){
                res.json({message:"OK"})
            }
            else{
                res.json({message:"Odgovor nije tačan"})
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    zaboravljenaLozinka = async (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime
        let lozinka = req.query.lozinka
        let hashed = await bcrypt.hash(lozinka, 10)

        try {

            let u = await ucenik.findOne({ korisnicko_ime: korisnicko_ime })

            if (u) {
                ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n) => {
                    res.json({ message: "Uspešna promena lozinke" })
                })
            }
            else {

                let n = await nastavnik.findOne({ korisnicko_ime: korisnicko_ime })
                if (n) {

                    nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((n2) => {
                        res.json({ message: "Uspešna promena lozinke" })
                    })
                }

            }

        } catch (err) {
            console.log(err)
        }

    }

    promeniLozinkuAdmin = async (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime
        let staralozinka = req.query.staralozinka
        let novalozinka = req.query.novalozinka

        let hashed = await bcrypt.hash(novalozinka, 10)

        try {

            let a = await admin.findOne({ korisnicko_ime: korisnicko_ime })

            if (a) {
                let matched = await bcrypt.compare(staralozinka, a.lozinka)
                if (matched) {

                    admin.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { lozinka: hashed } }).then((a) => {
                        res.json({ message: "Uspešna promena lozinke" })
                    })

                }
                else {
                    res.json({ message: "Neispravna lozinka" })
                }
            }
        }catch (err) {
            console.log(err)
        }

    }

}