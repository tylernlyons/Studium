import { useState } from "react";
import { useEffect } from "react";

interface FlashcardProps {
    terms: { term: string; definition: string }[];
    onBack: () => void;  
}

const FlashcardViewer = ({ terms, onBack }: FlashcardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const nextCard = () => {
        setFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledTerms.length);
        }, 200); /* This delay allows the flip animation to complete before changing the card */
    };
    const [shuffledTerms, setShuffledTerms] = useState(terms); 
    const prevCard = () => {
        setFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + shuffledTerms.length) % shuffledTerms.length);
        }, 200); /* This delay allows the flip animation to complete before changing the card */
    };

    useEffect(() => {
        setShuffledTerms(terms);
        setCurrentIndex(0);
        setFlipped(false);
    }, [terms]); 
    
    // Handle keyboard events for navigation and flipping
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'ArrowLeft':
                    prevCard();
                    break;
                case 'ArrowRight':
                    nextCard();
                    break;
                case 'Space':
                    e.preventDefault(); // Prevent scrolling
                    flipCard();
                    break;
                default:
                    break;
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    // Handle touch events for mobile navigation
    // flipCard function to flip the card
    const flipCard = () => {
        setFlipped(!flipped);
    };
    // shuffleCards function to shuffle the cards
    const shuffleCards = () => {
        const shuffled = [...terms].sort(() => Math.random() - 0.5);
        setShuffledTerms(shuffled);
        setCurrentIndex(0);
        setFlipped(false);
    }

    // Check if there are no terms to display
    // If there are no terms, show a message and a button to go back
    if (shuffledTerms.length === 0) {
        return (
            <div className="text-center p-4 text-white">
                <p>No flashcards available.</p>
                <button onClick={onBack} className="mt-4 app-btn-primary">
                    Back to Study Set
                </button>
            </div>
        );
    }
    
    const { term, definition } = shuffledTerms[currentIndex];
    
    // Check if the current index is out of bounds and reset it if necessary
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-96 h-56 perspective">
                <div 
                onClick={flipCard}
                className={`relative w-full h-full transition-transform duration-500 transform ${
                    flipped ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d', cursor: 'pointer' }}
                >
                {/* Front side */}
                <div className="absolute w-full h-full app-panel rounded-lg flex items-center justify-center text-xl p-4 backface-hidden text-[#1b2d48]">
                    {term}
                </div>

                {/* Back side */}
                <div className="absolute w-full h-full app-panel rounded-lg flex items-center justify-center text-xl p-4 backface-hidden transform rotate-y-180 text-[#1b2d48]">
                    {definition}
                </div>
            </div>
        </div>
        {/* Buttons for navigation and shuffling */}
            <div className="mt-4 flex gap-4">
                <button 
                    onClick={flipCard} 
                    className="app-btn-secondary"
                >
                    Flip
                </button>
                <button
                    onClick={prevCard} 
                    className="app-btn-danger"
                >
                    ←
                </button>
                <button 
                    onClick={nextCard} 
                    className="app-btn-primary"
                >
                    →
                </button>
                <button 
                    onClick={shuffleCards} 
                    className="app-btn-secondary"
                > 
                    Shuffle
                </button>
                <button 
                    onClick={onBack} 
                    className="app-btn-primary"
                >
                    Back to Study Set
                </button>
            </div>
                {/* Display the current index and total number of terms */}
            <div className="mt-6 w-full max-w-md text-center">
                <p className="mb-2 text-white text-lg font-semibold">
                    {currentIndex + 1} / {shuffledTerms.length}
                    {currentIndex === shuffledTerms.length - 1 && ' 🎉'}
                </p>
            {currentIndex === shuffledTerms.length - 1 && (
                <p className="text-green-600 text-lg font-semibold">You did it!</p>
            )}
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div
                    className="h-full bg-blue-500 rounded transition-all duration-300"
                    style={{
                    width: `${((currentIndex + 1) / shuffledTerms.length) * 100}%`,
                    }}
                ></div>
            </div>
        </div>
    </div>
    );
};

export default FlashcardViewer;
