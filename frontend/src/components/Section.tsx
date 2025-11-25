import { useRef, useEffect, useState, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  threshold?: number;
}

export default function Section({ children, threshold = 0 }: SectionProps) {
  const ref = useRef(null);
  // Start hidden for animation
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger once: if intersecting, set visible and disconnect
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      // Trigger as soon as any part is visible
      { threshold, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform will-change-transform
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
    >
      {children}
    </div>
  );
}
