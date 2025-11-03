import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

// const getCurrentDate = () => new Date(); // Use actual current date

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

export const events: Event[] = [
  {
    id: "1",
    title: "Research Paper Talk",
    date: "2024-06-14",
    desc: "A session focused on discussing research papers and presentation skills.",
    category: "Talk",
  },
  {
    id: "2",
    title: "Code Carosal",
    date: "2024-08-29",
    desc: "Coding event with multiple programming challenges.",
    category: "Competition",
  },
  {
    id: "3",
    title: "ELICIT",
    date: "2024-09-27",
    desc: "Annual tech fest featuring multiple technical and creative events.",
    category: "Hackathon",
  },
  {
    id: "4",
    title: "IF CODES WERE SONGS",
    date: "2024-09-28",
    desc: "A creative coding competition with a musical theme.",
    category: "Competition",
  },
  {
    id: "5",
    title: "Hacks 9.0",
    date: "2024-09-28",
    desc: "Flagship hackathon bringing together innovators and coders.",
    category: "Hackathon",
  },
  {
    id: "6",
    title: "Games Asylum",
    date: "2024-09-28",
    desc: "Gaming competition event for enthusiasts.",
    category: "Competition",
  },
  {
    id: "7",
    title: "Robo Soccer",
    date: "2024-09-28",
    desc: "Robotics competition featuring soccer-playing bots.",
    category: "Competition",
  },
  {
    id: "8",
    title: "Hack The Box",
    date: "2024-09-28",
    desc: "Cybersecurity and ethical hacking challenge.",
    category: "Hackathon",
  },
  {
    id: "9",
    title: "Kagglethon",
    date: "2024-09-28",
    desc: "Machine learning and data science competition.",
    category: "Competition",
  },
  {
    id: "10",
    title: "SwapBoard",
    date: "2024-09-28",
    desc: "Interactive coding and idea exchange event.",
    category: "Networking",
  },
  {
    id: "11",
    title: "Drone Show",
    date: "2024-09-29",
    desc: "Drone demonstration and aerial innovation showcase.",
    category: "Competition",
  },
  {
    id: "12",
    title: "Degree in a Day",
    date: "2024-09-29",
    desc: "Fast-paced technical learning challenge.",
    category: "Workshop",
  },
  {
    id: "13",
    title: "Tech Quiz",
    date: "2024-11-08",
    desc: "Multi-day technology quiz competition.",
    category: "Competition",
  },
  {
    id: "14",
    title: "Tech Summit Centrail",
    date: "2024-11-15",
    desc: "Major technical conference and innovation showcase.",
    category: "Talk",
  },
  {
    id: "15",
    title: "Tech To Rescue",
    date: "2024-11-24",
    desc: "Event focused on using technology for social impact.",
    category: "Talk",
  },
  {
    id: "16",
    title: "Animation Workshop",
    date: "2024-12-15",
    desc: "Online creative animation learning session.",
    category: "Workshop",
  },
  {
    id: "17",
    title: "Digital Art / Animation Competition",
    date: "2024-12-27",
    desc: "Competition showcasing digital art and animation skills.",
    category: "Competition",
  },
  {
    id: "18",
    title: "Capture the Flag",
    date: "2025-01-18",
    desc: "Cybersecurity-based problem-solving competition.",
    category: "Competition",
  },
  {
    id: "19",
    title: "E-Sport Night",
    date: "2025-02-01",
    desc: "Evening of competitive gaming and esports.",
    category: "Competition",
  },
  {
    id: "20",
    title: "Snap Syntax",
    date: "2025-03-22",
    desc: "Coding contest to test programming logic and speed.",
    category: "Competition",
  },
  {
    id: "21",
    title: "April DevCon",
    date: "2025-04-05",
    desc: "Developer conference with sessions and coding challenges.",
    category: "Workshop",
  },
  {
    id: "22",
    title: "I-CAN",
    date: "2025-04-05",
    desc: "Innovation and creativity networking event.",
    category: "Networking",
  },
  {
    id: "23",
    title: "Coding Bootcamp",
    date: "2025-04-05",
    desc: "Hands-on coding and skill-building workshop.",
    category: "Workshop",
  }
];



// Mark past/upcoming based on today
// const today = getCurrentDate();
// const eventsWithStatus = events.map((ev) => {
//   const evDate = new Date(ev.date);
//   return { ...ev, isPast: evDate < today };
// });

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
  <div className="group relative rounded-2xl shadow-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-4 flex flex-col hover:border-cyan-400/50 transition-all duration-300 hover:shadow-cyan-500/20 hover:shadow-xl min-h-[200px]">
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

  </div>
);

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<Event["category"] | "all">("all");

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((ev) => ev.category === filter);

  const categories: Event["category"][] = [
    "Workshop",
    "Hackathon",
    "Talk",
    "Networking",
    "Competition",
  ];

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
  }, [filter]);

  return (
    <section className="w-full py-20 px-4 md:px-12 lg:px-24 relative min-h-screen">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Events</h1>
        <div className="glass-light inline-block px-6 py-4 rounded-lg mb-6">
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join us for workshops, talks, hackathons, and networking events
            designed to level up your skills.
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

      {/* All events */}
      <div>
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            No events in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPage;
