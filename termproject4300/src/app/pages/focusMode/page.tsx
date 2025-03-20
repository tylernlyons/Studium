'use client';
import { useSearchParams } from 'next/navigation';
import usePreventExit from '../../../hooks/usePreventExit';
import preventBackNavigation from '../../../hooks/usePreventBackNav';
import { useState, useEffect } from 'react';
import StudyTimer from '../../../components/studyTimer';
import createDefinition from '@/components/createDefinition';
import StudySet from '@/components/studySet';

export default function StudySession() {
  const searchParams = useSearchParams();
  const [studyDuration, setStudyDuration] = useState(0);
  const [sessionActive, setSessionActive] = useState(true);
  
  const [hoverDef, setHoverDef] = useState<{ word: string; definition: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const duration = searchParams.get('duration');
    if (duration) {
      setStudyDuration(parseInt(duration));
    }
  }, [searchParams]);

  
  

  const handleDoubleClick = async (event: React.MouseEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      const definition = await createDefinition(selection);
      setHoverDef({
        word: selection,
        definition,
        x: event.pageX,
        y: event.pageY,
      });
      onmousemove = () => {setHoverDef(null)}
    }
  };
 
  usePreventExit();
  preventBackNavigation();

  return (
    <div onDoubleClick={handleDoubleClick} className="relative">
      {sessionActive ? (
        <>
          <h1>Study Session</h1>
          <StudyTimer duration={studyDuration} onComplete={() => setSessionActive(false)} />
          <StudySet />
          <button onClick={() => setSessionActive(false)}>End Session</button>
        </>
      ) : (
        <h1>Your study session is complete!</h1>
      )}

      {hoverDef && (
        <div
          className="absolute bg-gray-800 text-white p-2 rounded shadow-lg"
          style={{ top: hoverDef.y, left: hoverDef.x }}
        >
          <strong>{hoverDef.word}:</strong> {hoverDef.definition}
        </div>
      )}
    </div>
  );
}
