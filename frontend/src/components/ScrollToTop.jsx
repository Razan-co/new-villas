import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Wait for route to render
    setTimeout(() => {
      const locoContainer = document.querySelector("[data-scroll-container]");
      if (locoContainer) {
        locoContainer.scrollTo({ top: 0, behavior: "instant" });
      }

      // Also try normal window scroll
      window.scrollTo(0, 0);
    }, 50);
  }, [pathname]);

  return null;
}
