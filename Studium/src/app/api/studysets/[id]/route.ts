import connectMongoDB from "../../../../../config/mongodb";
import StudySet from "@/models/studysetSchema";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { getCurrentUserId } from "@/lib/currentUser";

export async function PUT(request: NextRequest, context: unknown) {
    const userId = await getCurrentUserId();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { params } = context as { params: { id: string } };
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const { title, terms, url, isPublic } = await request.json();
    await connectMongoDB();
    const updatedSet = await StudySet.findOneAndUpdate(
        { _id: id, ownerId: userId },
        {
            title,
            terms,
            url,
            isPublic: typeof isPublic === "boolean" ? isPublic : true,
        },
        { new: true }
    );

    if (!updatedSet) {
        return NextResponse.json({ message: "Set not found or forbidden" }, { status: 404 });
    }

    return NextResponse.json({ updatedSet }, { status: 200 });
}

export async function GET(request: NextRequest, context: unknown) {
    const userId = await getCurrentUserId();
    const { params } = context as { params: { id: string } };
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();
    const studySet = await StudySet.findById(id).populate({ path: "ownerId", select: "name" }).lean();
    if (!studySet) {
        return NextResponse.json({ message: "Set not found" }, { status: 404 });
    }

    const ownerIdValue =
        typeof studySet.ownerId === "object" && studySet.ownerId?._id
            ? studySet.ownerId._id.toString()
            : studySet.ownerId?.toString();
    const isOwner = ownerIdValue === userId;
    if (!studySet.isPublic && !isOwner) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(
        {
            studySet: {
                ...studySet,
                ownerName:
                    typeof studySet.ownerId === "object" && studySet.ownerId?.name
                        ? studySet.ownerId.name
                        : "Unknown user",
            },
            canEdit: isOwner,
        },
        { status: 200 }
    );
}

export async function DELETE(request: NextRequest, context: unknown) {
    const userId = await getCurrentUserId();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { params } = context as { params: { id: string } };
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedItem = await StudySet.findOneAndDelete({ _id: id, ownerId: userId });

    if (!deletedItem) {
        return NextResponse.json({ message: "Set not found or forbidden" }, { status: 404 });
    }

    return NextResponse.json({ message: "Set deleted" }, { status: 200 });

}
