'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Image from 'next/image';
import Link from 'next/link';
import { StudySetProps } from '@/components/StudySet';
import HoverDefinition from '@/components/HoverDefinition';
import StudyTimer from '@/components/StudyTimer';

export default function ShowStudySet() {
  const [studySet, setStudySet] = useState<StudySetProps['set'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchStudySet = async () => { //fetches the supplied studyset from Mongo
      const res = await fetch(`/api/studysets/${id}`);
      if (!res.ok) {
        setError("You don't have access to this set.");
        return;
      }
      const data = await res.json();
      setStudySet({ ...data.studySet, canEdit: data.canEdit });
    };
    fetchStudySet();
  }, [id]);

  if (error) {
    return (
      <div className='app-shell text-center text-xl p-10 text-white'>
        <p>{error}</p>
        <button className="app-btn-secondary mt-4" onClick={() => router.push("/focusMode")}>
          Back to Set List
        </button>
      </div>
    );
  }

  if (!studySet) { //Shows loading, while fetching set
    return <div className='app-shell text-center text-xl p-10 text-white'>Loading...</div>;
  }

  return (
    <div className="app-shell py-10">
      <StudyTimer />

      <div className="max-w-5xl mx-auto px-4">
        <Card className="text-[#1b2d48]">
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
            <p className="text-sm text-[#3f5d86]">
              {studySet.isPublic !== false ? "Public set" : "Private set"} • by {studySet.ownerUsername || "Unknown user"}
            </p>
            <ul className="space-y-1">
              {studySet.terms.map((t, i) => ( //map the terms of the study set to an unordered list
                <li key={i}>
                  <strong>{t.term}</strong>: {t.definition}
                </li>
              ))}
            </ul>

            <div className='flex flex-col sm:flex-row p-3 gap-2'>
              {studySet.canEdit ? (
                <Link
                  href={`/update-set/${id}`} //sends user to edit the current set
                  className="w-full app-btn-primary text-center"
                >
                  Edit set
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full app-btn-primary text-center opacity-50 cursor-not-allowed"
                  title="Only the owner can update this set."
                >
                  Edit set
                </button>
              )}
              <Link
                href={`/flashcard-view/${id}`} //sends user to view flashcards of current set
                className="w-full app-btn-secondary text-center"
              >
                Start flashcards
              </Link>
              <Link
                href="/focusMode"
                className="w-full app-btn-secondary text-center"
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
