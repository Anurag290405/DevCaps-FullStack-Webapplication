import { useState } from "react";
import { API_URL, contact as contactEndpoint } from "../../NwConfig";

const heroContent = {
  title: "Welcome to DevCaps",
  description:
    "DevCaps is a dynamic innovation and incubation platform designed to empower developers, startups, and student entrepreneurs. We provide mentorship, technical guidance, industry exposure, and collaborative opportunities to transform ideas into scalable solutions. From early-stage validation to market-ready products, DevCaps supports innovation at every step."
};

const Hero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (loading) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(`${API_URL}${contactEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((r) => r.json());

      if (res?.success) {
        setSuccess("Query submitted successfully");
        setFormData({ name: "", email: "", phone: "", message: "" });

        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        setError(res?.message || "Failed to submit query");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[650px] bg-neutral-100 overflow-hidden">
      <div className="relative max-w-[1512px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 lg:px-16 py-10 lg:py-16">

        {/* Left - Contact Form */}
        <div
          className="w-full lg:w-5/12 rounded-2xl p-6 sm:p-8 shadow-xl border border-black"
          style={{ backgroundColor: "rgba(45, 84, 210, 0.1)" }} // #2D54D2 at 10% opacity
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Drop Your Query
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg bg-white border border-black text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Contact No.
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter valid phone no."
                  className="w-full px-4 py-3 rounded-lg bg-white border border-black text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Message (optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your idea"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-white border border-black text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              {loading ? "Sending..." : "Send query →"}
            </button>

            {/* Popup Messages */}
            {success && (
              <div className="mt-3 text-sm text-green-700 bg-green-100 px-4 py-2 rounded-md">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-3 text-sm text-red-700 bg-red-100 px-4 py-2 rounded-md">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Right - Text */}
        <div className="w-full lg:w-6/12 flex flex-col justify-center text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
            {heroContent.title}
          </h1>
          <p className="text-base sm:text-lg mb-8 leading-relaxed text-gray-700">
            {heroContent.description}
          </p>
          <div className="flex justify-start">
            <a
              href="#"
              className="text-lg font-medium underline text-gray-700 hover:text-black transition-colors inline-flex items-center gap-2"
            >
              Know More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
