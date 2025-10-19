import { useState } from "react";

// Contact Info Card Component
const ContactInfoCard = ({ icon, title, info, link }) => (
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Submission failed');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      // reset to idle after a short delay
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Network error');
      console.error('Contact submit error:', err);
    }
  };

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
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Have questions or want to join our community? We'd love to hear from you!
            </p>
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

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-300 backdrop-blur-sm"
                    placeholder="John Doe"
                    style={{ WebkitTextFillColor: 'white' }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-300 backdrop-blur-sm"
                    placeholder="john@example.com"
                    style={{ WebkitTextFillColor: 'white' }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-300 backdrop-blur-sm"
                  placeholder="What's this about?"
                  style={{ WebkitTextFillColor: 'white' }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-300 resize-none backdrop-blur-sm"
                  placeholder="Tell us more..."
                  style={{ WebkitTextFillColor: 'white' }}
                ></textarea>
              </div>
              {status === 'error' && (
                <div className="text-center text-red-400 mb-3">Error: {errorMsg}</div>
              )}
              {status === 'success' && (
                <div className="text-center text-green-400 mb-3">✓ Message sent! Check your email.</div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out ${status === 'sending' ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
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
