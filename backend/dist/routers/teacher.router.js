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
const teacher_controller_1 = require("../controllers/teacher.controller");
const teacherRouter = express_1.default.Router();
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
teacherRouter.route("/dohvatiProfil").get((req, res) => new teacher_controller_1.TeacherController().dohvatiProfil(req, res));
teacherRouter.route("/dohvatiProfilnuSliku").get((req, res) => new teacher_controller_1.TeacherController().dohvatiProfilnuSliku(req, res));
teacherRouter.route("/promeniIme").get((req, res) => new teacher_controller_1.TeacherController().promeniIme(req, res));
teacherRouter.route("/promeniPrezime").get((req, res) => new teacher_controller_1.TeacherController().promeniPrezime(req, res));
teacherRouter.route("/promeniAdresu").get((req, res) => new teacher_controller_1.TeacherController().promeniAdresu(req, res));
teacherRouter.route("/promeniEmail").get((req, res) => new teacher_controller_1.TeacherController().promeniEmail(req, res));
teacherRouter.route("/promeniKontaktTelefon").get((req, res) => new teacher_controller_1.TeacherController().promeniKontaktTelefon(req, res));
teacherRouter.route("/dodajPredmet").get((req, res) => new teacher_controller_1.TeacherController().dodajPredmet(req, res));
teacherRouter.route("/obrisiPredmet").get((req, res) => new teacher_controller_1.TeacherController().obrisiPredmet(req, res));
teacherRouter.route("/dodajUzrast").get((req, res) => new teacher_controller_1.TeacherController().dodajUzrast(req, res));
teacherRouter.route("/dohvatiCasove").get((req, res) => new teacher_controller_1.TeacherController().dohvatiCasove(req, res));
teacherRouter.route("/otkaziCas").post((req, res) => new teacher_controller_1.TeacherController().otkaziCas(req, res));
teacherRouter.route("/dohvatiZahteve").get((req, res) => __awaiter(void 0, void 0, void 0, function* () { return new teacher_controller_1.TeacherController().dohvatiZahteve(req, res); }));
teacherRouter.route("/potvrdiCas").post((req, res) => new teacher_controller_1.TeacherController().potvrdiCas(req, res));
teacherRouter.route("/promeniRadno").post((req, res) => new teacher_controller_1.TeacherController().promeniRadno(req, res));
teacherRouter.route("/promeniNeradno").post((req, res) => new teacher_controller_1.TeacherController().promeniNeradno(req, res));
teacherRouter.route("/dohvatiSveCasove").get((req, res) => new teacher_controller_1.TeacherController().dohvatiSveCasove(req, res));
teacherRouter.route("/oceniUcenika").post((req, res) => new teacher_controller_1.TeacherController().oceniUcenika(req, res));
teacherRouter.route("/promeniProfilnuSliku").post(upload.single('profilna_slika'), (req, res) => new teacher_controller_1.TeacherController().promeniProfilnuSliku(req, res));
teacherRouter.route("/obrisiUzrast").get((req, res) => new teacher_controller_1.TeacherController().obrisiUzrast(req, res));
teacherRouter.route("/dohvatiCasoveNedelja").get((req, res) => new teacher_controller_1.TeacherController().dohvatiCasoveNedelja(req, res));
exports.default = teacherRouter;
