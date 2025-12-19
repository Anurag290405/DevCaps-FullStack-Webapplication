import React, { useState } from "react";
import WebsiteLoader from "../../Loader/WebsiteLoader";
import InsertEmail from "../../API's/NewsAPI/InsertEmail";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const subscribe = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await InsertEmail({ email });

      if (res?.success) {
        setSuccess("Successfully subscribed to the newsletter ");
        setEmail("");

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError("Email already in use. Try another one.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1512px] bg-neutral-100 overflow-hidden mx-auto">
      {loading && <WebsiteLoader />}

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between px-6 lg:px-20 py-10 lg:py-14 gap-6 lg:gap-12">

        {/* Input + Button */}
        <form
          onSubmit={subscribe}
          className="flex flex-col w-full max-w-md lg:max-w-lg gap-2 relative"
        >
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess("");
              }}
              className="flex-1 h-12 px-4 rounded-tl-md rounded-bl-md border border-black text-gray-700 font-['Poppins'] placeholder:text-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 lg:px-8 flex items-center justify-center bg-gradient-to-br from-[#267E5A] to-[#267E5A] text-white rounded-tr-md rounded-br-md font-['Poppins']"
            >
              Subscribe 
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm font-['Poppins']">
              {error}
            </p>
          )}

          {/* Success Popup */}
          {success && (
            <p className="text-green-600 text-sm font-['Poppins']">
              {success}
            </p>
          )}
        </form>

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
