import { useState } from "react";
import { toast } from "sonner";
import { API_URL, contact as contactEndpoint } from "../../NwConfig";

const heroContent = {
  title: "Welcome To DevCaps",
  description:
    "Office ipsum you must be muted. Needed globalize be dunder hit customer game discussion. Define where company asserts hanging agile. Also old after invested regroup wanted post ballpark base. Didn't the game across latest clean. Incompetent teeth power but our. People can say dangerous money agile. Agile design evals based so T-shaped monday evening please. Zoom innovation alarming looking model time. Has performance running standup heads-up cob rat. As don't reality scout-added matter developing one before crank.",
};

const Hero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const res = await fetch(API_URL + contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(r => r.json());
    setLoading(false);

    if (res?.success) {
      toast.success("Query submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error(res?.message || "Failed to submit query");
    }
  };

  return (
    <div className="relative w-full h-auto min-h-[600px] lg:h-[650px] overflow-hidden bg-neutral-100">
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12 px-6 lg:px-16 py-10 lg:py-16">
        {/* Left side - Contact Form */}
        <div className="w-full lg:w-5/12 bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Drop Your Query</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact No.
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter valid phone no."
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your idea"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Send query →"}
            </button>
          </form>
        </div>

        {/* Right side - Welcome Text */}
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
