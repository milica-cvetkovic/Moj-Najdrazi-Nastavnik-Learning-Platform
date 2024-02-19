import express from 'express'
import { TeacherController } from '../controllers/teacher.controller';

const teacherRouter = express.Router()

const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: any) => void) => {
    const uploadPath = path.join(__dirname, '../../src/uploads/');
    cb(null, uploadPath);
  },
  filename: (req: {
    headers: any; body: { korisnickoIme: any; }; 
}, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
    const slikaNaziv = req.headers['customname'] || file.originalname;
    cb(null, slikaNaziv)
  },
});

const upload = multer({ storage: storage });
teacherRouter.route("/dohvatiProfil").get(
    (req,res)=>new TeacherController().dohvatiProfil(req, res)
)

teacherRouter.route("/dohvatiProfilnuSliku").get(
    (req, res) => new TeacherController().dohvatiProfilnuSliku(req, res)
)

teacherRouter.route("/promeniIme").get(
    (req, res) => new TeacherController().promeniIme(req, res)
)

teacherRouter.route("/promeniPrezime").get(
    (req, res) => new TeacherController().promeniPrezime(req, res)
)

teacherRouter.route("/promeniAdresu").get(
    (req, res) => new TeacherController().promeniAdresu(req, res)
)

teacherRouter.route("/promeniEmail").get(
    (req, res) => new TeacherController().promeniEmail(req, res)
)

teacherRouter.route("/promeniKontaktTelefon").get(
    (req, res) => new TeacherController().promeniKontaktTelefon(req, res)
)

teacherRouter.route("/dodajPredmet").get(
    (req, res) => new TeacherController().dodajPredmet(req, res)
)

teacherRouter.route("/obrisiPredmet").get(
    (req, res) => new TeacherController().obrisiPredmet(req, res)
)

teacherRouter.route("/dodajUzrast").get(
    (req, res) => new TeacherController().dodajUzrast(req, res)
)

teacherRouter.route("/dohvatiCasove").get(
    (req, res) => new TeacherController().dohvatiCasove(req, res)
)

teacherRouter.route("/otkaziCas").post(
    (req, res) => new TeacherController().otkaziCas(req, res)
)

teacherRouter.route("/dohvatiZahteve").get(
    async (req, res) => new TeacherController().dohvatiZahteve(req, res)
)

teacherRouter.route("/potvrdiCas").post(
    (req, res) => new TeacherController().potvrdiCas(req, res)
)

teacherRouter.route("/promeniRadno").post(
    (req, res) => new TeacherController().promeniRadno(req, res)
)

teacherRouter.route("/promeniNeradno").post(
    (req, res) => new TeacherController().promeniNeradno(req, res)
)

teacherRouter.route("/dohvatiSveCasove").get(
    (req, res) => new TeacherController().dohvatiSveCasove(req, res)
)

teacherRouter.route("/oceniUcenika").post(
    (req, res) => new TeacherController().oceniUcenika(req, res)
)

teacherRouter.route("/promeniProfilnuSliku").post(upload.single('profilna_slika'),
(req, res) => new TeacherController().promeniProfilnuSliku(req, res)
)

teacherRouter.route("/obrisiUzrast").get(
    (req, res) => new TeacherController().obrisiUzrast(req, res)
)

teacherRouter.route("/dohvatiCasoveNedelja").get(
    (req, res) => new TeacherController().dohvatiCasoveNedelja(req, res)
)

export default teacherRouter;