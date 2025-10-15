import { Link, Element } from "react-scroll";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogsPage from "./pages/BlogsPage";
import ContactUsPage from "./pages/ContactUsPage";
import Section from "./components/Section";
import logo from "/acm.png";
import ThreeGlobe from "./components/ThreeGlobe";

const App = () => {
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

  return (
    <div className="relative font-sans min-h-screen">
      
      {/* Three.js wireframe globe background */}
      <ThreeGlobe />

      {/* Floating Navigation (No changes needed here) */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="ACM logo" className="w-20 h-20 object-contain" />
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-full shadow-lg">
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
                        className="text-white font-bold uppercase tracking-wider text-base md:text-lg cursor-pointer hover:text-cyan-300 transition-colors duration-300 px-4 py-2 rounded-full"
                        activeClass="bg-cyan-500/30 !text-cyan-200"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span className="text-gray-500 font-bold uppercase tracking-wider text-base md:text-lg cursor-not-allowed px-6 py-2 rounded-full">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-shrink-0 w-12 h-12"></div>
        </div>
      </header>

      {/* Page Sections (No changes needed here) */}
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
  );
};

export default App;