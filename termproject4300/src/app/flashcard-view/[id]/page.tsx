'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FlashcardViewer from '@/components/Flashcard';
import Image from 'next/image';

export default function FlashcardPage() {
    const { id } = useParams();
    const router = useRouter();

    const [studySet, setStudySet] = useState({
        title: '',
        url: '',
        terms: [] as { term: string; definition: string }[],
    });

    useEffect(() => {
        if (!id) return;
        const fetchStudySet = async () => {
            const res = await fetch(`/api/studysets/${id}`);
            const data = await res.json();
            setStudySet({
                title: data.studySet.title,
                url: data.studySet.url,
                terms: data.studySet.terms || [],
            });
        };
        fetchStudySet();
    }, [id]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
            {studySet.url && (
                <Image
                    src={studySet.url}
                    alt={studySet.title}
                    width={250}
                    height={250}
                    className="object-cover rounded-md"
                />
            )}
            <h1 className="text-2xl font-bold mb-4">{studySet.title}</h1>
            <FlashcardViewer
                terms={studySet.terms}
                onBack={() => router.push(`/show-set/${id}`)}
            />
        </div>
    );
}
