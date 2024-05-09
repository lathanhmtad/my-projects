import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTo({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return <>{children}</>;
}

export default ScrollToTo;
