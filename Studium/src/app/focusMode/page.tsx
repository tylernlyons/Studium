'use client';
import usePreventExit from '@/hooks/usePreventExit';
import preventBackNavigation from '@/hooks/usePreventBackNav';
import StudySets from '@/components/StudySets';



export default function StudySession() {


  usePreventExit();
  preventBackNavigation();

  return (
    <div className="relative">
      <>
        <StudySets />
      </>
    </div>
  );
}
