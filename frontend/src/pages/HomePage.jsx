// Main App Component
export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden text-white">
      {/* Background shapes for decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        {/* You could add SVG patterns or other decorative elements here */}
      </div>

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
