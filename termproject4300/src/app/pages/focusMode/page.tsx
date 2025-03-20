'use client';
import { useSearchParams } from 'next/navigation';
import usePreventExit from '../../../hooks/usePreventExit';
import preventBackNavigation from '../../../hooks/usePreventBackNav';
import { useState, useEffect } from 'react';
import StudyTimer from '@/components/StudyTimer';
import StudySet from '@/components/StudySet';
import HoverDefinition from '@/components/HoverDefinition';

export default function StudySession() {
  const searchParams = useSearchParams();
  const [studyDuration, setStudyDuration] = useState(0);
  const [sessionActive, setSessionActive] = useState(true);


  useEffect(() => {
    const duration = searchParams.get('duration');
    if (duration) {
      setStudyDuration(parseInt(duration));
    }
  }, [searchParams]);

  usePreventExit();
  preventBackNavigation();

  return (
    <div className="relative">
      {sessionActive ? (
        <>
          <h1>Study Session</h1>
          <StudyTimer duration={studyDuration} onComplete={() => setSessionActive(false)} />
          <StudySet />
          <HoverDefinition />
          <button onClick={() => setSessionActive(false)}>End Session</button>
        </>
      ) : (
        <h1>Your study session is complete!</h1>
      )}


    </div>
  );
}
