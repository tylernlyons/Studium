import { auth } from "@/auth";
import User from "@/models/userSchema";
import connectMongoDB from "../../config/mongodb";

export async function getCurrentUserId(): Promise<string | null> {
  await connectMongoDB();
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();

  if (!email) {
    return null;
  }

  const rawUser = await User.findOne({ email }).select("_id").lean();
  if (!rawUser || Array.isArray(rawUser)) {
    return null;
  }

  const user = rawUser as { _id?: unknown };
  return user._id !== undefined ? String(user._id) : null;
}
