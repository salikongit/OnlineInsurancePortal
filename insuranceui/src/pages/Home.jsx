import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-20 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center  justify-center text-center py-24 px-6 bg-linear-to-r from-slate-900 to-slate-600 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Protect What Matters Most
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Explore our range of insurance plans designed to secure your life,
          health, and assets.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
            Get a Quote
          </button>
          <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Trusted by Thousands",
              desc: "We’ve helped thousands of families stay protected with comprehensive coverage.",
              icon: "💼",
            },
            {
              title: "Affordable Plans",
              desc: "Choose from flexible plans that fit your lifestyle and budget.",
              icon: "💰",
            },
            {
              title: "24/7 Support",
              desc: "Our support team is always ready to assist you — anytime, anywhere.",
              icon: "📞",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-gray-100 rounded-2xl text-center shadow-md hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-linear-to-r from-slate-900 to-slate-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8">
          Sign up today and discover insurance made simple.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
          Join Now
        </button>
      </section>
    </div>
  );
};

export default Home;
