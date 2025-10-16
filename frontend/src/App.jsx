import { Link, Element } from "react-scroll";
import { useContext, useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogsPage from "./pages/BlogsPage";
import ContactUsPage from "./pages/ContactUsPage";
import Section from "./components/Section";
import ThemeSwitcher from "./components/ThemeSwitcher";
import MobileMenu from "./components/MobileMenu";
import { ThemeContext } from "./context/ThemeContext";
import logo from "/acm.png";
// Light-theme blue logo (placed in public folder as /acmblue.png)
import blueLogo from "/acmblue.png";
import ThreeGlobe from "./components/ThreeGlobe";

const AppContent = () => {
  const theme = useContext(ThemeContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sections = [
    { id: "home", label: "Home", component: <HomePage /> },
    { id: "about", label: "About Us", component: <AboutUsPage /> },
    { id: "team", label: "Team" },
    { id: "events", label: "Events" },
    { id: "gallery", label: "Gallery" },
    { id: "projects", label: "Projects", component: <ProjectsPage /> },
    { id: "blogs", label: "Blogs", component: <BlogsPage /> },
    { id: "contact", label: "Contact Us", component: <ContactUsPage /> },
  ];

  if (!isMounted) return null;

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      
      {/* Three.js wireframe globe background - absolutely positioned behind everything */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <ThreeGlobe isDark={theme.isDark} />
      </div>

      {/* Content wrapper with relative positioning to appear above background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Floating Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex-shrink-0 flex items-center">
            <img src={theme.isDark ? logo : blueLogo} alt="ACM logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          </div>
          
          {/* Desktop Navigation - hidden on mobile */}
          <div
            className="hidden md:block rounded-full shadow-lg backdrop-blur-md"
            style={{ backgroundColor: theme.colors.navBg }}
          >
            <nav>
              <ul className="flex items-center justify-center gap-x-3 md:gap-x-6 px-4 py-3">
                {sections.map(({ id, label, component }) => (
                  <li key={id}>
                    {component ? (
                      <Link
                        to={id}
                        spy={true}
                        smooth={true}
                        offset={-90}
                        duration={500}
                        className="font-bold uppercase tracking-wider text-sm md:text-base lg:text-lg cursor-pointer transition-colors duration-300 px-3 md:px-4 py-2 rounded-full"
                        style={{
                          color: theme.colors.text,
                        }}
                        activeStyle={{
                          backgroundColor: `${theme.colors.accent}30`,
                          color: theme.colors.accent,
                        }}
                      >
                        {label}
                      </Link>
                    ) : (
                      <span
                        className="font-bold uppercase tracking-wider text-sm md:text-base lg:text-lg cursor-not-allowed px-4 md:px-6 py-2 rounded-full"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Mobile & Desktop Controls */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <MobileMenu sections={sections} />
          </div>
        </div>
      </header>

      {/* Page Sections */}
      <main>
        {sections.map(
          ({ id, component }) =>
            component && (
              <Element key={id} name={id}>
                <Section>{component}</Section>
              </Element>
            )
        )}
      </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppContent />
  );
};

export default App;