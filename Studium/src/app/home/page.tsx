'use client';

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [durationInput, setDurationInput] = useState("");
  const [studyDuration, setStudyDuration] = useState(0);

  const handleSetDuration = () => {
    const duration = parseInt(durationInput);
    const now = Date.now();
    localStorage.setItem("studyStart", now.toString());
    localStorage.setItem("studyDuration", duration.toString());
    if (isNaN(duration) || duration <= 0) {
      alert("Please enter a valid number of minutes.");
    } else {
      localStorage.setItem("studyDuration", duration.toString()); // ✅ save to localStorage
      setStudyDuration(duration);
      setDurationInput("");
    }
  };

  return (
    <div className="app-shell flex items-center justify-center">
      <div className="app-panel p-8 md:p-10 flex flex-col items-center w-[92%] max-w-md space-y-6 text-[#1b2d48]">
        <h2 className="text-3xl font-bold mb-2">Set Your Study Duration</h2>

        <input
          type="number"
          value={durationInput}
          onChange={(e) => setDurationInput(e.target.value)}
          placeholder="Enter time in minutes"
          className="app-input text-center"
        />

        <button
          onClick={handleSetDuration}
          className="app-btn-primary w-full"
        >
          Set Duration
        </button>

        {studyDuration > 0 && (
          <Link href="/focusMode" className="w-full">
            <button className="app-btn-secondary w-full">
              Start Study Session
            </button>
          </Link>
        )}

        <div className="text-center pt-2">
          <p className="text-sm text-[#3f5d86] mb-2">Or start an untimed session:</p>
          <Link href="/focusMode">
            <button className="app-btn-secondary">
              Start Study Session
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
