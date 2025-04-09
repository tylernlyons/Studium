import connectMongoDB from "../../../../../config/mongodb";
import StudySet from "@/models/studysetSchema";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

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
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedItem = await StudySet.findByIdAndDelete(id);

    if (!deletedItem) {
        return NextResponse.json({ message: "Set not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Set deleted" }, { status: 200 });

}