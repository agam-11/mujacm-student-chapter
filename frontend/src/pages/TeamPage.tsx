import { useRef, useLayoutEffect, useContext } from "react";
import { gsap } from "gsap";
import ThemeContext from "../context/ThemeContext";
import ProfileCard from "../components/ProfileCard";

type Member = {
  name: string;
  role: string;
  img?: string;
  bio?: string;
  socials?: { twitter?: string; linkedin?: string; github?: string };
};

const teamMembers: Member[] = [
  { name: "Riya Sharma", role: "President", img: "/42.png" },
  { name: "Aditya Mehta", role: "Lead Developer", img: "/42.png" },
  { name: "Priya Verma", role: "Design Head", img: "/42.png" },
  { name: "Karan Patel", role: "Event Coordinator", img: "/42.png" },
  { name: "Neha Gupta", role: "Marketing Lead", img: "/42.png" },
  { name: "Arjun Singh", role: "Tech Advisor", img: "/42.png" },
];

const TeamSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const theme = useContext(ThemeContext);

  useLayoutEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, teamMembers.length);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];

      gsap.set(cards, { opacity: 0, y: 24, scale: 0.98 });
      gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24"
      aria-labelledby="team-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="team-heading" className="text-3xl md:text-4xl font-bold mb-8" style={{ color: theme?.colors?.accent }}>
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-stretch">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="h-full w-full" ref={(el) => { cardsRef.current[index] = el; return; }}>
              <ProfileCard
                name={member.name}
                title={member.role}
                handle={member.name.split(' ')[0].toLowerCase()}
                status="Online"
                contactText="Contact Me"
                avatarUrl={member.img}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log(`Contact ${member.name}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
