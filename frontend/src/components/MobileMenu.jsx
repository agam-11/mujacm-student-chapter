import { useContext, useState } from 'react';
import { Link } from 'react-scroll';
import { ThemeContext } from '../context/ThemeContext';

export default function MobileMenu({ sections }) {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: theme.colors.navBg,
          border: `2px solid ${theme.colors.accent}`,
        }}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 mb-1 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
          style={{ backgroundColor: theme.colors.text }}
        />
        <span
          className={`block w-6 h-0.5 mb-1 transition-all duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: theme.colors.text }}
        />
        <span
          className={`block w-6 h-0.5 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
          style={{ backgroundColor: theme.colors.text }}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: theme.colors.bgSecondary,
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: theme.colors.navBg,
              color: theme.colors.text,
            }}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="px-4">
          <ul className="space-y-2">
            {sections.map(({ id, label, component }) => (
              <li key={id}>
                {component ? (
                  <Link
                    to={id}
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    onClick={closeMenu}
                    className="block font-bold uppercase tracking-wider text-sm py-3 px-4 rounded-lg cursor-pointer transition-all duration-300"
                    activeClass="nav-link-active"
                    style={{
                      color: theme.colors.text,
                      backgroundColor: 'transparent',
                    }}
                  >
                    {label}
                  </Link>
                ) : (
                  <span
                    className="block font-bold uppercase tracking-wider text-sm py-3 px-4 rounded-lg cursor-not-allowed opacity-50"
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
    </div>
  );
}
