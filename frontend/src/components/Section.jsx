import { useRef, useEffect, useState } from "react";

export default function Section({ children, threshold = 0.1 }) {
  const ref = useRef(null);
  // Start visible to avoid content being hidden before the observer initializes
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // rootMargin accounts for the fixed header so elements become visible slightly earlier
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold, rootMargin: "-120px 0px -10px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform will-change-transform
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
    >
      {children}
    </div>
  );
}
