// Contact Info Card Props interface
interface ContactInfoCardProps {
  icon: string;
  title: string;
  info: string;
  link?: string;
}

// Contact Info Card Component
const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, title, info, link }) => (
  <div className="bg-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30 hover:border-cyan-400/60 transform hover:-translate-y-2 transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    {link ? (
      <a href={link} className="text-cyan-300 hover:text-cyan-100 transition-colors">
        {info}
      </a>
    ) : (
      <p className="text-gray-200">{info}</p>
    )}
  </div>
);

// Main Contact Us Page Component
export default function ContactUsPage() {
  // WhatsApp number (replace with your organization's WhatsApp number in format: countrycode+phonenumber, e.g., 919876543210)
  const WHATSAPP_NUMBER = "919999999999"; // Example: India +91 format
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hi! I'd like to connect with MUJ ACM. Can you help me?"
  );
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
  <div className="relative min-h-screen w-full font-sans text-white">
      {/* Background shapes for decoration */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Get In Touch
            </h1>
            <div className="max-w-2xl mx-auto">
              <div className="glass-light mx-auto">
                <p className="text-lg md:text-xl text-gray-800">
                  Have questions or want to join our community? We'd love to hear from you!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ContactInfoCard
              icon="📧"
              title="Email Us"
              info="acm@muj.manipal.edu"
              link="mailto:acm@muj.manipal.edu"
            />
            <ContactInfoCard
              icon="📱"
              title="Follow Us"
              info="@mujacm"
              link="https://instagram.com/mujacm"
            />
            <ContactInfoCard
              icon="📍"
              title="Visit Us"
              info="Manipal University Jaipur, Rajasthan"
            />
          </div>

          {/* WhatsApp Chat Section */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Chat With Us on WhatsApp</h2>
            <div className="text-center space-y-6">
              <div className="text-6xl">💬</div>
              <p className="text-lg text-gray-200 mb-4">
                Have a question, complaint, or want to learn more about MUJ ACM? Connect with us instantly on WhatsApp!
              </p>
              <p className="text-sm text-gray-300 mb-6">
                We're here to help and typically respond within a few hours.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
              >
                💬 Start WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">📘</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">📷</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">🐦</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">💼</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
