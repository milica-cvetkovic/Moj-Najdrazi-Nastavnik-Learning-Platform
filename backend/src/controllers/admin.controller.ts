import express from 'express'
import nastavnik from '../models/nastavnik'
import ucenik from '../models/ucenik'
import predmet from '../models/predmet'
import cas from '../models/cas'

const path = require('path');
const fs = require('fs');
const util = require('util');

export class AdminController {

    dohvatiNastavnikePredmete = (req: express.Request, res: express.Response) => {

        nastavnik.find({odobren: 1}).then((n) => {
            if (n) {
                res.json(n)
            }
        }).catch((err) => {
            console.log(err)
        })


    }

    dohvatiSveUcenike = (req: express.Request, res: express.Response) => {

        ucenik.find({}).then((u) => {
            if (u) {
                res.json(u)
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiSveNastavnike = (req: express.Request, res: express.Response) => {

        nastavnik.find().then((n) => {
            if (n) {
                res.json(n)
            }
        }).catch((err) => {
            console.log(err)
        })


    }

    deaktiviraj = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime

        nastavnik.updateOne({korisnicko_ime: korisnicko_ime}, {$set: {odobren: 0, deaktiviran: 1}}).then((n)=>{
            if(n){
                res.json({message:"Uspešno deaktiviran nastavnik"})
            }
            else{
                res.json({message: "Neuspešna deaktivacija"})
            }
        }).catch((err)=>{
            console.log(err)
        })

    }

    zahtevi = (req: express.Request, res: express.Response) => {

        
        nastavnik.find({odobren: 0, deaktiviran: 0}).then((n)=>{
            res.json(n)
        }).catch((err)=>{
            console.log(err)
        })

    }

    odobren = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime
        let odobren = req.query.odobren

        nastavnik.updateOne({korisnicko_ime: korisnicko_ime}, {$set: {odobren: odobren}}).then((n)=>{
            if(n){
                res.json({message:"Uspešna promena"})
            }
            else{
                res.json({message: "Neuspešna promena"})
            }
        }).catch((err)=>{
            console.log(err)
        })

    }

    odbijen = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.query.korisnicko_ime
        let odobren = req.query.odobren

        nastavnik.updateOne({korisnicko_ime: korisnicko_ime}, {$set: {odobren: odobren, deaktiviran: 1}}).then((n)=>{
            if(n){
                res.json({message:"Uspešna promena"})
            }
            else{
                res.json({message: "Neuspešna promena"})
            }
        }).catch((err)=>{
            console.log(err)
        })

    }

    dohvatiSvePredmete  = (req: express.Request, res: express.Response) => {

        predmet.find({}).then((p)=>{
            res.json(p)
        }).catch((err)=>{
            console.log(err)
        })

    }

    unesiPredmet  = (req: express.Request, res: express.Response) => {

        let naziv = req.query.naziv

        let insert = {
            naziv: naziv
        }

        new predmet(insert).save().then(ok=>{
            res.json({message:"Uspešno dodat predmet"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    dohvatiCasoveProslaGodina = (req: express.Request, res: express.Response) => {

        let start = new Date('2023-01-01'); 
        let end = new Date('2023-12-31T23:59:59.999');

        cas.find({datum: {$gte: start, $lt: end}}).then((d)=>{
            res.json(d)
        }).catch((err)=>{
            console.log(err)
        })

    }

    dohvatiCV = (req: express.Request, res: express.Response) => {

        let cv = req.query.cv

        let cvPath = path.join(__dirname, '../..', 'src', 'uploads', cv)

         fs.readFile(cvPath, (err: any, data: any)=>{
             if(err){
                 console.log(err)
                 res.status(500).send("Greška")
             }
             else{
                 console.log(data)
                 res.writeHead(200, {'Content-Type':'application/pdf'});
                 res.end(data)
             }
         })


    }


}