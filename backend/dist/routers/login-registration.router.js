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
const express_1 = __importDefault(require("express"));
const login_registration_controller_1 = require("../controllers/login-registration.controller");
const loginRegistrationRouter = express_1.default.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../src/uploads/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const slikaNaziv = req.headers['customname'] || file.originalname;
        cb(null, slikaNaziv);
    },
});
const upload = multer({ storage: storage });
loginRegistrationRouter.route("/bezbedonosnaPitanja").get((req, res) => new login_registration_controller_1.LoginRegistrationController().bezbedonosnaPitanja(req, res));
loginRegistrationRouter.route("/login").get((req, res) => new login_registration_controller_1.LoginRegistrationController().login(req, res));
loginRegistrationRouter.route("/registerUcenik").post((req, res) => __awaiter(void 0, void 0, void 0, function* () { return new login_registration_controller_1.LoginRegistrationController().registerUcenik(req, res); }));
loginRegistrationRouter.route("/registerNastavnik").post((req, res) => new login_registration_controller_1.LoginRegistrationController().registerNastavnik(req, res));
loginRegistrationRouter.route("/registerProfilnaSlika").post(upload.single('profilna_slika'), (req, res) => new login_registration_controller_1.LoginRegistrationController().registerProfilnaSlika(req, res));
loginRegistrationRouter.route("/dohvatiBrojUcenika").get((req, res) => new login_registration_controller_1.LoginRegistrationController().dohvatiBrojUcenika(req, res));
loginRegistrationRouter.route("/dohvatiBrojNastavnika").get((req, res) => new login_registration_controller_1.LoginRegistrationController().dohvatiBrojNastavnika(req, res));
loginRegistrationRouter.route("/dohvatiSedam").get((req, res) => new login_registration_controller_1.LoginRegistrationController().dohvatiSedam(req, res));
loginRegistrationRouter.route("/dohvatiMesec").get((req, res) => new login_registration_controller_1.LoginRegistrationController().dohvatiMesec(req, res));
loginRegistrationRouter.route("/dohvatiNastavnike").get((req, res) => new login_registration_controller_1.LoginRegistrationController().dohvatiNastavnike(req, res));
loginRegistrationRouter.route("/dohvatiPredmete").get((req, res) => new login_registration_controller_1.LoginRegistrationController().dohvatiPredmete(req, res));
loginRegistrationRouter.route("/registerCV").post(upload.single('cv'), (req, res) => new login_registration_controller_1.LoginRegistrationController().registerCV(req, res));
loginRegistrationRouter.route("/promeniLozinku").get((req, res) => new login_registration_controller_1.LoginRegistrationController().promeniLozinku(req, res));
loginRegistrationRouter.route("/loginAdmin").get((req, res) => new login_registration_controller_1.LoginRegistrationController().loginAdmin(req, res));
loginRegistrationRouter.route("/dohvatiBezbedonosnoPitanje").get((req, res) => new login_registration_controller_1.LoginRegistrationController().dohvatiBezbedonosnoPitanje(req, res));
loginRegistrationRouter.route("/proveriOdgovor").get((req, res) => new login_registration_controller_1.LoginRegistrationController().proveriOdgovor(req, res));
loginRegistrationRouter.route("/zaboravljenaLozinka").get((req, res) => new login_registration_controller_1.LoginRegistrationController().zaboravljenaLozinka(req, res));
loginRegistrationRouter.route("/registerProfilnaSlikaDefault").get((req, res) => new login_registration_controller_1.LoginRegistrationController().registerProfilnaSlikaDefault(req, res));
loginRegistrationRouter.route("/promeniLozinkuAdmin").get((req, res) => new login_registration_controller_1.LoginRegistrationController().promeniLozinkuAdmin(req, res));
exports.default = loginRegistrationRouter;
