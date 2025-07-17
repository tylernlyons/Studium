'use client';

import { useState, useEffect } from "react";
import StudySet from "@/components/StudySet";
import Link from "next/link";
import Card from "./Card";
import { Plus } from "lucide-react";
import { StudySetData } from "@/components/StudySetForm";
import StudyTimer from "./StudyTimer";

export default function StudySetsPage() {
    const [sets, setSets] = useState<StudySetData[]>([]);
    const [filter, setFilter] = useState<"all" | "public" | "private">("all");

    // Fetch sets when filter changes
    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await fetch(`/api/studysets?filter=${filter}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setSets(data.studySets);
            } catch (error) {
                console.error("Error fetching study sets:", error);
            }
        };
        fetchSets();
    }, [filter]);

    return (
        <div className="bg-gradient-to-br from-[#1b2d48] via-[#D2DDDF] space-x-4 p-8 min-h-screen">
            <StudyTimer />
            <div className="flex flex-col items-center justify-center">

                {/* Create new set card */}
                <div className="mb-6 w-[50%] shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out">
                    <Card className="flex flex-col items-center justify-center p-8 hover:shadow-lg transition">
                        <Plus size={32} className="text-[#1b2d48]" />
                        <Link href="/create-set" className="mt-2 text-[#1b2d48] font-medium hover:underline">
                            Create New Set
                        </Link>
                    </Card>
                </div>

                {/* Filter select dropdown */}
                <div className="mb-4">
                    <label htmlFor="filter" className="mr-2 text-[#1b2d48] font-medium">Filter:</label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as "all" | "public" | "private")}
                        className="border border-[#1b2d48] rounded px-3 py-1 text-[#1b2d48] bg-white"
                    >
                        <option value="all">All</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                {/* Sets grid */}
                <div className="max-w-5xl mx-auto mb-8 w-full">
                    {sets.length === 0 ? (
                        <div className="text-[#1b2d48] p-3">
                            <p>No study sets available</p>
                        </div>
                    ) : (
                        <div className="bg-[#f0f6fc]/45 rounded-lg w-full shadow-md">
                            <div className="text-3xl font-semibold text-[#1b2d48] pt-3 px-5">
                                <p>Study Sets</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
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
