import { useState } from "react";
import CreateDefinition from "./CreateDefinition";
import Card from "./Card";

interface Term {
    term: string;
    definition: string;
}

const StudySet = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [terms, setTerms] = useState<Term[]>([]);
    const [newTerm, setNewTerm] = useState<string>("");
    const [cardTitle, setCardTitle] = useState<string>("My Study Set");

    const addTerm = async () => {
        if (newTerm.trim()) {
            setLoading(true);
            const definition = await CreateDefinition(newTerm);
            setTerms([...terms, { term: newTerm, definition }]);
            setNewTerm("");
            setLoading(false);
        }
    };

    return (
        <Card title={cardTitle} onTitleChange={setCardTitle}>
            <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
                <ul>
                    {terms.map((item, index) => (
                        <li key={index} className="p-2 border-b">
                            <strong>{item.term}:</strong> {item.definition}
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
            </div>
        </Card>
    );
};

export default StudySet;
