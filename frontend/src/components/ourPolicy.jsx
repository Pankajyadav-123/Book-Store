import React from 'react';

const ModernPolicyPage = () => {
  const policies = [
    {
      title: "Privacy & Data",
      icon: "🔒",
      content: "Your reading habits are your own. We encrypt all personal data and never share your purchase history with third parties. We only store what's necessary to get your books to your door."
    },
    {
      title: "Shipping & Handling",
      icon: "📦",
      content: "Orders are processed within 24 hours. We use eco-friendly packaging to ensure your books arrive in pristine condition. Local delivery is free for orders over $35."
    },
    {
      title: "Returns & Refunds",
      icon: "🔄",
      content: "Not satisfied? Return any unread book in its original packaging within 30 days for a full refund. Digital products and rare collectibles are final sale."
    },
    {
      title: "Secure Payments",
      icon: "💳",
      content: "We support all major credit cards, PayPal, and Apple Pay. Our payment gateway is PCI-DSS compliant, ensuring your financial information is always protected."
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Simple Title */}
        <div className="mb-12 border-b border-stone-200 pb-8">
          <h1 className="text-4xl font-serif text-stone-900">Legal & Policies</h1>
          <p className="text-stone-500 mt-2">Everything you need to know about shopping with Gyan.</p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {policies.map((policy, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">{policy.icon}</div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">{policy.title}</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                {policy.content}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="mt-12 bg-emerald-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-serif mb-2">Have a specific question?</h2>
            <p className="text-emerald-100/80">Our support team is available 24/7 to help with your orders.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-stone-900 text-white px-8 py-3 rounded-full font-bold  transition-colors whitespace-nowrap">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernPolicyPage;