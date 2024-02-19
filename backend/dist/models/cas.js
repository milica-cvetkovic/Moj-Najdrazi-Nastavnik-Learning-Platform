"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const casSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    nastavnik: String,
    ucenik: String,
    predmet: String,
    datum: Date,
    opis: String,
    dupli_cas: Number,
    status: String,
    komentarUcenik: String,
    ocenaUcenik: Number,
    obrazlozenje: String,
    komentarNastavnik: String,
    ocenaNastavnik: Number,
    obavesti: Number,
}, { versionKey: false });
exports.default = mongoose_1.default.model('CasModel', casSchema, 'casovi');
