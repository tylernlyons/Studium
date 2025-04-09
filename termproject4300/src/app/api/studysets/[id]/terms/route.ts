import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../config/mongodb';
import StudySet from "@/models/studysetSchema"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { term } = await req.json();
  
    try {
      await connectMongoDB();
  
      const updated = await StudySet.findByIdAndUpdate(
        id,
        { $pull: { terms: { term } } },
        { new: true }
      );
  
      if (!updated) return NextResponse.json({ error: 'Study set not found' }, { status: 404 });
  
      return NextResponse.json({ message: 'Term deleted successfully' });
    } catch (err) {
      return NextResponse.json({ error: 'Failed to delete term' }, { status: 500 });
    }
  }