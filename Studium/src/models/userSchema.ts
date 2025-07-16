import mongoose, { Document, Schema } from "mongoose";

// Interface representing a User document in MongoDB
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

// Schema definition for the User model
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
});

// Export model (reuse if already compiled)
export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);