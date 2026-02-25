import connectMongoDB from "../../../../config/mongodb";
import StudySet from "@/models/studysetSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/currentUser";

export async function POST(request: NextRequest) {
  const ownerId = await getCurrentUserId();
  if (!ownerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, terms, url, isPublic } = await request.json();
  await connectMongoDB();
  const newSet = await StudySet.create({
    title,
    terms: terms || [],
    url,
    isPublic: typeof isPublic === "boolean" ? isPublic : true,
    ownerId,
  });
  return NextResponse.json({ newSet }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const userId = await getCurrentUserId();
  await connectMongoDB();
  const visibility = request.nextUrl.searchParams.get("visibility");
  let query = {};

  if (visibility === "public") {
    query = { isPublic: true };
  } else if (visibility === "private") {
    if (!userId) {
      return NextResponse.json({ studySets: [] }, { status: 200 });
    }
    query = { isPublic: false, ownerId: userId };
  } else {
    query = userId
      ? { $or: [{ isPublic: true }, { ownerId: userId }] }
      : { isPublic: true };
  }

  const studySets = await StudySet.find(query)
    .populate("terms")
    .populate({ path: "ownerId", select: "username email" })
    .lean();

  const normalizedSets = studySets.map((set) => {
    const owner =
      typeof set.ownerId === "object" && set.ownerId !== null
        ? (set.ownerId as { username?: string; email?: string })
        : undefined;

    return {
      ...set,
      ownerUsername: owner?.username || owner?.email?.split("@")[0] || "Unknown user",
    };
  });

  return NextResponse.json({ studySets: normalizedSets }, { status: 200 });
}
