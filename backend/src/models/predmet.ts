import mongoose from "mongoose";

const predmetSchema = new mongoose.Schema(
    {
        naziv: String,
    },
    {
        versionKey: false
    }
);

export default mongoose.model("PredmetModel", predmetSchema, "predmeti")