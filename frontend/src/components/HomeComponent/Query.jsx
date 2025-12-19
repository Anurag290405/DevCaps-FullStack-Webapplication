import React from "react";

const Query = () => {
  return (
    <div className="w-full bg-transparent py-8 px-6 md:px-16 lg:px-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-2 max-w-lg">
          <h2
            className="text-2xl md:text-3xl font-semibold font-['Montserrat'] text-black"
            style={{
              fontVariant: "small-caps",
              lineHeight: "100%",
              letterSpacing: "-0.02em", // -2% tracking
            }}
          >
            Have a Query?
          </h2>
          <p
            className="text-lg font-medium font-['Montserrat'] text-black"
            style={{
              fontVariant: "small-caps",
              lineHeight: "100%",
              letterSpacing: "-0.02em", // -2% tracking
            }}
          >
            Reach Out To Us!
          </p>
          <p className="text-sm font-normal font-['Poppins'] text-black">
            Apply Now, Pitch Your Idea, Join A Program
          </p>
          <button className="cursor-pointer mt-4 w-full px-6 py-2 btn-primary text-white text-base rounded-2xl font-['Poppins']">
            Contact Us →
          </button>
        </div>

        {/* Right Section - Social Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button className="cursor-pointer w-full h-10 btn-primary text-white rounded-2xl font-['Poppins'] text-base">
            LinkedIn
          </button>
          <button className="cursor-pointer w-full h-10 btn-primary text-white rounded-2xl font-['Poppins'] text-base">
            Twitter
          </button>
          <button className="cursor-pointer w-full h-10 btn-primary text-white rounded-2xl font-['Poppins'] text-base">
            Instagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default Query;
