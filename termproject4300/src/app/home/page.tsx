'use client';

import { useState } from "react";
import Link from "next/link";
import connectMongoDB from "../../../config/mongodb";

export default function Home() {
  const [durationInput, setDurationInput] = useState("");
  const [studyDuration, setStudyDuration] = useState(0);


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
      return `/focusMode?duration=${studyDuration}`;
    }
    return "#";
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center text-white"
      style={{
        background: "radial-gradient(circle at center, rgba(71, 121, 196, 1) 0%, rgba(2, 0, 36, 1) 100%)"
      }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 flex flex-col items-center w-[90%] max-w-md space-y-6">
        
      
        <h2 className="text-3xl font-bold text-white-700 mb-8">Set Your Study Duration</h2>
      
        <input
          type="number"
          value={durationInput}
          onChange={(e) => setDurationInput(e.target.value)}
          placeholder="Enter time in minutes"
          className="text-white text-center px-10 py-2 rounded-lg w-65 outline-none"
        />

        
        <button
          onClick={handleSetDuration}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-2 rounded-full"
        >
          Set Duration
        </button>

        {studyDuration > 0 && (      
        <Link href={getFocusModeUrl()}>
            <button className="bg-green-500 text-white justify-center px-6 py-2 rounded shadow hover:bg-green-600 transition">
              Start Study Session</button>
        </Link>
        )}

        {/* Untimed Option */}
        <div className="text-center pt-2">
          <p className="text-sm text-white/80 mb-1">Or start an untimed session:</p>
          <Link href="/focusMode">
            <button className="bg-blue-400 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition">
              Start Study Session
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}