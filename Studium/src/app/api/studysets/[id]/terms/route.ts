import { NextResponse, NextRequest } from 'next/server';
import connectMongoDB from '../../../../../../config/mongodb';
import StudySet from "@/models/studysetSchema"
import { getCurrentUserId } from "@/lib/currentUser";
import mongoose from "mongoose";

export async function DELETE(request: NextRequest, context: unknown) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { params } = context as { params: { id: string } };
  const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    const { term } = await request.json();
  
    try {
      await connectMongoDB();
  
      const updated = await StudySet.findOneAndUpdate(
        { _id: id, ownerId: userId },
        { $pull: { terms: { term } } }, //removes any term that matches the term value provided
        { new: true } //return updated document
      );
  
      if (!updated) return NextResponse.json({ error: 'Study set not found' }, { status: 404 });
  
      return NextResponse.json({ message: 'Term deleted successfully' });
    } catch {
      return NextResponse.json({ error: 'Failed to delete term' }, { status: 500 });
    }
  }
