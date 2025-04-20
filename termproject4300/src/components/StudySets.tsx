'use client';

import { useState, useEffect } from "react";
import StudySet from "@/components/StudySet";
import Link from "next/link";
import Card from "./Card";
import { Plus } from "lucide-react";
import { StudySetData } from "@/components/StudySetForm";

export default function StudySetsPage() {
    const [sets, setSets] = useState<StudySetData[]>([]);

    // Fetch study sets on component mount
    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await fetch('/api/studysets'); // Call API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSets(data.studySets); // Update state with fetched sets
            } catch (error) {
                console.log('Error from ShowItemList:', error);
            }
        };
        fetchSets();
    }, []);

    return (
      
        <div className="bg-gradient-to-br from-[#1b2d48] via-[#D2DDDF] space-x-4 p-8 bg-min-h-screen ">
  <div className="flex flex-col items-center justify-center">
<div className="mb-6 w-[50%] shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out">
                
                <Card className="flex flex-col items-center justify-center p-8 hover:shadow-lg transition">
                    <Plus size={32} className="text-[#1b2d48]" />
                    <Link href="/create-set" className="mt-2 text-[#1b2d48] justify-center  font-medium hover:underline">
                        Create New Set
                    </Link>
                </Card>
            </div>

            {/* Container for study sets */}
            <div className="max-w-5xl mx-auto mb-8">
                {/* If no sets exist */}
                {sets && sets.length === 0 ? (
                    <div className=" text-[#1b2d48] p-3">
                    <p>No study sets available</p>
                    </div>
                ) : (
                    // Grid of sets
                    <div className="bg-[#f0f6fc]/45 opacity- rounded-lg w-[100%] shadow-md">
                        <div className="text-3xl font-semibold text-[#1b2d48] pt-3 px-5">
                       <p>Study Sets</p>
                       </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5'>
                       
                        {sets.map((set, k) => (
                            <StudySet set={set} key={k} />
                        ))}
                    </div>
                    </div>
                )}
            </div>

            
        </div>
        </div> 
    );
}
