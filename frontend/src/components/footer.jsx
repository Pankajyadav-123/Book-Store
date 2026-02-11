import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#FDFCF8] py-12 px-6 my-5">
      <div className="max-w-7xl mx-auto">
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Big Brand Box */}
          <div className="md:col-span-2 bg-white border border-stone-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
            <div>
              <img src={logo} alt="Gyan" className="w-28 mb-6" />
              <h2 className="text-3xl font-serif text-stone-800 leading-tight">
                Curating stories for the <br />
                <span className="text-emerald-600 italic">independent mind.</span>
              </h2>
            </div>
            <p className="text-stone-400 text-sm mt-8 uppercase tracking-widest font-bold">
              Established 2026
            </p>
          </div>

          {/* Navigation Box */}
          <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm">
            <h4 className="text-stone-900 font-bold text-xs uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><Link to="/" className="hover:text-emerald-600 transition">Home</Link></li>
              <li><Link to="/collection" className="hover:text-emerald-600 transition">Collection</Link></li>
              <li><Link to="/about" className="hover:text-emerald-600 transition">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-600 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social & Help Box */}
          <div className="bg-emerald-600 p-8 rounded-[2.5rem] shadow-lg text-white flex flex-col justify-between">
            <h4 className="font-bold text-xs uppercase tracking-widest opacity-80">Help & Connect</h4>
            <div className="space-y-4 text-sm">
              <Link to="ourpolicy" className="block hover:underline">Privacy Policy</Link>
              <Link to="/policy" className="block hover:underline">Shipping Terms</Link>
              <div className="pt-4 flex gap-4">
                <span className="cursor-pointer bg-white/20 p-2 rounded-full">IG</span>
                <span className="cursor-pointer bg-white/20 p-2 rounded-full">TW</span>
              </div>
            </div>
          </div>

          {/* Newsletter Box (Full Width on Mobile) */}
          <div className="md:col-span-4 bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif italic">Subscribe to the Newsletter</h3>
              <p className="text-stone-400 text-sm mt-1">Get monthly curated book lists delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-transparent border-none px-4 py-2 outline-none w-full md:w-64 text-sm"
              />
              <button className="bg-emerald-600 hover:bg-stone-900 text-white px-6 py-2 rounded-xl font-bold text-xs  transition">
                JOIN
              </button>
            </div>
          </div>

        </div>

        {/* Legal Footer */}
        <div className="mt-8 text-center text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em]">
          © 2026 GYAN. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;