import React, { useEffect, useState } from "react";

// Gallery images sourced from the public/Gallery folder.
// Note: browsers may not display HEIC; we filter to common web-friendly formats.
const galleryFiles = [
  "/Gallery/DSC07003.jpg",
  "/Gallery/MVI_0057.00_00_22_44.Still003-2.jpg",
  "/Gallery/IMG_2218.jpg",
  "/Gallery/IMG_2226.jpg",
  "/Gallery/IMG_8639.jpg",
  "/Gallery/DSC06812.jpg",
  "/Gallery/DSC06724.jpg",
  "/Gallery/DSC06711.jpg",
  "/Gallery/20240926_222034.jpg",
  "/Gallery/IMG20241117150206.jpg",
  "/Gallery/DSC06854.jpg",
  "/Gallery/DSC06674.jpg",
  "/Gallery/DSC07005.jpg",
  "/Gallery/DSC_0092-Enhanced-NR.jpg",
  "/Gallery/IMG_2562.JPG",
  "/Gallery/IMG_0297.jpg",
];

// Keep only common web formats (jpg/jpeg/png/gif/webp) — HEIC files are skipped to avoid display issues
const webImages = galleryFiles.filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f));

// Shuffle helper
function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Shuffle and select up to 20 images. We'll display a 4-column grid (4x4 or 4x5 depending on available images).
const shuffledImages = shuffle(webImages);
const MAX_IMAGES = 20; // prefer up to 20 (4x5), will fall back to available count

// Compute breathingImages once per module load (deterministic per session)
const breathingImages = (() => shuffledImages.slice(0, Math.min(shuffledImages.length, MAX_IMAGES)))();

const ResponsiveBreathingGrid: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pick one image to enlarge every few seconds
  useEffect(() => {
    if (prefersReducedMotion) {
      // No breathing motion for users who prefer reduced motion
      setActive(null);
      return;
    }

    const changeActive = () => {
      const newIndex = Math.floor(Math.random() * breathingImages.length);
      setActive(newIndex);
    };

    changeActive();
    const intervalMs = 3500; // slower to reduce CPU
    const interval = setInterval(changeActive, intervalMs);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver to lazy-load images (use data-src to avoid initial fetch)
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-src]'));
    if (!imgs.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              // Prioritize the active image
              if (img.dataset.index && Number(img.dataset.index) === active) {
                img.setAttribute('fetchpriority', 'high');
              } else {
                img.setAttribute('fetchpriority', 'low');
              }
              img.src = dataSrc;
              img.removeAttribute('data-src');
              // allow browser to decode async
              img.decoding = 'async';
            }
            io.unobserve(img);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    imgs.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [active]);

  // Determine how many images to render to create a 4-column layout
  const cols = 4;
  const maxToShow = Math.min(breathingImages.length, cols * 5); // up to 4x5
  const imagesToShow = breathingImages.slice(0, maxToShow);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 transition-all duration-700 ease-in-out auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]"
      >
        {imagesToShow.map((src, i) => {
          const isActive = i === active;

          // Use transform scale rather than changing grid spans to avoid layout reflow
          const transform = isActive ? "scale(1.08) translateY(-8px)" : "scale(1) translateY(0)";
          const shadow = isActive
            ? "0 18px 40px rgba(56,189,248,0.18), 0 10px 30px rgba(2,6,23,0.6)"
            : "0 0 0 rgba(0,0,0,0)";

          return (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center will-change-transform transform-gpu transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                isActive ? "z-20" : "z-10"
              }`}
              style={{
                transformOrigin: "center",
                transitionDelay: isActive ? "0s" : "0s",
                transform,
                boxShadow: shadow,
                minHeight: 160,
              }}
            >
              {/* Use a tiny placeholder src and store the real src in data-src; IntersectionObserver will swap it in */}
              <img
                data-src={src}
                data-index={String(i)}
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                alt={`Gallery image ${i + 1}`}
                className="object-cover w-full h-full select-none pointer-events-auto"
                draggable={false}
                onError={(e) => {
                  // If an image fails to load, hide it gracefully
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                }}
              />
              {/* subtle caption on hover */}
              <div className="absolute inset-0 flex items-end p-3 pointer-events-none">
                <div className="w-full bg-gradient-to-t from-black/50 to-transparent text-white text-sm rounded-md p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Photo
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight text-center">
        Life at MUJ ACM
      </h1>
      <ResponsiveBreathingGrid />
    </div>
  );
};

export default GalleryPage;
