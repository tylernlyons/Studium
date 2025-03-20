import { useState, useEffect } from "react";

interface StudyTimerProps {
    duration: number; 
    onComplete: () => void; 
  }
  
  const StudyTimer: React.FC<StudyTimerProps> = ({ duration, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(duration * 60); 
  
    useEffect(() => {
      
      setTimeLeft(duration * 60);
  
      const intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId); 
            onComplete(); 
            return 0;
          }
          return prev - 1; 
        });
      }, 1000);
  
      return () => clearInterval(intervalId); 
    }, [duration, onComplete]);
  
    const minutes = Math.floor(timeLeft / 60); 
    const seconds = timeLeft % 60; 
  
    return (
      <div>
        <h2>Time Left: {minutes}m {seconds}s</h2>
      </div>
    );
  };
  
  export default StudyTimer;