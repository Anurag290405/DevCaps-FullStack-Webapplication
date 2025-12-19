import React, { useState, useEffect, useRef } from "react";
import devcapslogo from "../../assests/HomePage/Logo-WithoutBg.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const linkClass = "bg-transparent border-0 cursor-pointer text-gray-300 font-medium pb-1 hover:border-b-2 hover:border-white transition-all";
  const contactButtonClass = "bg-transparent border-0 cursor-pointer";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#0F2A44] to-[#2569AA] text-white sticky top-0 z-50 shadow-lg">
      <div className="w-full pr-8">
        <div className="flex justify-between items-stretch h-20">
          {/* Logo in bottom-left corner */}
          <div className="flex items-end">
            <div className="bg-white rounded-tr-[15px] rounded-br-[15px] w-[116px] h-[57px] flex items-end mb-0.5">
              <img
                src={devcapslogo}
                alt="Logo"
                className="w-[61px] h-[43px] ml-[25px] mb-[7px]"
              />
            </div>
          </div>

          {/* Desktop Nav (vertically centered) */}
          <nav
            className="hidden md:flex items-center space-x-6 text-white text-base font-medium font-['Montserrat']"
            style={{
              fontVariant: "small-caps",
              lineHeight: "100%",
              letterSpacing: "-0.02em",
            }}
          >
            <button type="button" onClick={() => scrollToSection("home")} className={linkClass}>Home</button>
            <button type="button" onClick={() => scrollToSection("about")} className={linkClass}>About</button>
            <button type="button" onClick={() => scrollToSection("projects")} className={linkClass}>Projects</button>
            <button type="button" onClick={() => scrollToSection("arrow")} className={linkClass}>Programs & Events</button>
            <button type="button" onClick={() => scrollToSection("contact")} className={contactButtonClass}>
              <div className="p-2.5 bg-white rounded-[5px] inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-base font-medium font-['Montserrat']">
                  Contact
                </div>
              </div>
            </button>
          </nav>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav
            ref={menuRef}
            className="flex flex-col items-start space-y-2 mt-2 px-2 md:hidden pb-4"
          >
            <button type="button" className={linkClass} onClick={() => scrollToSection("home")}>Home</button>
            <button type="button" className={linkClass} onClick={() => scrollToSection("about")}>About</button>
            <button type="button" className={linkClass} onClick={() => scrollToSection("projects")}>Projects</button>
            <button type="button" className={linkClass} onClick={() => scrollToSection("arrow")}>Programs & Events</button>
            <button type="button" className={linkClass} onClick={() => scrollToSection("contact")}>Contact</button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
