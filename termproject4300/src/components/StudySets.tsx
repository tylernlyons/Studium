'use client';

import { useState, useEffect } from "react";
import StudySet from "@/components/StudySet";
import Link from "next/link";
import Card from "./Card";
import { Plus } from "lucide-react";
import { StudySetData } from "@/components/StudySetForm";


const dummySets: StudySetData[] = [
    {
        _id: 1,
        title: "Biology Basics",
        url: "/images/Biology.jpg", 
        terms: [
            { term: "Mitochondria", definition: "Powerhouse of the cell" },
            { term: "DNA", definition: "Carrier of genetic information - deoxyribonucleic acid" }
        ]
    },
    {
        _id: 2,
        title: "Math terminology",
        url: "/images/Math.jpg",
        terms: [
            { term: "Addition", definition: "The addition of two whole numbers results in the total or sum of those values combined" },
            { term: "Multiplication", definition: "Obtain from (a number) another that contains the first number a specified number of times" }
        ]
    },
    {
        _id: 3,
        title: "Art",
        url: "/images/Arts.jpg",
        terms: [
            { term: "Picasso", definition: "Spanish artist who co-founded Cubism and is considered one of the 20th century's most influential artists" },
            { term: "Multiplication", definition: "Dutch Post-Impressionist painter known for his striking colors, bold brushwork, and contoured forms" }
        ]
    }
];

export default function StudySetsPage() {
    const [sets, setSets] = useState<StudySetData[]>(dummySets); // 🟣 

    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await fetch('/api/studysets');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const allSets = [...dummySets, ...data.studySets.filter(
                    (set: StudySetData) => !dummySets.some(dummy => dummy._id === set._id)
                )];
                setSets(allSets);
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
