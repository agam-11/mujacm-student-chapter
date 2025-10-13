// Navigation Link Component
export const NavLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-white font-bold uppercase tracking-wider text-2xl hover:text-cyan-300 transition-colors duration-300"
    >
      {children}
    </a>
  </li>
);
