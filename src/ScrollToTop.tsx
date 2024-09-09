import { useEffect, useRef } from "react";
import { useLocation, useNavigation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  const dummy = useRef<any>();

  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [pathname, search]);

  return (
    <div>
      <span ref={dummy}></span>
    </div>
  );
}
