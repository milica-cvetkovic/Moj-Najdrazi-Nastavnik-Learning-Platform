import express from 'express'
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router()

adminRouter.route("/dohvatiNastavnikePredmete").get(
    (req,res)=>new AdminController().dohvatiNastavnikePredmete(req, res)
)

adminRouter.route("/dohvatiSveUcenike").get(
    (req,res)=>new AdminController().dohvatiSveUcenike(req, res)
)

adminRouter.route("/dohvatiSveNastavnike").get(
    (req,res)=>new AdminController().dohvatiSveNastavnike(req, res)
)

adminRouter.route("/deaktiviraj").get(
    (req,res)=>new AdminController().deaktiviraj(req, res)
)

adminRouter.route("/zahtevi").get(
    (req,res)=>new AdminController().zahtevi(req, res)
)

adminRouter.route("/odobren").get(
    (req,res)=>new AdminController().odobren(req, res)
)

adminRouter.route("/dohvatiSvePredmete").get(
    (req,res)=>new AdminController().dohvatiSvePredmete(req, res)
)

adminRouter.route("/unesiPredmet").get(
    (req,res)=>new AdminController().unesiPredmet(req, res)
)

adminRouter.route("/dohvatiCasoveProslaGodina").get(
    (req,res)=>new AdminController().dohvatiCasoveProslaGodina(req, res)
)

adminRouter.route("/dohvatiCV").get(
    (req,res)=>new AdminController().dohvatiCV(req, res)
)

adminRouter.route("/odbijen").get(
    (req,res)=>new AdminController().odbijen(req, res)
)

export default adminRouter;