'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const StudyTimer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const durationParam = searchParams.get("duration");
  const initialDuration = durationParam ? parseInt(durationParam) : 0;

  const [timeLeft, setTimeLeft] = useState(initialDuration * 60);
  const [isActive, setIsActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setIsActive(false);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  const handleEndSession = () => {
    setIsActive(false);
    setIsComplete(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center">
      {isComplete ? (
        <div className="text-center">
          <h1 className="">Session Complete!</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <>
          <h2 className="">Time Left</h2>
          <div className="">
            {minutes}m {seconds}s
          </div>
          <button
            onClick={handleEndSession}
            className="bg-red-500"
          >
            End Session
          </button>
        </>
      )}
    </div>
  );
};

export default StudyTimer;
