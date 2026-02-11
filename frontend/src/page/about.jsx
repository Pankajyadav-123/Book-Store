import React from 'react';

const AboutPage = () => {
  const values = [
    { title: "Curated Collection", desc: "Every book on our shelf is hand-picked by our staff of bibliophiles." },
    { title: "Community First", desc: "We host weekly readings and local author spotlights." },
    { title: "Sustainable Reading", desc: "Our 'Pre-Loved' program helps books find second homes." }
  ];

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800">
      {/* Hero Section */}
      <section className="py-20 bg-sepia-100 text-center px-4">
        <h1 className="text-5xl font-serif mb-4">Our Story Starts Here</h1>
        <p className="text-xl max-w-2xl mx-auto italic text-stone-600">
          "A room without books is like a body without a soul."
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-serif mb-6 border-b-2 border-amber-600 inline-block">
            Since 2026
          </h2>
          <p className="mb-4 leading-relaxed">
            What started as a small cart in a local weekend market has grown into a sanctuary for 
            dreamers, thinkers, and explorers. We believe that in a digital world, the feel of 
            paper and the smell of ink are more important than ever.
          </p>
          <p className="leading-relaxed">
            Our mission is simple: to connect the right reader with the right book. Whether you're 
            looking for a rare first edition or the latest bestseller, we’re here to help you 
            discover your next great adventure.
          </p>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000" 
            alt="Cozy bookstore interior" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <section className="bg-stone-200 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-3xl font-serif mb-12">Why We Read</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-amber-700">
                <h4 className="font-bold text-xl mb-3">{v.title}</h4>
                <p className="text-stone-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;