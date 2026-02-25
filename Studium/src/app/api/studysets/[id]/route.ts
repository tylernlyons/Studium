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
    const rawStudySet = await StudySet.findById(id)
        .populate({ path: "ownerId", select: "username email" })
        .lean();

    if (!rawStudySet || Array.isArray(rawStudySet)) {
        return NextResponse.json({ message: "Set not found" }, { status: 404 });
    }

    const studySet = rawStudySet as {
        isPublic?: boolean;
        ownerId?: unknown;
        [key: string]: unknown;
    };

    const populatedOwner =
        typeof studySet.ownerId === "object" && studySet.ownerId !== null
            ? (studySet.ownerId as { _id?: unknown; username?: string; email?: string })
            : undefined;

    const ownerIdValue =
        populatedOwner?._id !== undefined
            ? String(populatedOwner._id)
            : studySet.ownerId !== undefined
                ? String(studySet.ownerId)
                : undefined;
    const isOwner = ownerIdValue === userId;
    if (!studySet.isPublic && !isOwner) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(
        {
            studySet: {
                ...studySet,
                ownerUsername:
                    populatedOwner?.username
                        ? populatedOwner.username
                        : populatedOwner?.email
                            ? populatedOwner.email.split("@")[0]
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
