import { useEffect } from 'react'

// Hook to prevent the user from closing or refreshing the page during an active session
const usePreventExit = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "Are you sure you want to leave? Your study session will be lost.";
      e.preventDefault(); 
      e.returnValue = '';
      return message;     // Some older browsers may show this, but most ignore it now
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default usePreventExit;
