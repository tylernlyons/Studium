import { useState } from "react";

interface FlashcardProps {
    terms: { term: string; definition: string }[];
    onBack: () => void;  
}

const FlashcardViewer = ({ terms, onBack }: FlashcardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const nextCard = () => {
        setFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % terms.length);
    };

    const flipCard = () => {
        setFlipped(!flipped);
    };

    if (terms.length === 0) {
        return (
            <div className="text-center p-4">
                <p>No flashcards available.</p>
                <button onClick={onBack} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Back to Study Set
                </button>
            </div>
        );
    }

    const { term, definition } = terms[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-96 h-56 bg-white shadow-lg rounded-lg flex items-center justify-center text-xl p-4 border">
                {flipped ? definition : term}
            </div>

            <div className="mt-4 flex gap-4">
                <button 
                    onClick={flipCard} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Flip
                </button>
                <button 
                    onClick={nextCard} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Next
                </button>
                <button 
                    onClick={onBack} 
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Study Set
                </button>
            </div>
        </div>
    );
};

export default FlashcardViewer;
