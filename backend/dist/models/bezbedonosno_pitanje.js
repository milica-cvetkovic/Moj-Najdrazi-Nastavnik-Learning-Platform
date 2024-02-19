"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const bezbedonosnoPitanjeSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    pitanje: String
}, { versionKey: false });
exports.default = mongoose_1.default.model('BezbedonosnoPitanjeModel', bezbedonosnoPitanjeSchema, 'bezbedonosna_pitanja');
