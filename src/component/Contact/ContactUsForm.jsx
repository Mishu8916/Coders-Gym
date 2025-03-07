import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form Submitted", formData);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      alert("Message sent successfully!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="mt-5 w-full max-w-3xl h-auto dark:bg-white/75 bg-black/50 dark:text-black text-white rounded-2xl p-6 relative mx-4 sm:mx-8 lg:mx-16 shadow-lg shadow-primary">
        {/* Close Button - Navigates back */}
        <button onClick={() => navigate(-1)} className="absolute top-2 right-2 text-white text-2xl">
          &times;
        </button>

        <h2 className="text-3xl sm:text-5xl font-serif mb-6 text-center text-white dark:text-black">
          Get in <span className="text-primary"> Touch </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border hover:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-lg mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border hover:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-lg mb-2">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 border hover:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              placeholder="Write your message here"
              rows="4"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button type="submit" className="w-full bg-primary text-white p-3 rounded-md hover:bg-opacity-80 transition-colors duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
