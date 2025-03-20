
import { useEffect } from "react";


const preventBackNavigation = () => {
    useEffect(() => {
      const handleHistory = () => {
        window.history.pushState(null, document.title, window.location.href);
        window.history.back();
      };
  
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener("popstate", handleHistory);
  
      return () => {
        window.removeEventListener("popstate", handleHistory);
      };
    }, []);
  };
  
  export default preventBackNavigation;