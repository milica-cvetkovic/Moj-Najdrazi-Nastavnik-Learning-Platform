import express from 'express'
import ucenik from '../models/ucenik'
import nastavnik from '../models/nastavnik';
import cas from '../models/cas';
import { mongo } from 'mongoose';
import radno_vreme from '../models/radno_vreme';
import obavestenje from '../models/obavestenje';
import predmet from '../models/predmet';

const path = require('path');
const fs = require('fs');
const util = require('util');

export class TeacherController {

    dohvatiProfil = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.query.korisnickoIme;
        nastavnik.findOne({ korisnicko_ime: korisnickoIme }).then((u) => {
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
                console.log(err)
                res.status(500).send("Greška")
            }
            else{
                console.log(data)
                res.writeHead(200, {'Content-Type':'image/jpg'});
                res.end(data)
            }
        })

    }

    promeniIme = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let ime = req.query.ime;

        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { ime: ime } }).then((u) => {
            res.json({ message: "Uspešno promenjeno ime" })
        }).catch((err) => {
            res.json({ message: "Ime nije promenjeno" })
        })

    }

    promeniPrezime = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let prezime = req.query.prezime;

        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { prezime: prezime } }).then((u) => {
            res.json({ message: "Uspešno promenjeno prezime" })
        }).catch((err) => {
            res.json({ message: "Prezime nije promenjeno" })
        })

    }

    promeniAdresu = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let adresa = req.query.adresa;

        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { adresa: adresa } }).then((u) => {
            res.json({ message: "Uspešno promenjena adresa" })
        }).catch((err) => {
            res.json({ message: "Adresa nije promenjena" })
        })

    }

    promeniEmail = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let email = req.query.email;

        nastavnik.findOne({ email: email }).then((u) => {

            if (u) {
                res.json({ message: "Email već koristi drugi korisnik" })
            }
            else {
                ucenik.findOne({email: email}).then((u1)=>{
                    if(u1){
                        res.json({ message: "Email već koristi drugi korisnik" })
                    }
                    else{
                        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { email: email } }).then((u1) => {
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
        
        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $set: { kontakt_telefon: kontakt_telefon } }).then((u) => {
            res.json({ message: "Uspešno promenjen kontakt telefon" })
        }).catch((err) => {
            res.json({ message: "Kontakt telefon nije promenjen" })
        })

    }

    dodajPredmet = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let predmet1 = req.query.predmet;

        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $push: { predmeti: predmet1 } }).then((u) => {
           
            if(u){
                let insert = {
                    naziv: predmet1
                }
                new predmet(insert).save()
                res.json({ message: "Uspešno dodat predmet" })
            }
            
        }).catch((err) => {
            res.json({ message: "Predmet nije dodat" })
        })

    }

    obrisiPredmet  = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let predmet = req.query.predmet;

        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $pull: { predmeti: predmet } }).then((u) => {
            res.json({ message: "Uspešno obrisan predmet" })
        }).catch((err) => {
            res.json({ message: "Predmet nije obrisan" })
        })

    }

    dodajUzrast = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime;
        let uzrast = req.query.uzrast;

        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $push: { uzrast: uzrast } }).then((u) => {
            res.json({ message: "Uspešno dodat uzrast" })
        }).catch((err) => {
            res.json({ message: "Uzrast nije dodat" })
        })

    }

    dohvatiCasove = async (req: express.Request, res: express.Response) => {

        let nastavnik = req.query.nastavnik;
        let datum = new Date()
        let datum3 = new Date()
        datum3.setDate(datum3.getDate() + 3)

        try {
            let data = await cas.aggregate([
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
            ])

            res.json(data)
        } catch (err) {
            console.log(err)
        }

    }

    otkaziCas = (req: express.Request, res: express.Response) => {

        let cas1 = req.body;
        let id = req.query.id;

        const mongoose = require('mongoose')
        const objectId = new mongoose.Types.ObjectId(id)

        cas.updateOne({_id: id}, {$set: cas1}).then((u)=>{
            if(u){
               
                let insert = {
                    datum: cas1.datum,
                    nastavnik: cas1.nastavnik,
                    ucenik: cas1.ucenik,
                    status: "O",
                    predmet: cas1.predmet,
                    procitano: 0,
                }
                new obavestenje(insert).save()
                res.json({message: "Uspešno otkazan čas"})
            }
            else{
                res.json({message: "Čas nije otkazan"})
            }
        })
            

    }

    dohvatiZahteve = async (req: express.Request, res: express.Response) => {

        let nastavnik = req.query.nastavnik;

        try {
            let data = await cas.aggregate([
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
            ])
            
            res.json(data)
        } catch (err) {
            console.log(err)
        }

    }

    potvrdiCas = (req: express.Request, res: express.Response) => {

        let id = req.query.id
        let cas1 = req.body;

        cas.updateOne({ _id: id }, { status:"P"}).then((c) => {
            let insert = {
                datum: cas1.datum,
                nastavnik: cas1.nastavnik,
                ucenik: cas1.ucenik,
                status: "P",
                predmet: cas1.predmet,
                procitano: 0,
            }
            new obavestenje(insert).save()
            res.json({ message: "Uspešno potvrđen cas" })
        }).catch((err) => {
            res.json({ message: "Cas nije potvrđen" })
        })

    }

    promeniRadno = (req: express.Request, res: express.Response) => {

        let datum = req.body.datum;
        let vremeOd = req.body.vremeOd;
        let vremeDo = req.body.vremeDo;
        let neradan = req.body.neradan;

        let korisnicko_ime = req.query.korisnicko_ime;

        let datumStart = new Date(datum)
        datumStart.setHours(0,0,0,0)

        let datumEnd = new Date(datum)
        datumEnd.setHours(23,59, 59, 999)

        let insert = {
            datum: datumStart,
            vremeOd: vremeOd,
            vremeDo: vremeDo,
            neradan: neradan,
            korisnicko_ime: korisnicko_ime
        }

        cas.find({nastavnik:korisnicko_ime, datum: {$gte: datumStart, $lte: datumEnd}}).then((c)=>{
            
            if(c.length != 0){
                res.json({message:"Neuspešno - imate časove tog dana"})
            }
            else{
                new radno_vreme(insert).save().then(ok=>{
                    res.json({message:"Uspešna promena radnog vremena"})
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })


    }

    promeniNeradno = (req: express.Request, res: express.Response) => {

        let datum = req.body.datum;
        let neradan = req.body.neradan;

        let korisnicko_ime = req.query.korisnicko_ime;

        datum = new Date(datum)

        let datumStart = new Date(datum)
        datumStart.setHours(0,0,0,0)

        let datumEnd = new Date(datum)
        datumEnd.setHours(23,59, 59, 999)


        let insert = {
            datum: datum,
            neradan: neradan,
            korisnicko_ime: korisnicko_ime
        }

        cas.find({nastavnik:korisnicko_ime, datum: {$gte: datumStart, $lte: datumEnd}}).then((c)=>{
            if(c.length != 0){
                res.json({message:"Neuspešno - imate časove tog dana"})
            }
            else{
                new radno_vreme(insert).save().then(ok=>{
                    res.json({message:"Uspešna promena neradnog vremena"})
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })

    }

    dohvatiSveCasove = async (req: express.Request, res: express.Response) => {

        let nastavnik = req.query.nastavnik;
        let datum = new Date()

        try {
            let data = await cas.aggregate([
                {
                    $match: {
                        nastavnik: nastavnik,
                        status: "P",
                        datum: {$lt: datum}
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

    oceniUcenika = (req: express.Request, res: express.Response) => {

        let id = req.query.id
        let cas1 = req.body

        cas.updateOne({_id: id}, {$set: cas1}).then((u)=>{
            if(u){
                ucenik.updateOne({korisnicko_ime: cas1.ucenik}, {$push: {ocene: cas1.ocenaNastavnik}}).then((u1)=>{
                  
                    res.json({message: "Uspešno unet komentar i ocena"})
                })
               
            }
            else{
                res.json({message: "Komentar i ocena nisu uneti"})
            }
        })
            
        
    }

    promeniProfilnuSliku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let slika = req.file;
        let slikaFilename = slika?.filename;
        
        nastavnik.updateOne({korisnicko_ime: korisnickoIme},{$set: {profilna_slika:slikaFilename}}).then((u)=>{
            res.json({message:"Uspešna promena slike"})
        }).catch((err)=>{
            res.json({message:"Neuspešna promena slike"})
        })
    }

    obrisiUzrast= (req: express.Request, res: express.Response) => {
     
        let korisnicko_ime = req.query.korisnicko_ime;
        let uzrast = req.query.uzrast;

        nastavnik.updateOne({ korisnicko_ime: korisnicko_ime }, { $pull: { uzrast: uzrast } }).then((u) => {
            res.json({ message: "Uspešno obrisan uzrast" })
            
        }).catch((err) => {
            res.json({ message: "Uzrast nije obrisan" })
        })

    }

    dohvatiCasoveNedelja = async (req: express.Request, res: express.Response) => {

        let nastavnik = req.query.nastavnik;
        let datum = new Date()

        try {
            let data = await cas.aggregate([
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
            ])
            
            res.json(data)
        } catch (err) {
            console.log(err)
        }

    }


}