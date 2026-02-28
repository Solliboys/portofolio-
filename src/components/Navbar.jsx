import { useState, useEffect } from "react";

const Navbar = ({ hidden = false }) => {
  // ⛔ Saat hidden, jangan render apa pun
  if (hidden) return null;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 150);
    handleScroll(); // init posisi saat mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar relative z-50 py-7 flex items-center justify-between px-6 md:px-12">
      {/* Logo */}
      <div className="logo">
        <h1 className="text-3xl font-bold text-white p-1 md:bg-transparent md:text-white">
          Portofolio
        </h1>
      </div>

      {/* Menu */}
      <ul
        className={`flex items-center sm:gap-10 gap-3 
          md:static fixed left-1/2 -translate-x-1/2 md:translate-x-0 
          md:opacity-100 bg-black/40 backdrop-blur-xl 
          border border-white/10 md:border-none
          p-3 px-5 sm:p-4 rounded-full sm:rounded-2xl 
          transition-all duration-500 ease-in-out
          ${active ? "top-4 opacity-100" : "-top-20 opacity-0"}`}
      >
        <li><a href="#home" className="sm:text-lg text-xs font-medium hover:text-violet-400 transition-colors">Home</a></li>
        <li><a href="#about" className="sm:text-lg text-xs font-medium hover:text-violet-400 transition-colors">About</a></li>
        <li><a href="#project" className="sm:text-lg text-xs font-medium hover:text-violet-400 transition-colors">Project</a></li>
        <li><a href="#achievements" className="sm:text-lg text-xs font-medium hover:text-violet-400 transition-colors whitespace-nowrap">Achievements</a></li>
        <li><a href="#experience" className="sm:text-lg text-xs font-medium hover:text-violet-400 transition-colors">Experience</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
