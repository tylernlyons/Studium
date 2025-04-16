'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Image from 'next/image';
import Link from 'next/link';
import { StudySetProps } from '@/components/StudySet';
import HoverDefinition from '@/components/HoverDefinition';

export default function ShowStudySet() {
  const router = useRouter();
  const [studySet, setStudySet] = useState<StudySetProps['set'] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchStudySet = async () => {
      const res = await fetch(`/api/studysets/${id}`);
      const data = await res.json();
      setStudySet(data.studySet);
    };
    fetchStudySet();
  }, [id]);

  if (!studySet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen text-black py-10">
      <Link
        href="/focusMode"
        className="inline-block px-4 py-2 border border-gray-500 text-red-700 hover:bg-red-800 hover:text-white transition rounded"
      >
        Back To Set List
      </Link>
      <div className="max-w-5xl mx-auto px-4">
        <Card>
          <div className="w-full h-72 relative">
            {studySet.url && (
              <Image
                src={studySet.url}
                alt={studySet.title}
                fill
                className="object-cover rounded-md"
              />
            )}
            {!studySet.url && <p>No image available</p>}
          </div>

          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-semibold">{studySet.title}</h2>
            <ul>
              {studySet.terms.map((t, i) => (
                <li key={i}>
                  <strong>{t.term}</strong>: {t.definition}
                </li>
              ))}
            </ul>

            <Link
              href={`/update-set/${id}`}
              className="w-full px-6 py-2 border border-gray-500 text-red-700 hover:bg-red-700 hover:text-white transition rounded text-center"
            >
              Edit set
            </Link>
            <Link
              href={`/flashcard-view/${id}`}
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
