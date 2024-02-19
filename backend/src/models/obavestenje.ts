import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const obavestenjeSchema = new mongoose.Schema(
    {
        datum: Date,
        nastavnik: String,
        ucenik: String,
        status: String,
        predmet: String,
        procitano: Number,
    }, { versionKey: false }
)

export default mongoose.model('ObavestenjeModel', obavestenjeSchema, 'obavestenja')