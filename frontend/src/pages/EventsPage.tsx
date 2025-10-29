import React, { useEffect } from "react";

const getCurrentDate = () => new Date("2025-10-23"); // For demo, set to Oct 23, 2025

const events = [
  {
    id: "ev1",
    title: "Hackathon 24H",
    date: "Mar 12, 2025",
    desc: "An intense 24-hour coding sprint where students build prototypes and win prizes.",
  },
  {
    id: "ev2",
    title: "TechTalks: Web3",
    date: "Apr 02, 2025",
    desc: "Industry speakers share practical insights on Web3 and decentralized applications.",
  },
  {
    id: "ev3",
    title: "Design Sprint",
    date: "May 18, 2025",
    desc: "A hands-on weekend workshop focused on UX, rapid prototyping and user testing.",
  },
  {
    id: "ev4",
    title: "Routing & DevOps Night",
    date: "Jun 05, 2025",
    desc: "Learn how to set up CI/CD, containerize apps and deploy to the cloud.",
  },
  {
    id: "ev5",
    title: "Women in Tech Panel",
    date: "Jul 10, 2025",
    desc: "A panel highlighting women leaders in technology and career growth advice.",
  },
  {
    id: "ev6",
    title: "Open Source Day",
    date: "Aug 21, 2025",
    desc: "Pair up, pick beginner-friendly issues and get mentored by experienced contributors.",
  },
  // Upcoming events for testing
  {
    id: "ev7",
    title: "AI Bootcamp",
    date: "Nov 05, 2025",
    desc: "A hands-on bootcamp on AI/ML with real-world projects and expert mentors.",
  },
  {
    id: "ev8",
    title: "Cybersecurity Workshop",
    date: "Nov 20, 2025",
    desc: "Learn the latest in ethical hacking, network security, and defense strategies.",
  },
  {
    id: "ev9",
    title: "Winter CodeFest",
    date: "Dec 10, 2025",
    desc: "A festive coding marathon with prizes, snacks, and fun challenges.",
  },
  {
    id: "ev10",
    title: "New Year Tech Gala",
    date: "Jan 15, 2026",
    desc: "Kick off the new year with tech talks, networking, and celebration!",
  },
];

// Mark past/upcoming based on today
const today = getCurrentDate();
const eventsWithStatus = events.map((ev) => {
  const evDate = new Date(ev.date);
  return { ...ev, isPast: evDate < today };
});

const EventsPage: React.FC = () => {
  const upcomingEvents = eventsWithStatus.filter((ev) => !ev.isPast);
  const pastEvents = eventsWithStatus.filter((ev) => ev.isPast);

  // Only entrance animation and border pulse
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLDivElement>(".upcoming-card")
    );
    if (!cards.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full py-20 px-4 md:px-12 lg:px-24 bg-transparent relative min-h-[700px]">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-cyan-400 text-center tracking-tight">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
        {upcomingEvents.map((ev, idx) => (
          <div
            key={ev.id}
            className="upcoming-card relative rounded-2xl shadow-2xl border border-cyan-500 bg-[#10172a]/80 backdrop-blur-md px-8 py-8 flex flex-col items-center justify-center overflow-hidden"
            style={{
              minHeight: "320px",
              minWidth: "260px",
              maxWidth: "340px",
              animationDelay: `${idx * 120}ms`,
            }}
          >
            <span className="font-bold text-2xl text-cyan-300 tracking-wide text-center mb-2 drop-shadow-lg">
              {ev.title}
            </span>
            <span className="text-base px-3 py-1 rounded bg-cyan-900/40 text-cyan-200 font-semibold mb-4 shadow">
              {ev.date}
            </span>
            <div className="text-base text-cyan-100 text-center mb-6 opacity-90">
              {ev.desc}
            </div>
            <button className="mt-2 px-5 py-2 rounded bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-900 text-white font-bold shadow flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              View Details
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        ))}
      </div>
      {/* Past events grid */}
      <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
        Past Events
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {pastEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-[#10172a] border border-cyan-700 rounded-xl shadow-lg px-6 py-6 flex flex-col items-center justify-center opacity-70 grayscale"
          >
            <span className="font-bold text-lg text-gray-300 mb-2 text-center">
              {ev.title}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-cyan-900/40 text-cyan-200 font-semibold mb-2">
              {ev.date}
            </span>
            <div className="text-base text-gray-400 text-center mb-2">
              {ev.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsPage;

/*
Add to your CSS for card-3d effect:
.card-3d {
  will-change: transform;
}
.card-glare {
  transition: background 0.3s;
}
*/
