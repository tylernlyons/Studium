import mongoose, { Document } from "mongoose";
import { ITerm } from "./termSchema";

// Study set type definition
export interface IStudySet extends Document {
  title: string;
  terms: ITerm[]; // Array of terms with their definitions
  url: string;
  userId: string;
  public: boolean;
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
  userId: { type: String, required: true },
  public: { type: Boolean, default: false },
});

// Export model (reuse if already compiled)
export default mongoose.models.StudySet ||
  mongoose.model<IStudySet>("StudySet", StudySetSchema);
