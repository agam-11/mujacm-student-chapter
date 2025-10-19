import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

const teamMembers = [
  {
    name: "Riya Sharma",
    role: "President",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Aditya Mehta",
    role: "Lead Developer",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Priya Verma",
    role: "Design Head",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Karan Patel",
    role: "Event Coordinator",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Neha Gupta",
    role: "Marketing Lead",
    img: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    name: "Arjun Singh",
    role: "Tech Advisor",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const TeamSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, teamMembers.length);

    let ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      // Initial positions — stacked and faded
      gsap.set(cards, {
        opacity: 0,
        scale: 0.7,
        y: 40,
      });

      // Simple fade-in and scale-up animation
      gsap.to(cards, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen text-white"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-wide text-cyan-400">
        Meet Our Team
      </h2>

      <div className="relative w-full max-w-6xl min-h-[400px] flex flex-wrap gap-8 items-center justify-center overflow-visible">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="w-56 h-72 bg-gradient-to-br from-[#111827]/80 to-[#1e293b]/80 backdrop-blur-xl rounded-2xl shadow-2xl border-4 border-transparent flex flex-col items-center justify-center transition-all duration-500 cursor-pointer hover:scale-105 hover:border-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_40px_#06b6d4] group"
            style={{
              flex: "0 1 22%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-0 group-hover:animate-gradient-move"
              style={{
                background: "linear-gradient(120deg, #06b6d4 0%, #3b82f6 100%)",
                opacity: 0.15,
              }}
            ></div>
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400 shadow-lg mb-4 z-10"
              style={{ boxShadow: "0 0 30px #06b6d4, 0 2px 20px #0006" }}
            />
            <h3 className="text-xl font-semibold z-10 text-cyan-300 drop-shadow-lg">
              {member.name}
            </h3>
            <p className="text-cyan-100 z-10 mt-1 text-base font-medium tracking-wide drop-shadow">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
