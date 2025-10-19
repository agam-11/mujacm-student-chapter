import { Link, Element, scroller } from "react-scroll";
import { useContext, useState, useEffect, ReactNode } from "react";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogsPage from "./pages/BlogsPage";
import ContactUsPage from "./pages/ContactUsPage";
import Section from "./components/Section";
import ThemeSwitcher from "./components/ThemeSwitcher";
import MobileMenu from "./components/MobileMenu";
import ThemeContext from "./context/ThemeContext";
import ThreeGlobe from "./components/ThreeGlobe";
import TeamSection from "./pages/TeamPage";

interface Section {
  id: string;
  label: string;
  component?: ReactNode;
}

const AppContent = () => {
  const theme = useContext(ThemeContext);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ensure initial landing always shows the Home section (nothing scrolled above it)
  useEffect(() => {
    if (isMounted) {
      // Jump immediately to the home section (no animation)
      scroller.scrollTo("home", { duration: 0, smooth: false, offset: -90 });
    }
  }, [isMounted]);

  const sections: Section[] = [
    { id: "home", label: "Home", component: <HomePage /> },
    { id: "about", label: "About Us", component: <AboutUsPage /> },
    { id: "team", label: "Team", component: <TeamSection /> },
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
        width: "100%",
        backgroundColor: theme?.colors?.bg || "#110053",
        color: theme?.colors?.text || "#ffffff",
        position: "relative",
      }}
    >
      {/* Three.js wireframe globe background - absolutely positioned behind everything */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
  <ThreeGlobe isDark={Boolean(theme?.isDark)} />
      </div>

      {/* Content wrapper with relative positioning to appear above background */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Floating Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 py-4">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="flex-shrink-0 flex items-center">
              <img
                src={theme?.isDark ? '/acm.png' : '/acmblue.png'}
                alt="ACM logo"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>

            {/* Desktop Navigation - hidden on mobile */}
            <div
              className="hidden md:block rounded-full shadow-lg backdrop-blur-md"
              style={{ backgroundColor: theme?.colors?.navBg || "rgba(255, 255, 255, 0.1)" }}
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
                          activeClass="nav-link-active"
                          style={{
                            color: theme?.colors?.text || "#ffffff",
                          }}
                        >
                          {label}
                        </Link>
                      ) : (
                        <span
                          className="font-bold uppercase tracking-wider text-sm md:text-base lg:text-lg cursor-not-allowed px-4 md:px-6 py-2 rounded-full"
                          style={{ color: theme?.colors?.textSecondary || "#d4d4d4" }}
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
        <main className="pt-28 md:pt-32">
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
  return <AppContent />;
};

export default App;
