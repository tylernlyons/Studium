import { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CardProps {
    title: string;
    onTitleChange: (newTitle: string) => void;
    children: React.ReactNode;
    onDelete: (title: string) => void;
}

const subjects = ["Math", "Science", "History", "English", "Art"];

const Card = ({ title, onTitleChange, children, onDelete }: CardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteInput, setDeleteInput] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const toggleCollapse = () => {
        if (!isEditing) {
            setIsCollapsed((prev) => !prev);
        }
    };

    const handleEdit = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsEditing(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (!title.trim()) {
            onTitleChange("Nameless");
        }
    };

    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(event.target.value);
    };

    const handleDelete = () => {
        if (deleteInput === title) {
            onDelete(title);
            setIsDeleting(false);
            setDeleteInput("");
        } else {
            alert("Set name does not match. Deletion canceled.");
        }
    };

    return (
        <div className="border border-gray-300 shadow-sm rounded-lg bg-white overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isCollapsed ? '80px' : '500px' }}>
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center cursor-pointer">
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            onBlur={handleBlur}
                            className="border rounded px-2 py-1"
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <h2 className="text-xl font-bold" onClick={handleEdit}>
                            {title}
                        </h2>
                    )}
                </div>
                <div className="flex items-center">
                    <select
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        className="border rounded px-2 py-1 mr-2"
                    >
                        {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleCollapse();
                        }}
                        className="ml-2 p-1 cursor-pointer"
                        aria-label={isCollapsed ? "Expand" : "Collapse"}
                    >
                        {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </button>
                </div>
            </div>
            <div className="p-4">
                {children}
            </div>
            <div className="flex justify-end p-4">
                {isDeleting ? (
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Type set name to delete"
                            value={deleteInput}
                            onChange={(e) => setDeleteInput(e.target.value)}
                            className="border rounded px-2 py-1 mr-2"
                        />
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        >
                            Confirm Delete
                        </button>
                        <button
                            onClick={() => setIsDeleting(false)}
                            className="bg-gray-300 text-black px-4 py-1 rounded ml-2 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsDeleting(true)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                        Delete Set
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
