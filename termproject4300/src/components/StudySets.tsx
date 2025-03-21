import { useState } from "react";
import StudySet from "./StudySet";
import { Plus } from "lucide-react"; 

const StudySets = () => {
    const [studySets, setStudySets] = useState([<StudySet key={0} />]);

    const addStudySet = () => {
        setStudySets([...studySets, <StudySet key={studySets.length} />]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex flex-wrap gap-4 justify-center">
                {studySets}
                <button
                    onClick={addStudySet}
                    className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center hover:bg-green-600 transition cursor-pointer"
                >
                    <Plus className="mr-2" />
                    Add Study Set
                </button>
                
            </div>
        </div>
    );
};

export default StudySets;