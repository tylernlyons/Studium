'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./Card";

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  // Initialize timer from localStorage on mount
  useEffect(() => {
    const storedDuration = localStorage.getItem("studyDuration"); // In minutes
    const storedStart = localStorage.getItem("studyStart");       // In ms (timestamp)

    const duration = storedDuration ? parseInt(storedDuration) * 60 : 0; // Convert to seconds
    const start = storedStart ? parseInt(storedStart) : null;

    if (duration > 0 && start) {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(duration - elapsed, 0);
      setTimeLeft(remaining);

      // If time is up
      if (remaining <= 0) {
        setIsComplete(true);
        setIsActive(false);
      }
    } else {
      // If no valid session found
      setTimeLeft(0);
      setIsActive(false);
    }
  }, []);

  // Countdown interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timeLeft !== null && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev <= 1) {
            clearInterval(intervalId);
            setIsActive(false);
            setIsComplete(true);
            return 0;
          }
          return prev! - 1;
        });
      }, 1000); // Decrease every second
    }

    return () => clearInterval(intervalId); // Cleanup
  }, [isActive, timeLeft]);

  // Ends session early
  const handleEndSession = () => {
    setIsActive(false);
    setIsComplete(true);
    localStorage.removeItem("studyStart");
    localStorage.removeItem("studyDuration");
  };

  const minutes = timeLeft !== null ? Math.floor(timeLeft / 60) : 0;
  const seconds = timeLeft !== null ? timeLeft % 60 : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 m-5">
      <Card>
        <div className="flex flex-col bg-white items-center justify-center p-10">
          {isComplete ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-500 p-6">Session Complete!</h2>
              <button
                onClick={() => router.push("/")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">
                Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
              </h2>
              <button
                onClick={handleEndSession}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                End Session
              </button>
            </>
          )}
        </div>
      </Card>
    </div>
  );

};

export default StudyTimer;
