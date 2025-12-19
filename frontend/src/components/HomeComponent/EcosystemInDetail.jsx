import React from 'react'
import image1 from "../images/image1.png";
import { Link, useLocation } from "react-router-dom";
import parseImagePath from '../../../admin/Modals/parseImagePath';


const EcosystemInDetail = () => {
  const location=useLocation()
  const {data}=location.state || {}
  // console.log(data)
  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-16 py-10 font-['Poppins']">
      {/* Header */}
      <div className="flex items-center gap-2 text-lg md:text-xl font-semibold mb-10">
        <Link to = "/">
        <h1 className="uppercase tracking-wide">
          {'<'} Entrepreneurial Ecosystem at Medicaps
        </h1>
        </Link>
      </div>

      {/* Logo + Card */}
      <div className="flex flex-col items-start gap-10">
        {/* Logo Box */}
        <div className="w-[280px] h-[220px] md:w-[350px] md:h-[260px] rounded-2xl border border-zinc-700 flex items-center justify-center bg-black">
          <img
            src={parseImagePath(data?.image_url)}
            alt="TEC Logo"
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-6 font-['Montserrat']"
            style={{
              fontVariant: "small-caps",
              lineHeight: "100%",
              letterSpacing: "-0.02em",
            }}
          >
            {data?.heading}
          </h2>
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EcosystemInDetail