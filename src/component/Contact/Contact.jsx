import React, { useState } from "react";
import ContactUsForm from "./ContactUsForm";

export const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <span id="contact"></span>
      <div data-aos="zoom-in" className="dark:bg-dark dark:text-white py-14">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-100 dark:bg-dark py-8 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-black/80 dark:text-white">
                <span className="text-primary"> Sweat now, shine later.</span> Your body is a reflection of your lifestyle choices.
              </h1>
            </div>
            <div className="sm:grid sm:place-items-center">
              <button
                className="inline-block font-serif py-2 px-6 bg-outline dark:text-white hover:bg-primary/80 duration-200 tracking-widest uppercase border-2"
                onClick={() => setShowForm(true)} // Show form instead of navigating
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fix: Use showForm instead of undefined isModalOpen */}
      {showForm && <ContactUsForm isOpen={showForm} onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Contact;
