"use client";

import { useState, useEffect } from 'react';
import CreateDefinition from "./CreateDefinition";

const HoverDefinition = () => {
    // State to store selected word, its definition, and the cursor position
    const [hoverDef, setHoverDef] = useState<{
        word: string;
        definition: string;
        x: number;
        y: number;
    } | null>(null);

    useEffect(() => {
        // When user highlights text and releases mouse
        const handleMouseOver = async (event: MouseEvent) => {
            const selection = window.getSelection()?.toString().trim();
            if (selection) {
                const definition = await CreateDefinition(selection); // Fetch definition
                setHoverDef({
                    word: selection,
                    definition,
                    x: event.pageX,
                    y: event.pageY,
                });
            }
        };

        // Hide definition popup on next click
        const handleMouseLeave = () => {
            setHoverDef(null);
        };

        // Attach mouse event listeners
        document.addEventListener('mouseup', handleMouseOver);
        document.addEventListener('mousedown', handleMouseLeave);

        // Clean up listeners on unmount
        return () => {
            document.removeEventListener('mouseup', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseLeave);
        };
    }, []);

    return (
        <>
            {hoverDef && (
                <div
                    className="absolute bg-gray-800 text-white p-2 rounded shadow-lg"
                    style={{ top: hoverDef.y, left: hoverDef.x }} // Position near mouse
                >
                    <strong>{hoverDef.word}:</strong> {hoverDef.definition}
                </div>
            )}
        </>
    );
};

export default HoverDefinition;
