import express from 'express'
import { LoginRegistrationController } from '../controllers/login-registration.controller'

const loginRegistrationRouter = express.Router()

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

loginRegistrationRouter.route("/bezbedonosnaPitanja").get(
    (req,res)=>new LoginRegistrationController().bezbedonosnaPitanja(req, res)
)

loginRegistrationRouter.route("/login").get(
    (req, res)=>new LoginRegistrationController().login(req, res)
)

loginRegistrationRouter.route("/registerUcenik").post(
    async (req, res) => new LoginRegistrationController().registerUcenik(req, res)
)

loginRegistrationRouter.route("/registerNastavnik").post(
    (req, res) => new LoginRegistrationController().registerNastavnik(req, res)
)

loginRegistrationRouter.route("/registerProfilnaSlika").post(upload.single('profilna_slika'),
  (req, res) => new LoginRegistrationController().registerProfilnaSlika(req, res)
)

loginRegistrationRouter.route("/dohvatiBrojUcenika").get(
  (req, res) => new LoginRegistrationController().dohvatiBrojUcenika(req, res)
)

loginRegistrationRouter.route("/dohvatiBrojNastavnika").get(
  (req, res) => new LoginRegistrationController().dohvatiBrojNastavnika(req, res)
)

loginRegistrationRouter.route("/dohvatiSedam").get(
  (req, res) => new LoginRegistrationController().dohvatiSedam(req, res)
)

loginRegistrationRouter.route("/dohvatiMesec").get(
  (req, res) => new LoginRegistrationController().dohvatiMesec(req, res)
)

loginRegistrationRouter.route("/dohvatiNastavnike").get(
  (req, res) => new LoginRegistrationController().dohvatiNastavnike(req, res)
)

loginRegistrationRouter.route("/dohvatiPredmete").get(
  (req, res) => new LoginRegistrationController().dohvatiPredmete(req, res)
)

loginRegistrationRouter.route("/registerCV").post(upload.single('cv'),
  (req, res) => new LoginRegistrationController().registerCV(req, res)
)

loginRegistrationRouter.route("/promeniLozinku").get(
  (req, res) => new LoginRegistrationController().promeniLozinku(req, res)
)

loginRegistrationRouter.route("/loginAdmin").get(
  (req, res)=>new LoginRegistrationController().loginAdmin(req, res)
)

loginRegistrationRouter.route("/dohvatiBezbedonosnoPitanje").get(
  (req, res)=>new LoginRegistrationController().dohvatiBezbedonosnoPitanje(req, res)
)

loginRegistrationRouter.route("/proveriOdgovor").get(
  (req, res)=>new LoginRegistrationController().proveriOdgovor(req, res)
)

loginRegistrationRouter.route("/zaboravljenaLozinka").get(
  (req, res)=>new LoginRegistrationController().zaboravljenaLozinka(req, res)
)

loginRegistrationRouter.route("/registerProfilnaSlikaDefault").get(
  (req, res) => new LoginRegistrationController().registerProfilnaSlikaDefault(req, res)
)

loginRegistrationRouter.route("/promeniLozinkuAdmin").get(
  (req, res) => new LoginRegistrationController().promeniLozinkuAdmin(req, res)
)

export default loginRegistrationRouter;