import connectMongoDB from "../../../../../config/mongodb";
import StudySet from "@/models/studysetSchema";
import { NextResponse, NextRequest } from "next/server";

interface RouteParams {
    params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { title, terms, url } = await request.json();
    await connectMongoDB();
    const updatedSet = await StudySet.findByIdAndUpdate(id, { title, terms, url }, { new: true });
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