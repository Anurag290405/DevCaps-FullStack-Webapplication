import React from "react";
import logo from "../../assests/HomePage/Logo-WithoutBg.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { PiXLogoFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Social media links data
  const socialLinks = [
    { id: 1, name: "Instagram", url: "https://www.instagram.com/devcaps/", icon: FaInstagram },
    { id: 2, name: "LinkedIn", url: "https://www.linkedin.com/company/devcaps/", icon: FaLinkedin },
    { id: 3, name: "X (Twitter)", url: "https://x.com/devcaps", icon: PiXLogoFill },
    { id: 4, name: "Facebook", url: "https://www.facebook.com/devcaps/", icon: FaFacebook },
    { id: 5, name: "YouTube", url: "https://www.youtube.com/@devcaps", icon: FaYoutube },
  ];

  // Scroll to specific section smoothly
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigate to page and scroll to top
  const navigateToPage = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="w-full bg-transparent text-white font-['Poppins'] border-t border-t-white/40">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:flex-wrap divide-y md:divide-y-0 md:divide-x divide-white/90 relative">
        
        {/* LEFT SECTION - Company Info */}
        <LeftSection logo={logo} />

        {/* CENTER SECTION - Navigation Links & Copyright */}
        <CenterSection scrollToSection={scrollToSection} />

        {/* RIGHT SECTION - Query & Social Links */}
        <RightSection navigateToPage={navigateToPage} socialLinks={socialLinks} />

        {/* MOBILE ONLY - Copyright at Bottom */}
        <MobileCopyright />

      </div>
    </footer>
  );
};

// LEFT SECTION: Logo & Contact Info
const LeftSection = ({ logo }) => {
  return (
    <div className="w-full md:w-[32%] py-6 sm:py-8 md:py-10 flex flex-col gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center md:justify-start">
        <img src={logo} alt="Logo" className="w-20 sm:w-24 md:w-28 h-auto" />
      </div>

      {/* Divider Line */}
      <div className="w-full h-[1px] bg-white/90" />

      {/* Contact Information */}
      <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4 text-xs sm:text-sm md:text-base">
        {/* Location */}
        <div className="flex items-start gap-2">
          <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
          <span>Indore</span>
        </div>

        {/* Phone */}
        <div className="flex items-center flex-wrap gap-2">
          <FaPhoneAlt className="flex-shrink-0" />
          <span>+91-9999999999</span>
          <span className="px-1">|</span>
          <span>+91-9999999999</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <FaEnvelope className="flex-shrink-0" />
          <span>info@devcaps.com</span>
        </div>
      </div>
    </div>
  );
};

// CENTER SECTION: Navigation & Copyright
const CenterSection = ({ scrollToSection }) => {
  const navLinks = [
    { id: 1, label: "Home", sectionId: "home" },
    { id: 2, label: "About", sectionId: "about" },
    { id: 3, label: "Projects", sectionId: "projects" },
    { id: 4, label: "Contact Us", sectionId: "contact" },
  ];

  return (
    <div className="w-full md:w-[36%] py-6 sm:py-8 md:py-10 flex flex-col justify-between items-center text-xs sm:text-sm md:text-base px-4 sm:px-6">
      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-6 sm:gap-x-10 pb-6">
        {navLinks.map((link) => (
          <span
            key={link.id}
            onClick={() => scrollToSection(link.sectionId)}
            className="cursor-pointer hover:underline transition-all text-center"
          >
            {link.label}
          </span>
        ))}
      </div>

      {/* Divider Line */}
      <div className="w-full h-[1px] bg-white/90" />

      {/* Copyright - Desktop Only */}
      <div className="hidden md:block mt-4 px-2 text-center text-white/80 text-[12px] leading-snug">
        Copyright: © 2025 DevCap's
      </div>
    </div>
  );
};

// RIGHT SECTION: Query & Social Links
const RightSection = ({ navigateToPage, socialLinks }) => {
  return (
    <div className="w-full md:w-[32%] px-4 sm:px-6 md:px-1 py-6 sm:py-8 md:py-10 flex flex-col gap-3 sm:gap-4 items-center">
      {/* Heading */}
      <div className="text-lg sm:text-xl md:text-2xl font-normal text-center">Have a Query?</div>
      <div className="text-base sm:text-lg md:text-xl font-normal text-center">Reach Out To Us!</div>

      {/* Contact Button */}
      <button
        onClick={() => navigateToPage("/contact")}
        className="cursor-pointer mt-2 px-4 sm:px-6 py-2 btn-primary text-white rounded-2xl text-xs sm:text-sm md:text-base font-light border border-white/20 w-fit hover:bg-opacity-80 transition-all"
      >
        Get in Touch &gt;
      </button>

      {/* Social Media Icons */}
      <SocialIcons socialLinks={socialLinks} />
    </div>
  );
};

// SOCIAL MEDIA ICONS
const SocialIcons = ({ socialLinks }) => {
  return (
    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 flex-wrap justify-center">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className="w-6 sm:w-7 h-6 sm:h-7 cursor-pointer hover:w-7 sm:hover:w-8 hover:h-7 sm:hover:h-8 bg-white text-black rounded-lg flex items-center justify-center transition-all"
          >
            <IconComponent size={12} className="sm:w-4 sm:h-4" />
          </a>
        );
      })}
    </div>
  );
};

// MOBILE COPYRIGHT - Shows at bottom on mobile only
const MobileCopyright = () => {
  return (
    <div className="w-full md:hidden py-4 px-4 text-center border-t border-t-white/90">
      <div className="text-white/80 text-[10px] sm:text-[11px] leading-snug">
        Copyright: © 2025 DevCap's
      </div>
    </div>
  );
};

export default Footer;
