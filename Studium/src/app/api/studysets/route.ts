import connectMongoDB from "../../../../config/mongodb";
import StudySet from "@/models/studysetSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, terms, url } = await request.json();
  await connectMongoDB();
  const newSet = await StudySet.create({ title, terms, url });
  return NextResponse.json({ newSet }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const studySets = await StudySet.find().populate("terms");
  return NextResponse.json({ studySets }, { status: 200 });
}
