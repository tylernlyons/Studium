'use client';

import { useState, useEffect } from "react";
import StudySet from "@/components/StudySet";
import Link from "next/link";
import Card from "./Card";
import { Plus } from "lucide-react";
import { StudySetData } from "@/components/StudySetForm";

export default function StudySetsPage() {
    const [sets, setSets] = useState<StudySetData[]>([]);

    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await fetch('/api/studysets');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSets(data.studySets)
            } catch (error) {
                console.log('Error from ShowItemList:', error);
            }
        };
        fetchSets();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto mb-8">
                {sets && sets.length === 0 ? (
                    <p>No study sets available</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {sets.map((set, k) => (
                            <StudySet set={set} key={k} />
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="flex flex-col items-center justify-center p-8 hover:shadow-lg transition">
                    <Plus size={32} className="text-purple-600" />
                    <Link href="/create-set" className="mt-2 text-purple-600 font-medium hover:underline">
                        Create New Set
                    </Link>
                </Card>
            </div>
        </div>
    );
}
