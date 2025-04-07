import connectMongoDB from "../../../../../config/mongodb";
import StudySet from "@/app/models/studysetSchema";
import { NextResponse, NextRequest } from "next/server";

interface RouteParams {
    params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const { title, terms } = await request.json();
    await connectMongoDB();
    const updatedSet = await StudySet.findByIdAndUpdate(id, { title, terms });
    return NextResponse.json({ updatedSet }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const studySet = await StudySet.findOne({ _id: id });
    return NextResponse.json({ studySet }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await StudySet.findByIdAndDelete(id);
    
  }