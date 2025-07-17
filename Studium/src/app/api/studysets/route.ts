import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import StudySet from "@/models/studysetSchema";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, terms = [], url, public: isPublic = false } = await req.json();
  await connectMongoDB();

  const newSet = await StudySet.create({
    title,
    terms,
    url,
    userId: session.user.id,
    public: isPublic,
  });

  return NextResponse.json({ newSet }, { status: 201 });
}

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  const url = new URL(req.url);
  const filter = url.searchParams.get("filter");

  await connectMongoDB();

  let query: any = {};

  if (filter === "public") {
    query.public = true;
  } else if (filter === "private") {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    query = { userId, public: false };
  } else if (filter === "all") {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    query = {
      $or: [
        { userId },
        { public: true }
      ]
    };
  } else {

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    query = { userId };
  }

  const studySets = await StudySet.find(query);
  return NextResponse.json({ studySets }, { status: 200 });
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();

  const { title, terms = [], url, public: isPublic } = body;

  console.log("Update body:", body);

  await connectMongoDB();

  const updatePayload: any = {
    title,
    terms,
    url,
  };

  if (typeof isPublic !== "undefined") {
    updatePayload.public = isPublic;
  }

  try {
    const updatedSet = await StudySet.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      updatePayload,
      { new: true }
    );

    if (!updatedSet) {
      return NextResponse.json({ error: "Study set not found or not owned by user" }, { status: 404 });
    }

    return NextResponse.json({ updatedSet }, { status: 200 });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ error: "Server error during update" }, { status: 500 });
  }
}

