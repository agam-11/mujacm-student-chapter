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
        <div className="max-w-6xl mx-auto text-center px-4">
          {/* Floating Animated Logo */}
          <div className="mb-12 md:mb-16">
            <img
              src={theme?.isDark ? '/acm.png' : '/acmblue.png'}
              alt="MUJ ACM Logo"
              className="w-44 h-44 md:w-60 md:h-60 mx-auto object-contain animate-float-slow"
              style={{
                filter: theme?.isDark 
                  ? 'drop-shadow(0 0 40px rgba(0, 255, 255, 0.5))' 
                  : 'drop-shadow(0 0 25px rgba(0, 102, 204, 0.4))',
              }}
            />
          </div>

          {/* Large Cyan Heading - Single Line */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-none"
            style={{ color: theme?.colors?.accent }}
          >
            WE ARE MUJ ACM STUDENT CHAPTER
          </h1>

          {/* Descriptive Paragraph with translucent blurred background for readability */}
          <div className="mx-auto mb-10 max-w-2xl">
            <div
              className="mx-auto px-4 py-3 rounded-lg"
              style={{
                // Make a subtle glass blur in light mode (not a solid white box)
                background: theme?.isDark ? 'transparent' : 'rgba(255,255,255,0.06)',
                color: theme?.colors?.textSecondary,
                backdropFilter: theme?.isDark ? 'none' : 'blur(12px)',
                WebkitBackdropFilter: theme?.isDark ? 'none' : 'blur(12px)',
                border: theme?.isDark ? 'none' : '1px solid rgba(0,0,0,0.06)'
              }}
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                A dynamic community of tech enthusiasts driven by passion to explore computing. We nurture talent, promote learning, and foster innovation through collaborative projects and industry engagement.
              </p>
            </div>
          </div>

          {/* Buttons removed as per request */}
        </div>
      </main>
      {/* What We Do section - kept on the landing page */}
      <Section>
        <WhatWeDo />
      </Section>
    </div>
  );
}
