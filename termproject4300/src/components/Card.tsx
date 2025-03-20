import { useState, useRef } from "react";

interface CardProps {
    title: string;
    onTitleChange: (newTitle: string) => void;
    children: React.ReactNode;
}

const Card = ({ title, onTitleChange, children }: CardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
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

    return (
        <div
            className={`border border-gray-300 shadow-sm rounded-lg bg-white m-50`}
        >
            <div
                className="flex justify-between items-center p-4"
                onClick={toggleCollapse}
            >
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
                        <h2
                            className="text-xl font-bold"
                            onClick={handleEdit}
                        >
                            {title}
                        </h2>
                    )}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleCollapse();
                    }}
                    className="ml-2 p-1 cursor-pointer"
                    aria-label={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? <>▼</> : <>▲</>}
                </button>
            </div>
            {!isCollapsed && <div className="p-4">{children}</div>}
        </div>
    );
};

export default Card;
