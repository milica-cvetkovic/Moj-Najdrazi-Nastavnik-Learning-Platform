"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const radnoVremeSchema = new mongoose_1.default.Schema({
    datum: Date,
    vremeOd: String,
    vremeDo: String,
    neradan: Number,
    korisnicko_ime: String,
}, { versionKey: false });
exports.default = mongoose_1.default.model('RadnoVremeModel', radnoVremeSchema, 'radno_vreme');
