import mongoose, { Document } from "mongoose";
import { ITerm } from "./termSchema";

// Study set type definition
export interface IStudySet extends Document {
  title: string;
  terms: ITerm[]; // Array of terms with their definitions
  url: string;
  isPublic: boolean;
  ownerId: mongoose.Types.ObjectId;
}

// Mongoose schema for study sets
const StudySetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  terms: [
    {
      term: { type: String, required: true },
      definition: { type: String, required: true },
    },
  ],
  url: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Export model (reuse if already compiled)
export default mongoose.models.StudySet ||
  mongoose.model<IStudySet>("StudySet", StudySetSchema);
