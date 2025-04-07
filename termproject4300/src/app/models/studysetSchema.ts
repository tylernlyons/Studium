import mongoose, { Schema, Document } from "mongoose";
import Term, { ITerm } from "./termSchema";

export interface IStudySet extends Document {
    title: string;
    terms: ITerm[];
}


const StudySetSchema = new mongoose.Schema({
    title: String,
    terms: [
      {
        term: String,
        definition: String,
      },
    ],
  });
  

export default mongoose.models.StudySet || mongoose.model<IStudySet>("StudySet", StudySetSchema);
