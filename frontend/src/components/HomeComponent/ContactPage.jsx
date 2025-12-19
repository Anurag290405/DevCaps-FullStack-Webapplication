import React, { useState } from "react";
import Facebook from "./Images/Facebook.png";
import Instagram from "./Images/Instagram.png";
import Linkdin from "./Images/Linkdin.png";
import Youtube from "./Images/Youtube.svg";
import Twitter from "./Images/Twitter.png";
import mail from "./Images/mail.svg";
import location_on from "./Images/location_on.svg";
import call_end from "./Images/call_end.png";
import Time from "./Images/Time.png";
import InsertQuery from "../../API's/ContactAPI/InsertQuery";
import { toast, ToastContainer } from "react-toastify";
// import Footer from "../sara/HomeComponent/Footer";
// import Navbar from "../sara/HomeComponent/Navbar";

const ContactPage = () => {
  const [loadFailed, setLoadFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit number.";
    }
    if (!formData.role.trim()) newErrors.role = "Please select a role.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // console.log("Submitted:", formData);
      setLoading(true);
      const res=await InsertQuery(formData)
      // console.log(res)
      if(res?.message==="Successfully Inserted Query"){
        toast.success("Message sent successfully!",{position: "top-center",autoClose: 2000});
        setLoading(false);
      }
      else{
        toast.error("Failed to send message. Please try again later.",{position: "top-center",autoClose: 2000});
        setLoading(false);
      }
      // Optionally reset:
      setFormData({ name: "", email: "", contact: "", role: "", message: "" });
    }
  };

  return (
    <>
    {/* <Navbar/> */}
    <div className="w-full min-h-screen bg-neutral-100 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Contact Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center px-4 md:px-6 py-10 gap-6">
        {!loadFailed ? (
          <iframe
            title="Map"
            className="w-full max-w-[669px] h-[240px] rounded-2xl border border-black"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.8782186897715!2d75.80101577603034!3d22.621022379457248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962f958dcb7169d%3A0xd877c12078e50f0f!2sMedicaps%20University!5e0!3m2!1sen!2sin!4v1752045912743!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setLoadFailed(true)}
          ></iframe>
        ) : (
          <img
            src={map_image}
            alt="Fallback Map"
            className="w-full max-w-[669px] h-[240px] rounded-2xl border border-black object-cover"
          />
        )}
  <ToastContainer />
        <form className="w-full max-w-[669px] flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="text-black text-xl font-[Poppins]">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-5 py-2.5 mt-1 border ${
                errors.name ? "border-red-500" : "border-black"
              } rounded-[5px] text-neutral-500 text-xl font-[Poppins]`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email and Contact */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-black text-xl font-[Poppins]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter mail ID"
                className={`w-full px-5 py-2.5 mt-1 border ${
                  errors.email ? "border-red-500" : "border-black"
                } rounded-[5px] text-neutral-500 text-xl font-[Poppins]`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="flex-1">
              <label className="text-black text-xl font-[Poppins]">Contact No.</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter valid phone number"
                className={`w-full px-5 py-2.5 mt-1 border ${
                  errors.contact ? "border-red-500" : "border-black"
                } rounded-[5px] text-neutral-500 text-xl font-[Poppins]`}
              />
              {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact}</p>}
            </div>
          </div>

          {/* Role */}
          <div className="w-full">
            <label className="text-black text-xl font-[Poppins]">What Describes You The Best</label>
            <div className="relative mt-1">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full appearance-none px-5 py-2.5 border ${
                  errors.role ? "border-red-500" : "border-black"
                } rounded-[5px] text-neutral-500 text-xl font-[Poppins] pr-10`}
              >
                <option value="">Select Role</option>
                <option className="capitalize">student</option>
                <option className="capitalize">entrepreneur</option>
                <option className="capitalize">investor</option>
                <option className="capitalize">mentor</option>
                <option className="capitalize">other</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-black text-xl font-[Poppins] pointer-events-none">
                &gt;
              </div>
              {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-black text-xl font-[Poppins]">Message (optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="4"
              className="w-full px-5 py-2.5 mt-1 border border-black rounded-[5px] text-neutral-500 text-xl font-[Poppins]"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full btn-primary text-white py-3 rounded-2xl text-base font-[Poppins] hover:brightness-110 transition duration-300"
          >
           {loading ? " Sending message..." : " Send message →"}
          </button>
        </form>
      </div>

      {/* Right Side - Contact Info */}
      <div className="w-full lg:w-1/2 bg-transparent border-y-[13px] border-white rounded-tl-[30px] rounded-bl-[30px] px-6 py-[40px] flex flex-col gap-8 text-left mx-auto md:px-8 lg:px-16">
        <h2
          className="text-white text-[35px] font-semibold font-['Montserrat']"
          style={{ fontVariant: "small-caps" }}
        >
          Contact Information
        </h2>

        <p className="text-white text-[15px] font-[Poppins] max-w-xs">
          If you have any questions, feel free to get in touch with us.
        </p>

        <div className="flex items-start gap-4 pt-9">
          <img src={call_end} alt="Call Icon" className="w-5 h-5 mt-[1px]" />
          <div className="flex flex-col text-white text-[18px] font-[Poppins] leading-tight">
            <a href="tel:+9107313111481" className="hover:underline">
              +91-0731-3111481
            </a>
            <a href="tel:+917723019451" className="hover:underline">
              +91-7723019451
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-5 flex-wrap break-all max-w-full">
          <img src={mail} alt="Mail Icon" className="w-6 h-6 flex-shrink-0" />
          <a
            href="mailto:info@miifoundation.com"
            className="text-white text-[18px] font-[Poppins] hover:underline break-words overflow-hidden text-ellipsis"
          >
            info@miifoundation.com
          </a>
        </div>

        <div className="flex items-start gap-4 pt-5">
          <img src={location_on} alt="Location Icon" className="w-6 h-6" />
          <a
            href="https://www.google.com/maps?q=AB+Road+Pigdamber,+Rau,+Indore,+Madhya+Pradesh+-453331"
            className="text-white text-[18px] font-[Poppins] hover:underline"
          >
            AB Road Pigdamber, Rau, Indore,
            <br />
            Madhya Pradesh - 453331
          </a>
        </div>

        <div className="text-white text-[16px] font-[Poppins] pt-5">Monday - Saturday</div>

        <div className="flex items-center gap-4">
          <img src={Time} alt="Time Icon" className="w-6 h-6" />
          <div className="text-white text-[18px] font-[Poppins]">8:30 AM - 8:30 PM</div>
        </div>

        <div className="flex gap-3 pt-10 mt-auto">
          {[Instagram, Linkdin, Twitter, Facebook, Youtube].map((icon, index) => (
            <a key={index} href="#">
              <img
                src={icon}
                alt={`icon-${index}`}
                className="w-[25px] h-[25px] object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default ContactPage;
