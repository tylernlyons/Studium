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
    <div className=" py-10">
      <StudyTimer />

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

            <div className='flex flex-row p-3'>
              <Link
                href={`/update-set/${id}`} //sends user to edit the current set
                className="w-full mr-3 px-6 py-2 border bg-[#3c649f] border-gray-500 text-[#1b2d48] hover:bg-[#1b2d48] hover:text-white transition rounded text-center"
              >
                Edit set
              </Link>
              <Link
                href={`/flashcard-view/${id}`} //sends user to view flashcards of current set
                className="w-full mr-3 px-6 py-2 border bg-[#3c649f] border-gray-500 text-[#1b2d48] hover:bg-[#1b2d48] hover:text-white transition rounded text-center"
              >
                Start flashcards
              </Link>
              <Link
                href="/focusMode"
                className="w-full mr-3 px-6 py-2 border bg-[#3c649f] border-gray-500 text-[#1b2d48] hover:bg-[#1b2d48] hover:text-white transition rounded text-center"
              >
                <div>
                  Back To Set List
                </div>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <HoverDefinition />
    </div>
  );
}
