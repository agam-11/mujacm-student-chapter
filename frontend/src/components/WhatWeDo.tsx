export default function WhatWeDo() {
  const items = [
    {
      title: "Workshops & Seminars",
      desc: "Learn new skills like Web Dev, ML, and more through hands-on sessions.",
      // simple SVG for a presentation / learning icon
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-12 h-12 text-blue-400"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v4M16 3v4M12 12v6" />
        </svg>
      ),
    },
    {
      title: "Coding Competitions",
      desc: "Compete in hackathons and competitive programming events to sharpen skills.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-12 h-12 text-yellow-400"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 6.26L20 9l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.64 4 9l5.91-.74L12 2z" />
        </svg>
      ),
    },
    {
      title: "Projects & Research",
      desc: "Collaborate on real-world projects and contribute to research papers.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-12 h-12 text-green-400"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3v7h10v-7h3a1 1 0 001-1V7L12 3 3 7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6v4H9z" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-labelledby="what-we-do" className="py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 id="what-we-do" className="text-2xl sm:text-3xl font-semibold mb-6 text-white">
          What We Do
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{it.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{it.title}</h4>
                  <p className="mt-1 text-gray-300 text-sm">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
