import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const casSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
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
    }, { versionKey: false }
)

export default mongoose.model('CasModel', casSchema, 'casovi')