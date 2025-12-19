import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetProjects from "../../API's/ProjectAPI/GetProjects";
import WebsiteLoader from "../../Loader/WebsiteLoader";

const ProjectCards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const slidesToShow = useMemo(() => {
    if (!projects?.length) return 1;
    return Math.min(3, projects.length);
  }, [projects]);

  const settings = {
    dots: false,
    infinite: projects.length > slidesToShow,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(2, slidesToShow) },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await GetProjects();
      if (res?.success) {
        setProjects(res.data || []);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      {
        loading && <WebsiteLoader/>
      }
      <div className="flex justify-between items-center px-6 md:px-20">
        <h2
          className="text-black text-xl md:text-3xl font-semibold font-['Montserrat']"
          style={{
            fontVariant: "small-caps",
            lineHeight: "100%",
            letterSpacing: "-0.02em",
          }}
        >
          Real Stories, Real Growth
        </h2>
        <a
          className="text-black cursor-pointer text-sm md:text-base font-normal font-['Poppins'] underline"
        >
          View All 
        </a>
      </div>

      <div className="mt-8 px-4 md:px-20">
        <Slider {...settings}>
          {projects?.map((card, index) => (
            <div key={index} className="px-4">
              <div className="rounded-2xl overflow-hidden transition-all duration-500 bg-stone-300 h-[500px] flex flex-col items-center justify-start">
                {/* Image Section (fixed size, no cropping) */}
                <div className="w-[90%] h-64 mt-6 rounded-2xl overflow-hidden relative bg-white flex items-center justify-center">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="max-w-full cursor-pointer max-h-full object-contain"
                  />
                  <div className="absolute bottom-4 left-4 text-sm underline text-black font-poppins">
                    Read More 
                  </div>
                </div>

                {/* Text Section */}
                <div className="w-full px-4 mt-6 text-left">
                  <div
                    className="text-black text-2xl font-semibold font-['Montserrat']"
                    style={{
                      fontVariant: "small-caps",
                      lineHeight: "100%",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {card.name}
                  </div>
                  <p className="text-black text-sm font-normal font-['Poppins'] mt-2">
                    {card.description?.substring(0, 300)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProjectCards;
