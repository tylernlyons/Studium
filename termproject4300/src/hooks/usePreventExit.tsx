
import { useEffect } from 'react'

const usePreventExit = () => {
    useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        const message = "Are you sure you want to leave? Your study session will be lost.";
        e.returnValue = message; 
        return message; 
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);
  };
  
  export default usePreventExit;