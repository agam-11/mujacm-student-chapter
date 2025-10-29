import React, { useEffect, useState } from "react";

const images = [
  "/public/bg.jpeg",
  "/public/acm.png",
  "/public/42.png",
  "/public/acmblue.png",
  "/public/images (1).png",
  "/public/download.png",
  "/public/bg.png",
  "/public/vite.svg",
];

const collageImages = [
  ...images,
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
];

const breathingImages = collageImages.slice(0, 20);

const ResponsiveBreathingGrid: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  // Pick one image to enlarge every few seconds
  useEffect(() => {
    const changeActive = () => {
      const newIndex = Math.floor(Math.random() * breathingImages.length);
      setActive(newIndex);
    };

    changeActive();
    const interval = setInterval(changeActive, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div
        className="grid gap-3 md:gap-4 transition-all duration-700 ease-in-out"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gridAutoRows: "minmax(130px, 1fr)",
        }}
      >
        {breathingImages.map((src, i) => {
          const isActive = i === active;

          return (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center transition-all duration-[2200ms] ease-[cubic-bezier(.25,.8,.25,1)] ${
                isActive ? "z-20" : "z-10"
              }`}
              style={{
                transformOrigin: "center",

                gridColumn: isActive ? "span 2" : undefined,
                gridRow: isActive ? "span 2" : undefined,
                transitionDelay: isActive ? "0s" : "0.2s",
                transitionTimingFunction: isActive
                  ? "cubic-bezier(.22,1,.36,1)"
                  : "cubic-bezier(.25,.8,.25,1)", // slower ease-out for shrinking
                transform: isActive
                  ? "scale(1.06) translateY(-4px)"
                  : "scale(0.98) translateY(0)",
                boxShadow: isActive
                  ? "0 0 25px rgba(56,189,248,0.3), 0 0 50px rgba(56,189,248,0.15)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
            >
              <img
                src={src}
                alt={`Image ${i}`}
                className="object-cover w-full h-full min-h-[120px] min-w-[120px] select-none pointer-events-none transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)]"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#172554] py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-10 tracking-tight text-center">
        Gallery
      </h1>
      <p className="mb-8 text-cyan-200/80 text-center max-w-xl">
        A glimpse of life at MUJ ACM.
      </p>
      <ResponsiveBreathingGrid />
    </div>
  );
};

export default GalleryPage;
