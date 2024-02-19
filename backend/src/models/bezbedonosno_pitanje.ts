import { ObjectId } from "mongodb"
import mongoose, { mongo } from "mongoose"

const bezbedonosnoPitanjeSchema = new mongoose.Schema(
    {
        _id: ObjectId,
        pitanje: String
    }, { versionKey: false }
);

export default mongoose.model('BezbedonosnoPitanjeModel', bezbedonosnoPitanjeSchema, 'bezbedonosna_pitanja');