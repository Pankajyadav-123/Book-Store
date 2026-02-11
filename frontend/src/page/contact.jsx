import React, { useState } from 'react';

const ContactPage = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Message sent successfully!");
  };

  // Simple SVG Icon Component to avoid library errors
  const IconWrapper = ({ children }) => (
    <div className="p-3 bg-white rounded-full text-amber-700 shadow-sm shrink-0">
      {children}
    </div>
  );

  return (
    <div className="bg-stone-50 min-h-screen py-10 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-serif mb-3 text-stone-900">Get in Touch</h1>
          <p className="text-stone-600 text-sm md:text-base">We usually respond within 24 hours.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Info Side */}
          <div className="w-full lg:w-2/5 space-y-6 md:space-y-8 bg-amber-50 p-6 md:p-10 rounded-2xl">
            <h2 className="text-xl md:text-2xl font-serif text-amber-900">Contact Details</h2>
            
            <div className="flex items-start gap-4">
              <IconWrapper>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </IconWrapper>
              <div className="break-all">
                <p className="text-xs text-stone-500 uppercase font-bold">Email</p>
                <a href="mailto:hello@bookshop.com" className="text-md md:text-lg hover:text-amber-700 transition">pankajyadav95834@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <IconWrapper>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </IconWrapper>
              <div>
                <p className="text-xs text-stone-500 uppercase font-bold">Call</p>
                <a href="tel:+1234567890" className="text-md md:text-lg hover:text-amber-700 transition">(555) 123-4567</a>
              </div>
            </div>

            <div className="pt-6 border-t border-amber-200">
              <p className="text-sm text-stone-600 font-medium italic">"The bookstore is a doorway into another world."</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-stone-100 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2 text-stone-700">Name</label>
                  <input type="text" placeholder="Your Name" className="p-3 bg-stone-50 border border-stone-200 rounded-lg outline-amber-500 transition-all" required />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2 text-stone-700">Gmail</label>
                  <input type="email" placeholder="email@gmail.com" className="p-3 bg-stone-50 border border-stone-200 rounded-lg outline-amber-500 transition-all" required />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-stone-700">Your Message</label>
                <textarea rows="5" placeholder="How can we help?" className="p-3 bg-stone-50 border border-stone-200 rounded-lg outline-amber-500 transition-all resize-none" required></textarea>
              </div>
              <button className="w-full  bg-emerald-600 hover:bg-stone-900 text-white font-bold py-4 rounded-lg shadow-lg transform active:scale-[0.98] transition-all">
                Send to Bookstore
              </button>
              {status && <p className="text-center text-green-600 font-medium animate-pulse">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;