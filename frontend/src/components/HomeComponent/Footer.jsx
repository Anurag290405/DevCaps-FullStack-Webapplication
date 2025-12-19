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
  const navigate=useNavigate()
  
  const socialLinks = [
    {
      id: 1,
      name: "Instagram",
      url: "https://www.instagram.com/devcaps/",
      icon: FaInstagram
    },
    {
      id: 2,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/devcaps/",
      icon: FaLinkedin
    },
    {
      id: 3,
      name: "X (Twitter)",
      url: "https://x.com/devcaps",
      icon: PiXLogoFill
    },
    {
      id: 4,
      name: "Facebook",
      url: "https://www.facebook.com/devcaps/",
      icon: FaFacebook
    },
    {
      id: 5,
      name: "YouTube",
      url: "https://www.youtube.com/@devcaps",
      icon: FaYoutube
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const redirectto=(link)=>{
// console.log("called")
    navigate(link)
    window.scrollTo({ top: 0, behavior: "smooth" });

  }
  return (
    <div className="w-full bg-transparent text-white font-['Poppins'] border-t border-t-white/40">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:flex-wrap divide-y md:divide-y-0 md:divide-x divide-white/90">
        {/* Left Section */}
        <div className="w-full md:w-[32%] py-8 md:py-10 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center justify-center md:justify-start">
            <img src={logo} alt="Logo" className="w-24 sm:w-28 h-auto" />
          </div>
          <div className="w-full h-[1px] bg-white/90" />
          <div className="flex flex-col items-center md:items-start gap-4 pl-4 sm:pl-6 md:px-8 pt-6 text-sm sm:text-base">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              <span>Indore</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <FaPhoneAlt />
              <span>+91-9999999999</span>
              <span className="px-1">|</span>
              <span>+91-9999999999</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <span>info@devcaps.com</span>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="w-full md:w-[36%] py-8 md:py-10 flex flex-col justify-between items-center text-sm sm:text-base">
          <div className="grid grid-cols-2 pl-4 sm:pl-10 sm:grid-cols-2 gap-y-3 gap-x-10 pb-15">
            <span onClick={()=>scrollToSection("home")} className="cursor-pointer hover:underline">Home</span>
            <span onClick={()=>scrollToSection("about")} className="cursor-pointer hover:underline">About</span>
            <span onClick={()=>scrollToSection("projects")} className="cursor-pointer hover:underline">Projects</span>
            <span onClick={()=>scrollToSection("contact")} className="cursor-pointer hover:underline">Contact Us</span>
          </div>
          <div className="w-full h-[1px] bg-white/90" />
          <div className="mt-3 px-2 text-center text-white/80 text-[10px] sm:text-[11px] md:text-[12px] leading-snug">
            Copyright: © 2025 DevCap's <br />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[32%] px-1 sm:px-3 md:px-1 py-8 md:py-10 flex flex-col gap-4 items-center">
          <div className="text-xl sm:text-2xl font-normal">Have a Query?</div>
          <div className="text-lg sm:text-xl font-normal">Reach Out To Us!</div>

          <button onClick={()=>redirectto("/contact")} className="cursor-pointer mt-2 px-6 py-2 btn-primary text-white rounded-2xl text-sm sm:text-base font-light border border-white/20 w-fit">
            Get in Touch &gt;
          </button>

          <div className="flex gap-3 mt-4 flex-wrap">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-7 cursor-pointer hover:w-8 hover:h-8 h-7 bg-white text-black rounded-lg flex items-center justify-center transition-all"
                >
                  <IconComponent size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
