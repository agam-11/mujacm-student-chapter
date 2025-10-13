import { NavLink } from "../components/NavLink";

// Main App Component
export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0b1d3a] to-[#00a7e1] font-sans overflow-hidden">
      {/* Background shapes for decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {/* You could add SVG patterns or other decorative elements here */}
      </div>

      {/* Header Navigation */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
        <div className="container mx-auto">
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-12 gap-y-2">
              <NavLink href="#">Home</NavLink>
              <NavLink href="about">About Us</NavLink>
              <NavLink href="#">Team</NavLink>
              <NavLink href="#">Events</NavLink>
              <NavLink href="#">Gallery</NavLink>
              <NavLink href="#">Blogs</NavLink>
              <NavLink href="#">Projects</NavLink>
              <NavLink href="#">Contact Us</NavLink>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            MUJ ACM STUDENT CHAPTER
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-200 mb-3">
            Building the next generation of innovators
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10">
            empowering students in technology, research and innovation
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out">
              Join ACM
            </button>
            <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out">
              Upcoming Events
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
