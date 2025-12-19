import React, { useEffect, useState } from "react";
import Hero from "../components/HomeComponent/Hero";
import About from "../components/HomeComponent/About";
import image2 from "../assests/HomePage/image3.png";
import image3 from "../assests/HomePage/image4.png";
import image4 from "../assests/HomePage/image5.png";

import ProjectCard from "../components/HomeComponent/ProjectCard";
import Arrow from "../components/HomeComponent/Arrow";
import SuccessStory from "../components/HomeComponent/SuccessStory";
import NewsLetter from "../components/HomeComponent/NewsLetter";
import { Link, useNavigate } from "react-router-dom";
import GetHomeData from "../API's/HomeAPI/GetHomeData";
import WebsiteLoader from "../Loader/WebsiteLoader";


const Card = ({ image, title, description, underlineWidth }) => (
  <div className="w-full max-w-xs sm:w-80 md:w-96 h-64 bg-black rounded-2xl outline-2 outline-black overflow-hidden relative flex-shrink-0">
    <img
      src={image}
      alt={title}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
    <div className="absolute bottom-6 left-6 z-10">
      <div
        className="text-white text-xl font-semibold font-['Montserrat'] mb-1 "
        style={{
          fontVariant: "small-caps",
          lineHeight: "100%",
          letterSpacing: "-0.02em", // -2% tracking
        }}
      >
        {title}
      </div>
      <div
        className="h-px bg-white mb-1"
        style={{ width: underlineWidth || "6rem" }}
      />
      <div className="text-white text-sm font-normal font-['Poppins']">
        {description}
      </div>
    </div>
  </div>
);

const Home = () => {
  const [data,setdata]=useState([])
  const [starts,setstarts]=useState([])
  const [laoding,setloading]=useState([])
  const navigate=useNavigate()
  const redirectto=(data)=>{
console.log("called")
    navigate("/ecosystem-detail",{ state: { data } })
    window.scrollTo(0,0)
  }
    const gethomedataa=async()=>{
      setloading(true)
      const res=await GetHomeData()
      // console.log(res)
      if(res?.success){
        setdata(res?.data?.homedata)
        setstarts(res?.data?.stat)
        setloading(false)
      }
      setloading(false)
    }

  useEffect(()=>{
    gethomedataa()
  },[])
  return (
    <>
      <div id="home" className="scroll-mt-24">
        <Hero />
      </div>
      {
        laoding && <WebsiteLoader />
      }
      <div id="arrow">
        <Arrow />
      </div>
      <div className="w-full py-6 px-4 flex flex-wrap justify-evenly bg-transparent">
        {/* Logo 1 */}
        {/* <img
          src={image1}
          alt="Partner 1"
          className="w-24 sm:w-28 md:w-32 lg:w-40 h-auto object-contain"
        /> */}
        {/* Logo 2 */}
        <img
          src={image2}
          alt="Partner 2"
          className="w-24 sm:w-28 md:w-32 lg:w-40 h-auto object-contain"
        />
        {/* Logo 3 */}
        <img
          src={image3}
          alt="Partner 3"
          className="w-28 sm:w-32 md:w-36 lg:w-44 h-auto object-contain"
        />
        {/* Logo 4 */}
        <img
          src={image4}
          alt="Partner 4"
          className="w-28 sm:w-32 md:w-36 lg:w-44 h-auto object-contain"
        />
      </div>

   
  <div id="about" className="scroll-mt-24">
    <About />
  </div>
  <div id="projects" className="scroll-mt-24">
    <ProjectCard />
  </div>
  <SuccessStory />
  <div id="contact" className="scroll-mt-24">
    <NewsLetter />
  </div>
      
      
      
    </>
  );
};

export default Home;
