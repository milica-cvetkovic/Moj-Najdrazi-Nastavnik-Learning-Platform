import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        korisnicko_ime: String,
        lozinka: String,
    }, { versionKey: false }
)

export default mongoose.model('AdminModel', adminSchema, 'admin')