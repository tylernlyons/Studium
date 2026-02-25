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

  const user = await User.findOne({ email }).select("_id").lean();
  return user?._id?.toString() ?? null;
}
