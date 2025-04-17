'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Card from '@/components/Card';
import Image from 'next/image';
import Link from 'next/link';
import { StudySetProps } from '@/components/StudySet';
import HoverDefinition from '@/components/HoverDefinition';
import StudyTimer from '@/components/StudyTimer';

export default function ShowStudySet() {
  const [studySet, setStudySet] = useState<StudySetProps['set'] | null>(null);
  const { id } = useParams();

  useEffect(() => { 
    if (!id) return;
    const fetchStudySet = async () => { //fetches the supplied studyset from Mongo
      const res = await fetch(`/api/studysets/${id}`);
      const data = await res.json();
      setStudySet(data.studySet);
    };
    fetchStudySet();
  }, [id]);

  if (!studySet) { //Shows loading, while fetching set
    return <div className='text-center text-xl p-10'>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen text-black py-10">
      <StudyTimer />
      <Link
        href="/focusMode"
        className="inline-block px-4 py-2 border border-gray-500 text-red-700 hover:bg-red-800 hover:text-white transition rounded"
      >
        Back To Set List
      </Link>
      <div className="max-w-5xl mx-auto px-4">
        <Card>
          <div className="w-full h-72 relative">
            {studySet.url && ( //if there's a valid image URL for the set, set it
              <Image
                src={studySet.url}
                alt={studySet.title}
                fill
                className="object-cover rounded-md"
              />
            )}
            
          </div>

          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-semibold">{studySet.title}</h2>
            <ul>
              {studySet.terms.map((t, i) => ( //map the terms of the study set to an unordered list
                <li key={i}>
                  <strong>{t.term}</strong>: {t.definition}
                </li>
              ))}
            </ul>

            <Link
              href={`/update-set/${id}`} //sends user to edit the current set
              className="w-full px-6 py-2 border border-gray-500 text-red-700 hover:bg-red-700 hover:text-white transition rounded text-center"
            >
              Edit set
            </Link>
            <Link
              href={`/flashcard-view/${id}`} //sends user to view flashcards of current set
              className="w-full px-6 py-2 border border-gray-500 text-red-700 hover:bg-red-700 hover:text-white transition rounded text-center"
            >
              Start flashcards
            </Link>

          </div>
        </Card>
      </div>
      <HoverDefinition />
    </div>
  );
}
