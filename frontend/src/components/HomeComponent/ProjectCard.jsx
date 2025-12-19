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
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await GetProjects();
      if (res?.success) setProjects(res.data || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      {loading && <WebsiteLoader />}

      {/* Header */}
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

        <span className="text-black text-sm md:text-base font-['Poppins'] underline cursor-pointer">
          View All
        </span>
      </div>

      {/* Slider */}
      <div className="mt-8 px-4 md:px-20">
        <Slider {...settings}>
          {projects.map((card, index) => (
            <div key={index} className="px-4">
              <div className="relative rounded-2xl bg-[#004180] text-white min-h-[500px] flex flex-col">

                

                {/* Image */}
              <div className="w-[90%] h-60 mt-6 mx-auto rounded-2xl bg-white flex items-center justify-center overflow-hidden">
  <img
    src={card.image}
    alt={card.name}
    className="w-full h-full object-contain"
  />
</div>


                {/* Content */}
                <div className="px-5 mt-6 flex-1">
                  <h3
                    className="text-xl md:text-2xl font-semibold font-['Montserrat']"
                    style={{
                      fontVariant: "small-caps",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {card.name}
                  </h3>

                  <p className="text-sm font-['Poppins'] mt-2 line-clamp-4 opacity-90">
                    {card.description}
                  </p>
                </div>

                {/* Read More */}
                <div className="px-5 pb-6">
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-['Poppins'] bg-white text-[#004180] px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    Read More →
                  </button>
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
