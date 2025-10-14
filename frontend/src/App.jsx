import { Link, Element } from "react-scroll";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogsPage from "./pages/BlogsPage";
import ContactUsPage from "./pages/ContactUsPage";

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
    <div className="font-sans bg-gradient-to-b from-[#0b1d3a] to-[#00a7e1]">
      {/* Floating Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">ACM</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white/10 backdrop-blur-md rounded-full shadow-lg">
            <nav>
              <ul className="flex items-center justify-center gap-x-2 md:gap-x-4 px-4 py-3">
                {sections.map(({ id, label, component }) => (
                  <li key={id}>
                    {component ? (
                      <Link
                        to={id}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className="text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:text-cyan-300 transition-colors duration-300 px-4 py-2 rounded-full"
                        activeClass="bg-cyan-500/30 !text-cyan-200"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span className="text-gray-500 font-bold uppercase tracking-wider text-sm cursor-not-allowed px-4 py-2 rounded-full">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right-side placeholder to balance the logo */}
          <div className="flex-shrink-0 w-12 h-12"></div>
        </div>
      </header>

      {/* Page Sections */}
      <main>
        {sections.map(
          ({ id, component }) =>
            component && (
              <Element key={id} name={id}>
                {component}
              </Element>
            )
        )}
      </main>
    </div>
  );
};

export default App;
