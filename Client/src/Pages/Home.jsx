import React from 'react';

const Home = () => {
  return (
    <div className="bg-[#E7F6F2] text-black min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to SponsoSync</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Connecat with top sponsors and elevate your events to the next level. Join us today and explore unlimited sponsorship opportunities!
        </p>
        <a 
          href="/login" 
          className="mt-6 inline-block bg-[#005f73] px-6 py-3 rounded-lg text-lg font-semibold text-white hover:bg-[#0a9396] transition-all duration-300"
        >
          Get Started
        </a>
      </header>

      {/* Features Section */}
      <section className="w-full py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { 
              title: "Free of Cost", 
              desc: "Get and provide sponsorships with zero platform charges.", 
              img: "/money.png" 
            },
            { 
              title: "Easy Collaboration", 
              desc: "Seamless communication and partnership management with our tools.", 
              img: "/collabration.png" 
            },
            { 
              title: "Wide Network", 
              desc: "Connect with sponsors from various industries and secure the best deals.", 
              img: "/wide.png" 
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-[#94d2bd] rounded-xl shadow-xl border-2 border-transparent transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#005f73] flex flex-col items-center"
            >
              {/* Attractive Logo Design */}
              <div className="w-20 h-20 flex justify-center items-center bg-white rounded-full border-4 border-[#005f73] shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
                <img src={feature.img} alt={feature.title} className="w-12 h-12" />
              </div>

              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-black mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;