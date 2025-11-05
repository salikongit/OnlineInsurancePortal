
import { getAllPolicies } from "../services/PolicyServices";

// export function Home() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 mt-20 text-gray-800">
//       {/* Hero Section */}
//       <section className="flex flex-col items-center  justify-center text-center py-24 px-6 bg-linear-to-r from-slate-900 to-slate-600 text-white">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4">
//           Protect What Matters Most
//         </h1>
//         <p className="text-lg md:text-xl mb-8 max-w-2xl">
//           Explore our range of insurance plans designed to secure your life,
//           health, and assets.
//         </p>
//         <div className="flex gap-4">
//           <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
//             Get a Quote
//           </button>
//           <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all">
//             Learn More
//           </button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           Why Choose Us
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {[
//             {
//               title: "Trusted by Thousands",
//               desc: "We’ve helped thousands of families stay protected with comprehensive coverage.",
//               icon: "💼",
//             },
//             {
//               title: "Affordable Plans",
//               desc: "Choose from flexible plans that fit your lifestyle and budget.",
//               icon: "💰",
//             },
//             {
//               title: "24/7 Support",
//               desc: "Our support team is always ready to assist you — anytime, anywhere.",
//               icon: "📞",
//             },
//           ].map((feature, i) => (
//             <div
//               key={i}
//               className="p-8 bg-gray-100 rounded-2xl text-center shadow-md hover:shadow-lg transition-all"
//             >
//               <div className="text-5xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Call-to-Action */}
//       <section className="py-16 bg-linear-to-r from-slate-900 to-slate-600 text-white text-center">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//           Ready to Get Started?
//         </h2>
//         <p className="text-lg mb-8">
//           Sign up today and discover insurance made simple.
//         </p>
//         <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
//           Join Now
//         </button>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";

export function Home() {
  // Using a single state. An empty array indicates initial/loading/no data state.
  // We can't easily distinguish between 'loading' and 'error' without more state,
  // but we can assume an empty array is the state before data arrives or if no policies are found.
  const [policies, setPolicies] = useState(null); // Set to null initially to represent 'loading'/'unfetched' state

  // 2. useEffect hook to fetch policies from the backend when the component mounts
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // NOTE: Keeping your assumption of using getAllPolicies() which uses axios and returns { data: [...] }
        const response = await getAllPolicies();
        setPolicies(response.data);
      } catch (error) {
        // Log the error to the console for debugging
        console.error("Error fetching policies:", error);
        // Set an empty array on error to halt the spinner and display "No policies available"
        // In a production app, you might want a dedicated 'error' state to show a specific message.
        setPolicies([]); 
      }
    };

    fetchPolicies();
  }, []); 

  // 3. Helper component for rendering a single policy card
  const PolicyCard = ({ policy }) => (
    <div
      key={policy.policy_id}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
    >
      <h3 className="text-xl font-bold text-indigo-600 mb-2">{policy.policy_name}</h3>
      {/* Set a fixed height for short_desc to keep card size consistent */}
      <p className="text-gray-600 mb-4 h-12 overflow-hidden">{policy.short_desc}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p className="font-semibold text-gray-800">
          Premium: <span className="text-green-600 font-bold">${policy.premium_amount}</span>
        </p>
        <p>Duration: {policy.duration_years} years</p>
      </div>
      <button className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
        View Details
      </button>
    </div>
  );

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

      {/* 4. Policies Section - NEW SECTION to Display Fetched Policies */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
          Our Insurance Policies
        </h2>

        {/* Conditional Rendering: Check the single 'policies' state */}
        {policies === null && <p className="text-center text-gray-500 text-lg">Loading policies...</p>}
        {Array.isArray(policies) && policies.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {policies.map((policy) => (
              <PolicyCard key={policy.policy_id} policy={policy} />
            ))}
          </div>
        )}
        {Array.isArray(policies) && policies.length === 0 && (
          <p className="text-center text-gray-500 text-lg">No policies available at the moment or failed to fetch data.</p>
        )}
      </section>

      {/* Features Section - UNCHANGED, now visually separated by the Policies Section */}
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
}
