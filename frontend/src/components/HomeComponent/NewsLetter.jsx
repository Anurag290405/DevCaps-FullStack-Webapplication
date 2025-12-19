import React, { useState } from "react";
import WebsiteLoader from "../../Loader/WebsiteLoader";
import InsertEmail from "../../API's/NewsAPI/InsertEmail";

const NewsLetter = () => {
  const [email,setemail]=useState("")
  const [loading,setloading]=useState("")
  const [error,seterror]=useState("")

  const validateEmail = (email) => {
    // Email validation regex - accepts any valid email format
    const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const subscribe=async(e)=>{
    e.preventDefault()
    
    // Validate email
    if(!email.trim()){
      seterror("Please enter an email address")
      return;
    }

    if(!validateEmail(email)){
      seterror("Please enter a valid email address")
      return;
    }

    seterror("")
    setloading(true)
    const form={email:email}
    // console.log(email)
    const res=await InsertEmail(form)
    // console.log(res)
    if(res?.success){
      alert("Thank You For Subscribing ")
      setemail("")
      setloading(false)
    }
    else{
      alert("Email Already In Use Try Using Another Email")
      setloading(false)
    }
  }
  return (
    <div className="w-full max-w-[1512px] bg-neutral-100 overflow-hidden mx-auto">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between px-6 lg:px-20 py-10 lg:py-14 gap-6 lg:gap-12">
        {
          loading && <WebsiteLoader />
        }
        {/* Input + Button */}
        <div className="flex flex-col w-full max-w-md lg:max-w-lg gap-2">
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>{setemail(e.target.value); seterror("");}}
              className="flex-1 h-12 px-4 rounded-tl-md rounded-bl-md border border-black text-gray-700 font-['Poppins'] placeholder:text-gray-500 focus:outline-none"
            />
            <button onClick={subscribe} className="h-12 px-6 lg:px-8 flex items-center justify-center bg-gradient-to-br from-[#267E5A] to-[#267E5A] text-white rounded-tr-md rounded-br-md font-['Poppins']">
              Subscribe →
            </button>
          </div>
          {error && <p className="text-red-500 text-sm font-['Poppins']">{error}</p>}
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 max-w-xl">
          <h2
            className="text-black text-2xl lg:text-3xl font-semibold font-['Montserrat']"
            style={{
              fontVariant: "small-caps",
              lineHeight: "100%",
              letterSpacing: "-0.02em",
            }}
          >
            Join Our Newsletter
          </h2>
          <p
            className="text-black text-base lg:text-xl font-medium font-['Montserrat']"
            style={{
              fontVariant: "small-caps",
              lineHeight: "100%",
              letterSpacing: "-0.02em",
            }}
          >
            Get the latest news, event information, and openings details
          </p>
          <p className="text-black text-xs lg:text-sm font-normal font-['Poppins']">
            Declaration: Yes, I would like to receive communications by email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
