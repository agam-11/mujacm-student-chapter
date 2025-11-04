import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

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
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Initialize EmailJS with environment variables
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if environment variables are set
      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error('EmailJS configuration is missing. Please add the required environment variables.');
      }

      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      if (!formRef.current) {
        throw new Error('Form reference not found');
      }

      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!');
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Oops! Something went wrong. Please try again later.');
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
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

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Send Us a Message</h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-200 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-200 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-400/50 rounded-lg text-green-200">
                  ✓ {submitMessage}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
                  ✕ {submitMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 ease-in-out text-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
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
