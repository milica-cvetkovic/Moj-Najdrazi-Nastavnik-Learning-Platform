import express from 'express'
import ucenik from '../models/ucenik'
import nastavnik from '../models/nastavnik';
import cas from '../models/cas';
import radno_vreme from '../models/radno_vreme';
import mongoose, { mongo } from 'mongoose';
import { ObjectId } from 'mongodb';
import obavestenje from '../models/obavestenje';

const path = require('path');
const fs = require('fs');
const util = require('util');

export class StudentController {

    dohvatiProfil = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.query.korisnickoIme;
        ucenik.findOne({ korisnicko_ime: korisnickoIme }).then((u) => {
            res.json(u)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiProfilnuSliku = (req: express.Request, res: express.Response) => {

        let profilna_slika = req.query.profilna_slika

        let slikaPath = path.join(__dirname, '../..', 'src', 'uploads', profilna_slika)
        
        fs.readFile(slikaPath, (err: any, data: any)=>{
            if(err){
                res.status(500).send("Greška")
            }
            else{
                res.writeHead(200, {'Content-Type':'image/jpg'});
                res.end(data)
            }
        })

        /*
        if (fs.existsSync(slikaPath)) {
            let fileStream = fs.createReadStream(profilna_slika)
            fileStream.pipe(res);
        }
        else {
            res.send("Slika nije pronadjena")
        }*/

    }

    promeniIme = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let ime = req.query.ime;

        ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { ime: ime } }).then((u) => {
            res.json({ message: "Uspešno promenjeno ime" })
        }).catch((err) => {
            res.json({ message: "Ime nije promenjeno" })
        })

    }

    promeniPrezime = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let prezime = req.query.prezime;

        ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { prezime: prezime } }).then((u) => {
            res.json({ message: "Uspešno promenjeno prezime" })
        }).catch((err) => {
            res.json({ message: "Prezime nije promenjeno" })
        })

    }

    promeniAdresu = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let adresa = req.query.adresa;

        ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { adresa: adresa } }).then((u) => {
            res.json({ message: "Uspešno promenjena adresa" })
        }).catch((err) => {
            res.json({ message: "Adresa nije promenjena" })
        })

    }
    
    promeniEmail = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let email = req.query.email;

        ucenik.findOne({ email: email }).then((u) => {

            if (u) {
                res.json({ message: "Email već koristi drugi korisnik" })
            }
            else {

                nastavnik.findOne({email: email}).then((n)=>{
                    if(n){
                        res.json({ message: "Email već koristi drugi korisnik" })
                    }
                    else{
                        ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { email: email } }).then((u1) => {
                            res.json({ message: "Uspešno promenjen email" })
                        }).catch((err1) => {
                            res.json({ message: "Email nije promenjen" })
                        })
                    }
                })

            }

        }).catch((err) => {
            res.json({ message: "Email nije promenjen" })
        })

    }
    promeniKontaktTelefon = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let kontakt_telefon = req.query.kontakt_telefon;

        ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { kontakt_telefon: kontakt_telefon } }).then((u) => {
            res.json({ message: "Uspešno promenjen kontakt telefon" })
        }).catch((err) => {
            res.json({ message: "Kontakt telefon nije promenjen" })
        })

    }

    promeniTipSkole = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let tip_skole = req.query.tip_skole;

        ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { tip_skole: tip_skole } }).then((u) => {
            
            if(u){
                if(tip_skole == "srednja-gimnazija" || tip_skole == "srednja-umetnicka" || tip_skole == "srednja-strucna"){

                    ucenik.updateOne({korisnicko_ime:korisnicko_ime}, {$set: {trenutni_razred: 1}}).then((u1)=>{
                        res.json({ message: "Uspešno promenjen tip škole" })    
                    })
                }
            }
            else{
                res.json({ message: "Tip škole nije promenjen" })
            }
           
        }).catch((err) => {
            res.json({ message: "Tip skole nije promenjen" })
        })

    }

    promeniTrenutniRazred = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let trenutni_razred = req.query.trenutni_razred;

        ucenik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { trenutni_razred: trenutni_razred } }).then((u) => {
            res.json({ message: "Uspešno promenjen trenutni razred" })
        }).catch((err) => {
            res.json({ message: "Trenutni razred nije promenjen" })
        })

    }

    dohvatiNastavnike = (req: express.Request, res: express.Response) => {

        let tip = req.query.tip;

        nastavnik.find({ uzrast: { $in: [tip] }, odobren: 1 }).then((n) => {
            if (n) {
                res.json(n)
            }
        }).catch((err) => {
            console.log(err)
        })


    }

    zakaziCas = (req: express.Request, res: express.Response) => {

        let nastavnik = req.body.nastavnik;
        let ucenik = req.body.ucenik;
        let predmet = req.body.predmet;
        let datum = new Date(req.body.datum);
        let opis = req.body.opis;
        let dupli_cas = req.body.dupli_cas;

        let datumStr = req.body.datum
        datumStr = datumStr.substring(0, 10)

        let noviDatum = new Date(datumStr)
        let satiPocetak = datum.getHours()
        let satiKraj;
        let minutiPocetak = datum.getMinutes()
        let minutiKraj;

        let datumEnd = new Date(datum)

        if (dupli_cas == 1) {
            datumEnd.setMinutes(datumEnd.getMinutes() + 120)
        }
        else {
            datumEnd.setMinutes(datumEnd.getMinutes() + 60)
        }
        satiKraj = datumEnd.getHours()
        minutiKraj = datumEnd.getMinutes()

        let pocetakSati = satiPocetak < 10 ? '0' + satiPocetak: satiPocetak;
        let pocetakMinuti = minutiPocetak < 10 ? '0' + minutiPocetak: minutiPocetak;
        let krajSati = satiKraj < 10 ? '0' + satiKraj: satiKraj;
        let krajMinuti = minutiKraj < 10 ? '0' + minutiKraj: minutiKraj;

        let pocetak = pocetakSati + ":" + pocetakMinuti
        let kraj = krajSati + ":" + krajMinuti

        cas.find({nastavnik: nastavnik, datum: { $gte: datum, $lte: datumEnd } }).then((c) => {
            if (c.length != 0) {
                
                res.json({ message: "Nastavnik zauzet zbog drugog časa" })
                console.log(c)
            }
            else {
                
                radno_vreme.find({korisnicko_ime: nastavnik, neradan: 1, datum: noviDatum}).then((r)=>{

                    if(r.length != 0){
                        res.json({message: "Nastavnik ne radi tog dana"})
                    }
                    else{

                        radno_vreme.find({korisnicko_ime: nastavnik, datum: noviDatum, $and: [{vremeOd: {$gte: pocetak}}, {vremeDo: {$lte: kraj}}]}).then((r2)=>{
                            if(r2.length != 0){
                                res.json({message: "Nastavnik ne radi u tom periodu"})
                            }
                            else{
                                let cas_insert = {
                                    _id: new mongoose.Types.ObjectId(),
                                    nastavnik: nastavnik,
                                    ucenik: ucenik,
                                    predmet: predmet,
                                    datum: datum,
                                    opis: opis,
                                    status: "Z",
                                    dupli_cas: dupli_cas
                                }
                                new cas(cas_insert).save().then(ok => {
                                    res.json({ message: "Uspešno zakazan čas" })
                                }).catch((err2) => {
                                    console.log(err2)
                                })
                            }
                        })

                    }

                })



            }
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiCasoveNastavnika = (req: express.Request, res: express.Response) => {

        let nastavnik = req.query.nastavnik;
        cas.find({ nastavnik: nastavnik, status: {$ne: "O"} }).then((c) => {
            res.json(c)
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiArhivuCasovaUcenika = async (req: express.Request, res: express.Response) => {

        let ucenik = req.query.ucenik;
        let danas = new Date();
        try {
            let data = await cas.aggregate([
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
            ])

            res.json(data)
        } catch (err) {
            console.log(err)
        }

    }

    oceniNastavnika = async (req: express.Request, res: express.Response) => {
        
        let id = req.body._id
        let cas1 = req.body

        let nastavnik1 = cas1.nastavnik
        let ocena = cas1.ocenaUcenik

        cas.updateOne({_id: id}, {$set: cas1}).then((u: any)=>{

            if(u){
                nastavnik.updateOne({korisnicko_ime: nastavnik1}, {$push:{ocene: ocena}}).then(n=>{
                    res.json({message: "Komentar i ocena uneti"})    
                })
                
            }
            else{
                res.json({message: "Komentar i ocena nisu uneti"})
                return
            }
        }).catch((err: any) => {
            console.log(err)
        })
        
    }

    dohvatiBuduceCasoveUcenika = async (req: express.Request, res: express.Response) => {
        
        let ucenik = req.query.ucenik;
        let danas = new Date();
        
        try {
            let data = await cas.aggregate([
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
            ])
            console.log(data)
            res.json(data)
        } catch (err) {
            console.log(err)
        }



    }

    promeniProfilnuSliku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let slika = req.file;
        let slikaFilename = slika?.filename;
        
        ucenik.updateOne({korisnicko_ime: korisnickoIme},{$set: {profilna_slika:slikaFilename}}).then((u)=>{
            res.json({message:"Uspešna promena slike"})
        }).catch((err)=>{
            res.json({message:"Neuspešna promena slike"})
        })
    }

    dohvatiKomentareNastavnika = async (req: express.Request, res: express.Response) => {
        
        let nastavnik = req.query.nastavnik;

        try {
            let data = await cas.aggregate([
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
            ])
            
            res.json(data)
        } catch (err) {
            console.log(err)
        }

    }

    dohvatiRadnoVreme = (req: express.Request, res: express.Response) => {

        let nastavnik = req.query.nastavnik
        radno_vreme.find({korisnicko_ime: nastavnik}).then((r)=>{
            res.json(r)
        }).catch((err)=>{
            console.log(err)
        })

    }

    dohvatiObavestenja = async (req: express.Request, res: express.Response) => {

        let ucenik = req.query.ucenik

        try {
            let data = await obavestenje.aggregate([
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
            ])

            res.json(data)
        } catch (err) {
            console.log(err)
        }
    }

    oznaciKaoProcitano = (req: express.Request, res: express.Response) => {

        let id = req.query.id;

        obavestenje.updateOne({_id: id}, {$set: {procitano: 1}}).then((o)=>{
            res.json({message: "Uspešno"})
        }).catch((err)=>{
            console.log(err)
        })

    }

}