import mongoose, { Schema, Document } from "mongoose";
import Term, { ITerm } from "./termSchema";

export interface IStudySet extends Document {
  title: string;
  terms: ITerm[];
  url: string;
}

const StudySetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  terms: [
    {
      term: { type: String, required: true },
      definition: { type: String, required: true },
    },
  ],
  url: { type: String, required: true },
});

export default mongoose.models.StudySet ||
  mongoose.model<IStudySet>("StudySet", StudySetSchema);
