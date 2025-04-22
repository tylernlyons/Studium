import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../config/mongodb';
import StudySet from "@/models/studysetSchema"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { term } = await req.json();

  console.log(`Deleting term "${term}" from study set ID: ${id}`);

  try {
    await connectMongoDB();

    const updated = await StudySet.findByIdAndUpdate(
      id,
      { $pull: { terms: { term } } },
      { new: true }
    );

    if (!updated) {
      console.log('Study set not found');
      return NextResponse.json({ error: 'Study set not found' }, { status: 404 });
    }

    console.log('Term deleted:', term);
    return NextResponse.json({ message: 'Term deleted successfully' });
  } catch (err) {
    console.error('Error deleting term:', err);
    return NextResponse.json({ error: 'Failed to delete term' }, { status: 500 });
  }
}
