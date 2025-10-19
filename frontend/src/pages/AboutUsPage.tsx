// Stat Card Component for the "About Us" section
const StatCard = ({ value, label }) => (
  <div className="bg-cyan-500 bg-opacity-80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
    <p className="text-4xl md:text-5xl font-bold text-white">{value}</p>
    <p className="text-md md:text-lg text-white mt-1">{label}</p>
  </div>
);

// Main App Component
export default function AboutUsPage() {
  return (
  <div className="relative min-h-screen w-full font-sans text-white">
      {/* Background shapes for decoration */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        {/* You could add SVG patterns or other decorative elements here */}
      </div>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-200 mb-12">
            The Association for Computing Machinery (ACM) stands at the
            forefront of the computing world as world's largest educational and
            scientific computing society. With a rich history and an expansive
            network, ACM is dedicated to advancing computing as a discipline and
            profession. Through its commitment to research, education, and
            collaboration, ACM serves as a vital hub for connecting computing
            professionals, fostering innovation, and promoting ethical
            practices.
          </p>

          <h3 className="text-3xl sm:text-4xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg text-gray-200 mb-16">
            To build a supportive community where students can learn, share
            knowledge, and engage in exciting computing projects
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StatCard value="120+" label="Members" />
            <StatCard value="25+" label="Events" />
            <StatCard value="10+" label="Projects" />
          </div>
        </div>
      </section>
    </div>
  );
}
