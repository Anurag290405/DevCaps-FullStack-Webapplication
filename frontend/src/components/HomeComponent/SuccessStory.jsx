import React, { useState, useEffect } from "react";
import GetSuccessData from "../../API's/SuccessStoriesAPI/GetSuccessData";
import { API_URL } from "../../NwConfig";
import WebsiteLoader from "../../Loader/WebsiteLoader";

const SuccessStory = () => {
  const [current, setCurrent] = useState(0);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuccessData = async () => {
    setLoading(true);
    const res = await GetSuccessData();
    if (res?.success && res?.data?.length > 0) {
      setStories(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSuccessData();
  }, []);

  // Build an absolute image URL (handles relative API paths)
  const buildImageSrc = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const base = import.meta.env.VITE_API_URL || API_URL || "http://localhost:3000";
    return `${base}/${path.replace(/^\//, "")}`;
  };

  // Auto change every 2s
  useEffect(() => {
    if (stories?.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories?.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [stories]); // depend on stories so it updates when data comes

  return (
    <div className="w-full bg-transparent text-white py-12 px-6 md:px-16 flex flex-col items-center">
      {/* Section Title */}
      {
        loading && <WebsiteLoader/>
      }
      <h2 className="text-2xl md:text-3xl font-semibold font-['Montserrat'] mb-8 text-center">
        Here From our Clients
      </h2>

      {/* Content Wrapper */}
      {stories.length > 0 && (
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">
          {/* Image */}
          <img
            src={buildImageSrc(stories[current]?.image_url)}
            alt={stories[current]?.name}
            className="w-64 h-72 md:w-72 md:h-80 rounded-2xl object-cover"
          />

          {/* Text + Author */}
          <div className="flex-1 flex flex-col items-start">
            {/* Author Info */}
            <div className="mb-4">
              <h3 className="text-2xl md:text-4xl font-semibold font-['Montserrat']">
                {stories[current]?.name}
              </h3>
              <p className="text-xs md:text-sm font-['Poppins'] opacity-80">
                - {stories[current]?.title }
              </p>
            </div>

            {/* Story Text */}
            <p className="text-base md:text-xl font-semibold font-['Montserrat'] text-justify transition-all duration-700 ease-in-out">
              {stories[current]?.description.substring(0,500) }...
            </p>
          </div>
        </div>
      )}

      {/* Slider Indicators */}
      <div className="flex gap-2 mt-8">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full border border-white transition-all duration-300 ${
              current === index ? "w-12 bg-white" : "w-6 bg-[#267E5A]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SuccessStory;
