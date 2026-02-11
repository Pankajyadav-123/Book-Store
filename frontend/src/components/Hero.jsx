import React from 'react'
import {Link} from "react-router-dom"

const CreativeHeroFixed = () => {
  return (
    // Changed min-h-screen to a fixed max-height for desktop
    <section className="relative w-full lg:h-[calc(100vh-80px)] flex items-center bg-emerald-50/30 py-6 md:py-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
          
          {/* Main Content Box - Adjusted padding */}
          <div className="lg:col-span-7 bg-white p-6 md:p-12 rounded-[2rem] shadow-sm border border-emerald-100 flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Independent Bookstore
              </span>
            </div>
            
            {/* Reduced font sizes slightly to save vertical space */}
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-[1.1] mb-4">
              Read <br /> 
              <span className="text-emerald-600 italic">Something</span> <br /> 
              Different.
            </h1>
            
            <p className="text-stone-600 text-sm md:text-base max-w-md mb-8 leading-relaxed">
              We swap the algorithms for human touch. Discover hand-picked 
              titles that you won't find on the bestseller lists.
            </p>

            <div className="flex items-center gap-4">
              <Link to ="/collection" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-stone-900 transition-colors shadow-lg text-sm">
                Shop Collection
              </Link>
            </div>
          </div>

          {/* Side Grid - Reduced height for better fit */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 max-h-[500px] md:max-h-none">
            {/* Top Tall Image - Reduced height */}
            <div className="col-span-1 h-[200px] md:h-auto bg-amber-100 rounded-[2rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
                alt="Book" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </div>

            {/* Top Square Box - More compact */}
            <div className="col-span-1 aspect-square bg-emerald-600 rounded-[2rem] p-5 flex flex-col justify-between text-white shadow-xl">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.993 7.993 0 002 12a5 5 0 003 4.588V19a1 1 0 001 1h8a1 1 0 001-1v-2.412A5 5 0 0018 12c0-4.418-3.582-8-8-8zm0 2c2.761 0 5 2.239 5 5a3 3 0 11-6 0c0-2.761 2.239-5 5-5z"/></svg>
               <div>
                 <p className="text-xl font-bold italic">24h</p>
                 <p className="text-[10px] uppercase tracking-widest opacity-80 leading-tight">Fast Local Delivery</p>
               </div>
            </div>

            {/* Bottom Horizontal Image - Shorter height */}
            <div className="col-span-2 h-[150px] md:h-[180px] bg-stone-200 rounded-[2rem] overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000" 
                alt="Library" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-5">
                <p className="text-white font-serif italic text-sm">"A book is a gift you can open again."</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreativeHeroFixed;