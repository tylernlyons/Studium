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
        { $pull: { terms: { term } } }, //removes any term that matches the term value provided
        { new: true } //return updated document
      );
  
      if (!updated) return NextResponse.json({ error: 'Study set not found' }, { status: 404 });
  
      return NextResponse.json({ message: 'Term deleted successfully' });
    } catch (err) {
      return NextResponse.json({ error: 'Failed to delete term' }, { status: 500 });
    }
  }