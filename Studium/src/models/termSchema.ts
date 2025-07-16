import mongoose, { Schema, Document } from "mongoose";

// Interface representing a Term document in MongoDB
export interface ITerm extends Document {
    term: string;
    definition: string;
}

// Schema definition for the Term model
const TermSchema = new Schema<ITerm>({
    term: { type: String, required: true },
    definition: { type: String, required: true }
});

// Export model (reuse if already compiled)
export default mongoose.models.Term || mongoose.model<ITerm>("Term", TermSchema);
