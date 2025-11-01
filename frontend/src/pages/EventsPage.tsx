import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const getCurrentDate = () => new Date("2025-10-23"); // For demo, set to Oct 23, 2025

interface Event {
  id: string;
  title: string;
  date: string;
  desc: string;
  category: "Workshop" | "Hackathon" | "Talk" | "Networking" | "Competition";
  location?: string;
  time?: string;
  isPast?: boolean;
}

const events: Event[] = [
  {
    id: "ev1",
    title: "Hackathon 24H",
    date: "Mar 12, 2025",
    time: "9:00 AM - 9:00 AM",
    location: "Main Auditorium",
    desc: "An intense 24-hour coding sprint where students build prototypes and win prizes.",
    category: "Hackathon",
  },
  {
    id: "ev2",
    title: "TechTalks: Web3",
    date: "Apr 02, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Seminar Hall A",
    desc: "Industry speakers share practical insights on Web3 and decentralized applications.",
    category: "Talk",
  },
  {
    id: "ev3",
    title: "Design Sprint",
    date: "May 18, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Design Lab",
    desc: "A hands-on weekend workshop focused on UX, rapid prototyping and user testing.",
    category: "Workshop",
  },
  {
    id: "ev4",
    title: "Routing & DevOps Night",
    date: "Jun 05, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Tech Hub",
    desc: "Learn how to set up CI/CD, containerize apps and deploy to the cloud.",
    category: "Workshop",
  },
  {
    id: "ev5",
    title: "Women in Tech Panel",
    date: "Jul 10, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Main Hall",
    desc: "A panel highlighting women leaders in technology and career growth advice.",
    category: "Networking",
  },
  {
    id: "ev6",
    title: "Open Source Day",
    date: "Aug 21, 2025",
    time: "11:00 AM - 5:00 PM",
    location: "Computer Lab",
    desc: "Pair up, pick beginner-friendly issues and get mentored by experienced contributors.",
    category: "Workshop",
  },
  {
    id: "ev7",
    title: "AI Bootcamp",
    date: "Nov 05, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "ML Lab",
    desc: "A hands-on bootcamp on AI/ML with real-world projects and expert mentors.",
    category: "Workshop",
  },
  {
    id: "ev8",
    title: "Cybersecurity Workshop",
    date: "Nov 20, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "Security Lab",
    desc: "Learn the latest in ethical hacking, network security, and defense strategies.",
    category: "Workshop",
  },
  {
    id: "ev9",
    title: "Winter CodeFest",
    date: "Dec 10, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Main Campus",
    desc: "A festive coding marathon with prizes, snacks, and fun challenges.",
    category: "Competition",
  },
  {
    id: "ev10",
    title: "New Year Tech Gala",
    date: "Jan 15, 2026",
    time: "6:00 PM - 10:00 PM",
    location: "Banquet Hall",
    desc: "Kick off the new year with tech talks, networking, and celebration!",
    category: "Networking",
  },
];

// Mark past/upcoming based on today
const today = getCurrentDate();
const eventsWithStatus = events.map((ev) => {
  const evDate = new Date(ev.date);
  return { ...ev, isPast: evDate < today };
});

// Category badge colors
const categoryColors: Record<Event["category"], string> = {
  Workshop: "bg-blue-500/30 text-blue-200 border-blue-400/30",
  Hackathon: "bg-purple-500/30 text-purple-200 border-purple-400/30",
  Talk: "bg-green-500/30 text-green-200 border-green-400/30",
  Networking: "bg-orange-500/30 text-orange-200 border-orange-400/30",
  Competition: "bg-red-500/30 text-red-200 border-red-400/30",
};

// Event card component
const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <div className="group relative rounded-2xl shadow-lg border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-6 flex flex-col hover:border-cyan-400/50 transition-all duration-300 hover:shadow-cyan-500/20 hover:shadow-xl min-h-[320px]">
    {/* Category badge */}
    <div className="absolute top-4 right-4">
      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryColors[event.category]}`}>
        {event.category}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 pr-24">
      {event.title}
    </h3>

    {/* Date & Time */}
    <div className="flex items-center gap-2 text-cyan-300 text-sm mb-1">
      <span>📅</span>
      <span>{event.date}</span>
    </div>

    {/* Time */}
    {event.time && (
      <div className="flex items-center gap-2 text-cyan-300 text-sm mb-1">
        <span>🕐</span>
        <span>{event.time}</span>
      </div>
    )}

    {/* Location */}
    {event.location && (
      <div className="flex items-center gap-2 text-cyan-300 text-sm mb-4">
        <span>📍</span>
        <span>{event.location}</span>
      </div>
    )}
    {/* Description */}
    <p className="text-gray-200 text-sm flex-grow mb-4">
      {event.desc}
    </p>

    {/* Register button */}
    <button className="mt-auto w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105">
      Register Now
    </button>
  </div>
);

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<Event["category"] | "all">("all");
  const [showPast, setShowPast] = useState(false);

  const upcomingEvents = eventsWithStatus.filter((ev) => !ev.isPast);
  const pastEvents = eventsWithStatus.filter((ev) => ev.isPast);

  const filteredUpcoming = filter === "all" 
    ? upcomingEvents 
    : upcomingEvents.filter((ev) => ev.category === filter);

  const filteredPast = filter === "all" 
    ? pastEvents 
    : pastEvents.filter((ev) => ev.category === filter);

  const categories: Event["category"][] = ["Workshop", "Hackathon", "Talk", "Networking", "Competition"];

  // Entrance animation
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLDivElement>(".event-card")
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
  }, [filter, showPast]);

  return (
    <section className="w-full py-20 px-4 md:px-12 lg:px-24 relative min-h-screen">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Events</h1>
        <div className="glass-light inline-block px-6 py-4 rounded-lg mb-6">
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Join us for workshops, talks, hackathons, and networking events designed to level up your skills.
        </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            filter === "all"
              ? "bg-cyan-500 text-white shadow-lg"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          All Events
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              filter === cat
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Upcoming events */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Upcoming Events
        </h2>
        {filteredUpcoming.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No upcoming events in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
            {filteredUpcoming.map((event) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past events toggle */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowPast(!showPast)}
          className="px-8 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300"
        >
          {showPast ? "Hide" : "Show"} Past Events ({pastEvents.length})
        </button>
      </div>

      {/* Past events */}
      {showPast && (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center opacity-70">
            Past Events
          </h2>
          {filteredPast.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No past events in this category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredPast.map((event) => (
                <div key={event.id} className="event-card opacity-60 grayscale">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default EventsPage;
