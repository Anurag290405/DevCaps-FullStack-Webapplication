import React from "react";

// Arrow Component (SVG)
const ArrowComponent = ({ width = 100 }) => (
  <svg
    width={width}
    height="12"
    viewBox={`0 0 ${width} 10`}
    xmlns="http://www.w3.org/2000/svg"
    className="ml-4"
  >
    <line
      x1="0"
      y1="5"
      x2={width - 10}
      y2="5"
      stroke="black"
      strokeWidth="2"
    />
    <polygon
      points={`${width - 10},0 ${width},5 ${width - 10},10`}
      fill="black"
    />
  </svg>
);

const Arrow = () => {
  return (
    <div className="w-full bg-neutral-100 text-black font-semibold font-['Montserrat']">
<div className="flex flex-wrap lg:flex-nowrap gap-8 items-start justify-around p-6 lg:px-[80px] lg:pt-[68px] lg:pb-[70px] border-t-2 border-black">
        
        {/* Apply Now */}
        <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
          <div className="flex items-center">
            <p
              className="text-xl"
              style={{
                fontVariant: "small-caps",
                lineHeight: "100%",
                letterSpacing: "-0.02em",
              }}
            >
              Apply now
            </p>
            <ArrowComponent width={180} />
          </div>
          <p className="text-sm font-['Poppins'] font-normal">
            Get your startup funded at MII Foundation.
          </p>
        </div>

        {/* Pitch Your Idea */}
        <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
          <div className="flex items-center">
            <p
              className="text-xl"
              style={{
                fontVariant: "small-caps",
                lineHeight: "100%",
                letterSpacing: "-0.02em",
              }}
            >
              Pitch Your Idea
            </p>
            <ArrowComponent width={140} />
          </div>
          <p className="text-sm font-['Poppins'] font-normal">
            Turn your idea into a reality you dreamed.
          </p>
        </div>

        {/* Explore Startups */}
        <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
          <div className="flex items-center">
            <p
              className="text-xl"
              style={{
                fontVariant: "small-caps",
                lineHeight: "100%",
                letterSpacing: "-0.02em",
              }}
            >
              Explore Startups
            </p>
            <ArrowComponent width={130} />
          </div>
          <p className="text-sm font-['Poppins'] font-normal">
            Fund Potential Startups and help them bring change.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Arrow;
