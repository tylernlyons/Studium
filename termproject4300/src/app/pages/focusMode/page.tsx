'use client';
import usePreventExit from '../../../hooks/usePreventExit';
import preventBackNavigation from '../../../hooks/usePreventBackNav';
import StudyTimer from '@/components/StudyTimer';
import StudySets from '@/components/StudySets';
import HoverDefinition from '@/components/HoverDefinition';


export default function StudySession() {


  usePreventExit();
  preventBackNavigation();

  return (
    <div className="relative">
        <>
          <StudyTimer />
          <StudySets />
          <HoverDefinition />
        </>
    </div>
  );
}
