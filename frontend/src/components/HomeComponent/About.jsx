
import React from "react";

const AboutPage = () => {
  const aboutText =
    "At DevCaps, we help ideas grow into real, impactful startups. We support founders with mentorship, technical guidance, and hands-on execution to build products, secure traction, and reach the market.";
  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* Top Black Section */}
      <div className="relative bg-transparent text-white flex flex-col items-center justify-center pt-20 pb-52">
        {/* Heading */}
        <b className="text-center w-full text-[24px] sm:text-[32px] lg:text-[36px] tracking-[-0.02em] capitalize font-bold mb-6 px-4">
          Fostering Innovation From Campus To Market
        </b>

        {/* Mission & Vision */}
        <div className="w-full max-w-2xl px-4 text-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-base md:text-lg font-semibold font-['Montserrat'] text-white">
              <span className="uppercase">Mission:</span>{" "}
              <span className="font-medium">
                To enable innovation by nurturing startups with the right mix of Funding, mentorship, and academic support.
              </span>
            </p>
            <p className="text-base md:text-lg font-semibold font-['Montserrat'] text-white">
              <span className="uppercase">Vision:</span>{" "}
              <span className="font-medium">
                To be India’s most impactful university led Incubator.
              </span>
            </p>
          </div>
        </div>

        {/* Curve Divider */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0] border-0">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,80 350,80 500,0 L500,80 L0,80 Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

      {/* Vision Box Section */}
      <div className="w-full bg-transparent flex flex-col items-center justify-start pt-0 pb-10 relative">
        <div className="-mt-36 capitalize max-w-2xl w-full rounded-[15px] bg-gradient-to-r from-[#0F2A44] to-[#2569AA] border-[6px] sm:border-[10px] border-white px-5 sm:px-[30px] py-6 sm:py-[30px] shadow-lg text-white text-justify font-['Poppins'] font-medium leading-relaxed tracking-[-0.02em]">
          {aboutText}
          </div>
      </div>
 

    



    

</div>

  
  );
};

export default AboutPage;
