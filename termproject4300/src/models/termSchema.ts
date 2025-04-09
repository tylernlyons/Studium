import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITerm extends Document {
    term: string;
    definition: string;
}

const TermSchema = new Schema<ITerm>({
    term: { type: String, required: true },
    definition: { type: String, required: true }
});

export default mongoose.models.Term || mongoose.model<ITerm>("Term", TermSchema);

