import { ObjectId } from "mongodb"
import mongoose, { mongo } from "mongoose"

const radnoVremeSchema = new mongoose.Schema(
    {
        datum: Date,
        vremeOd: String,
        vremeDo: String,
        neradan: Number,
        korisnicko_ime: String,
    }, { versionKey: false }
);

export default mongoose.model('RadnoVremeModel', radnoVremeSchema, 'radno_vreme');