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
  const [sessionActive, setSessionActive] = useState(true);

  usePreventExit();
  preventBackNavigation();

  return (
    <div className="relative">
        <>
          <StudyTimer />
          <StudySet />
          <HoverDefinition />
        </>
    </div>
  );
}
