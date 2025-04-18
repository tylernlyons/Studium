import { useEffect } from "react";

const preventBackNavigation = () => {
  useEffect(() => {
    const handleHistory = () => {
      // Push the current page back onto the history stack to prevent backward navigation
      window.history.pushState(null, document.title, window.location.href);
      window.history.back(); // Force it to go "forward" again
    };

    // Push current state once to initialize
    window.history.pushState(null, document.title, window.location.href);

    // Listen for back button navigation
    window.addEventListener("popstate", handleHistory);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("popstate", handleHistory);
    };
  }, []);
};

export default preventBackNavigation;
