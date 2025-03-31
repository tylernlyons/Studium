'use client';

import { useState } from "react";
import Link from "next/link";
import connectMongoDB from "../../../../config/mongodb";

export default function Home() {
  const [durationInput, setDurationInput] = useState("");
  const [studyDuration, setStudyDuration] = useState(0);
  connectMongoDB();


  const handleSetDuration = () => {
    const duration = parseInt(durationInput);
    if (isNaN(duration) || duration <= 0) {
      alert("Please enter a valid number of minutes.");
    } else {
      setStudyDuration(duration);
      setDurationInput("");
    }
  };


  const getFocusModeUrl = () => {
    if (studyDuration > 0) {
      return `/pages/focusMode?duration=${studyDuration}`;
    }
    return "#";
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h2>Set Your Study Duration</h2>
        <input
          type="number"
          value={durationInput}
          onChange={(e) => setDurationInput(e.target.value)}
          placeholder="Enter time in minutes"
        />
        <button onClick={handleSetDuration}>Set Duration</button>
      </div>

      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h3>Untracked study session:</h3>
        <Link href={'/pages/focusMode'}>
          <button>Start Study Session</button>
        </Link>
      </div>

      {studyDuration > 0 && (
        <div>
          <h3>Your study session will last for {studyDuration} minute(s)</h3>
          <Link href={getFocusModeUrl()}>
            <button>Start Study Session</button>
          </Link>
        </div>
      )}
    </div>
  );
}
