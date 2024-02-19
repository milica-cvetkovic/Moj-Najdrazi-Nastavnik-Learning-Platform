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
const student_controller_1 = require("../controllers/student.controller");
const studentRouter = express_1.default.Router();
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
studentRouter.route("/dohvatiProfil").get((req, res) => new student_controller_1.StudentController().dohvatiProfil(req, res));
studentRouter.route("/dohvatiProfilnuSliku").get((req, res) => new student_controller_1.StudentController().dohvatiProfilnuSliku(req, res));
studentRouter.route("/promeniIme").get((req, res) => new student_controller_1.StudentController().promeniIme(req, res));
studentRouter.route("/promeniPrezime").get((req, res) => new student_controller_1.StudentController().promeniPrezime(req, res));
studentRouter.route("/promeniAdresu").get((req, res) => new student_controller_1.StudentController().promeniAdresu(req, res));
studentRouter.route("/promeniEmail").get((req, res) => new student_controller_1.StudentController().promeniEmail(req, res));
studentRouter.route("/promeniKontaktTelefon").get((req, res) => new student_controller_1.StudentController().promeniKontaktTelefon(req, res));
studentRouter.route("/promeniTipSkole").get((req, res) => new student_controller_1.StudentController().promeniTipSkole(req, res));
studentRouter.route("/promeniTrenutniRazred").get((req, res) => new student_controller_1.StudentController().promeniTrenutniRazred(req, res));
studentRouter.route("/dohvatiNastavnike").get((req, res) => new student_controller_1.StudentController().dohvatiNastavnike(req, res));
studentRouter.route("/zakaziCas").post((req, res) => new student_controller_1.StudentController().zakaziCas(req, res));
studentRouter.route("/dohvatiCasoveNastavnika").get((req, res) => new student_controller_1.StudentController().dohvatiCasoveNastavnika(req, res));
studentRouter.route("/dohvatiArhivuCasovaUcenika").get((req, res) => __awaiter(void 0, void 0, void 0, function* () { return new student_controller_1.StudentController().dohvatiArhivuCasovaUcenika(req, res); }));
studentRouter.route("/oceniNastavnika").post((req, res) => new student_controller_1.StudentController().oceniNastavnika(req, res));
studentRouter.route("/dohvatiBuduceCasoveUcenika").get((req, res) => new student_controller_1.StudentController().dohvatiBuduceCasoveUcenika(req, res));
studentRouter.route("/promeniProfilnuSliku").post(upload.single('profilna_slika'), (req, res) => new student_controller_1.StudentController().promeniProfilnuSliku(req, res));
studentRouter.route("/dohvatiKomentareNastavnika").get((req, res) => __awaiter(void 0, void 0, void 0, function* () { return new student_controller_1.StudentController().dohvatiKomentareNastavnika(req, res); }));
studentRouter.route("/dohvatiRadnoVreme").get((req, res) => new student_controller_1.StudentController().dohvatiRadnoVreme(req, res));
studentRouter.route("/dohvatiObavestenja").get((req, res) => __awaiter(void 0, void 0, void 0, function* () { return new student_controller_1.StudentController().dohvatiObavestenja(req, res); }));
studentRouter.route("/oznaciKaoProcitano").get((req, res) => new student_controller_1.StudentController().oznaciKaoProcitano(req, res));
exports.default = studentRouter;
