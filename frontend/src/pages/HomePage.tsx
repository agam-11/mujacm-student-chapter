// Main App Component
import { useContext } from 'react';
import ThemeContext from "../context/ThemeContext";
import Section from "../components/Section";
import WhatWeDo from "../components/WhatWeDo";

export default function HomePage() {
  const theme = useContext(ThemeContext);
  
  return (
    <div className="relative min-h-screen w-full font-sans" style={{ color: theme?.colors?.text }}>
      {/* Background shapes for decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        {/* You could add SVG patterns or other decorative elements here */}
      </div>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-4" style={{ color: theme?.colors?.text }}>
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            MUJ ACM STUDENT CHAPTER
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3" style={{ color: theme?.colors?.textSecondary }}>
            Building the next generation of innovators
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-10" style={{ color: theme?.colors?.textSecondary }}>
            empowering students in technology, research and innovation
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="w-full sm:w-auto font-semibold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 ease-in-out"
              style={{ 
                backgroundColor: theme?.isDark ? '#ffffff' : '#000000',
                color: theme?.isDark ? '#0066cc' : '#ffffff'
              }}
            >
              Join ACM
            </button>
            <button 
              className="w-full sm:w-auto border-2 font-semibold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 ease-in-out"
              style={{ 
                borderColor: theme?.colors?.text,
                color: theme?.colors?.text,
                backgroundColor: theme?.isDark ? 'transparent' : 'rgba(0, 0, 0, 0.05)'
              }}
            >
              Upcoming Events
            </button>
          </div>
        </div>
      </main>
      {/* What We Do section - kept on the landing page */}
      <Section>
        <WhatWeDo />
      </Section>
    </div>
  );
}
