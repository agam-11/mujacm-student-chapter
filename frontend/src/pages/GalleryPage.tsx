import React, { useEffect } from "react";

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
  useEffect(() => {
    // IntersectionObserver to lazy-load images only on scroll
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-src]'));
    if (!imgs.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
              img.decoding = 'async';
            }
            io.unobserve(img);
          }
        });
      },
      { rootMargin: '500px 0px' }
    );

    imgs.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  // Display all images with no animation state
  const imagesToShow = breathingImages;

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]"
      >
        {imagesToShow.map((src, i) => {
          return (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                data-src={src}
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                alt={`Gallery image ${i + 1}`}
                className="object-cover w-full h-full select-none pointer-events-auto opacity-0 transition-opacity duration-700 ease-in-out"
                draggable={false}
                decoding="async"
                onLoad={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  if (el.src !== "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==") {
                    el.classList.remove('opacity-0');
                  }
                }}
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                }}
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight text-center">
        Life at MUJ ACM
      </h1>
      <ResponsiveBreathingGrid />
    </div>
  );
};

export default GalleryPage;
