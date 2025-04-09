"use client"

import { useState, useEffect } from 'react';
import CreateDefinition from "./CreateDefinition";

const HoverDefinition = () => {
    const [hoverDef, setHoverDef] = useState<{ word: string; definition: string; x: number; y: number } | null>(null);

    useEffect(() => {
        const handleMouseOver = async (event: MouseEvent) => {
            const selection = window.getSelection()?.toString().trim();
            if (selection) {
                const definition = await CreateDefinition(selection);
                setHoverDef({
                    word: selection,
                    definition,
                    x: event.pageX,
                    y: event.pageY,
                });
            }
        };

        const handleMouseLeave = () => {
            setHoverDef(null);
        };

        document.addEventListener('mouseup', handleMouseOver);
        document.addEventListener('mousedown', handleMouseLeave);

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
                    style={{ top: hoverDef.y, left: hoverDef.x }}
                >
                    <strong>{hoverDef.word}:</strong> {hoverDef.definition}
                </div>
            )}
        </>
    );
};

export default HoverDefinition;
