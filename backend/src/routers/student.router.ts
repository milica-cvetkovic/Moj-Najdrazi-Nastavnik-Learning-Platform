import express from 'express'
import { StudentController } from '../controllers/student.controller';

const studentRouter = express.Router()

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

studentRouter.route("/dohvatiProfil").get(
    (req,res)=>new StudentController().dohvatiProfil(req, res)
)

studentRouter.route("/dohvatiProfilnuSliku").get(
    (req, res) => new StudentController().dohvatiProfilnuSliku(req, res)
)

studentRouter.route("/promeniIme").get(
    (req, res) => new StudentController().promeniIme(req, res)
)

studentRouter.route("/promeniPrezime").get(
    (req, res) => new StudentController().promeniPrezime(req, res)
)

studentRouter.route("/promeniAdresu").get(
    (req, res) => new StudentController().promeniAdresu(req, res)
)

studentRouter.route("/promeniEmail").get(
    (req, res) => new StudentController().promeniEmail(req, res)
)

studentRouter.route("/promeniKontaktTelefon").get(
    (req, res) => new StudentController().promeniKontaktTelefon(req, res)
)

studentRouter.route("/promeniTipSkole").get(
    (req, res) => new StudentController().promeniTipSkole(req, res)
)

studentRouter.route("/promeniTrenutniRazred").get(
    (req, res) => new StudentController().promeniTrenutniRazred(req, res)
)

studentRouter.route("/dohvatiNastavnike").get(
    (req, res) => new StudentController().dohvatiNastavnike(req, res)
)

studentRouter.route("/zakaziCas").post(
    (req, res) => new StudentController().zakaziCas(req, res)
)

studentRouter.route("/dohvatiCasoveNastavnika").get(
    (req, res) => new StudentController().dohvatiCasoveNastavnika(req, res)
)

studentRouter.route("/dohvatiArhivuCasovaUcenika").get(
    async(req, res) => new StudentController().dohvatiArhivuCasovaUcenika(req, res)
)

studentRouter.route("/oceniNastavnika").post(
    (req, res) => new StudentController().oceniNastavnika(req, res)
)

studentRouter.route("/dohvatiBuduceCasoveUcenika").get(
    (req, res) => new StudentController().dohvatiBuduceCasoveUcenika(req, res)
)

studentRouter.route("/promeniProfilnuSliku").post(upload.single('profilna_slika'),
(req, res) => new StudentController().promeniProfilnuSliku(req, res)
)

studentRouter.route("/dohvatiKomentareNastavnika").get(
    async (req, res) => new StudentController().dohvatiKomentareNastavnika(req, res)
)

studentRouter.route("/dohvatiRadnoVreme").get(
    (req, res) => new StudentController().dohvatiRadnoVreme(req, res)
)

studentRouter.route("/dohvatiObavestenja").get(
    async (req, res) => new StudentController().dohvatiObavestenja(req, res)
)

studentRouter.route("/oznaciKaoProcitano").get(
    (req, res) => new StudentController().oznaciKaoProcitano(req, res)
)

export default studentRouter;