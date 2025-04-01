import { useState } from "react";
import CreateDefinition from "./CreateDefinition";
import Card from "./Card";
import FlashcardViewer from "./Flashcard";

interface Term {
    term: string;
    definition: string;
}

const StudySet = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [terms, setTerms] = useState<Term[]>([]);
    const [newTerm, setNewTerm] = useState<string>("");
    const [cardTitle, setCardTitle] = useState<string>("My Study Set");
    const [showFlashcards, setShowFlashcards] = useState<boolean>(false);

    const addTerm = async () => {
        if (newTerm.trim()) {
            setLoading(true);
            const definition = await CreateDefinition(newTerm);
            setTerms([...terms, { term: newTerm, definition }]);
            setNewTerm("");
            setLoading(false);
        }
    };

    const deleteTerm = (index: number) => {
        const updatedTerms = terms.filter((_, i) => i !== index);
        setTerms(updatedTerms);
    };

    const handleDeleteSet = () => {
        setCardTitle("My Study Set");
        setTerms([]);
    };

    return (
        <Card 
            title={cardTitle} 
            onTitleChange={setCardTitle} 
            onDelete={handleDeleteSet}
        >
            <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">

                {showFlashcards ? (
                    <FlashcardViewer 
                        terms={terms} 
                        onBack={() => setShowFlashcards(false)} 
                    />
                ) : (
                    <>
                        <ul>
                            {terms.map((item, index) => (
                                <li 
                                    key={index} 
                                    className="p-2 border-b flex justify-between items-center"
                                >
                                    <div>
                                        <strong>{item.term}:</strong> {item.definition}
                                    </div>
                                    <button 
                                        onClick={() => deleteTerm(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="New Term"
                                value={newTerm}
                                onChange={(e) => setNewTerm(e.target.value)}
                                className="border p-2 mr-2 rounded"
                                disabled={loading}
                            />
                            <button
                                onClick={addTerm}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={loading}
                            >
                                {loading ? "Thinking..." : "Define"}
                            </button>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={() => setShowFlashcards(true)}
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                                disabled={terms.length === 0}
                            >
                                {terms.length > 0 ? "Start Flashcards" : "Add terms to create flashcards"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};

export default StudySet;
