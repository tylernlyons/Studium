'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FlashcardViewer from '@/components/Flashcard';
import StudyTimer from '@/components/StudyTimer';
import Image from 'next/image';
import { StudySetProps } from '@/components/StudySet';

export default function FlashcardPage() {
    const [studySet, setStudySet] = useState<StudySetProps['set'] | null>(null);
    const { id } = useParams();
    const router = useRouter();
  
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
      return <div className='app-shell text-center text-xl p-10 text-white'>Loading...</div>;
    }

    return (
        <div className="app-shell min-h-screen flex flex-col items-center justify-center px-4 py-6">
            <StudyTimer />
            {studySet.url && ( //if there's a valid image URL for the set, set it
                <Image
                    src={studySet.url}
                    alt={studySet.title}
                    width={250}
                    height={250}
                    className="object-cover rounded-md shadow-lg border border-white/30"
                />
            )}
            {!studySet.url && <p className="text-white">No image available</p>}
            <h1 className="text-2xl font-bold mb-4 text-white">{studySet.title}</h1>
            <FlashcardViewer
                terms={studySet.terms}
                onBack={() => router.push(`/show-set/${id}`)}
            />
        </div>
    );
}
