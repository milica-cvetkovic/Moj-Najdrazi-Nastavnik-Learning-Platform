"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const obavestenjeSchema = new mongoose_1.default.Schema({
    datum: Date,
    nastavnik: String,
    ucenik: String,
    status: String,
    predmet: String,
    procitano: Number,
}, { versionKey: false });
exports.default = mongoose_1.default.model('ObavestenjeModel', obavestenjeSchema, 'obavestenja');
