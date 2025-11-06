// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllPolicies } from "../services/PolicyServices";

// export function Home() {
//   const [policies, setPolicies] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Memoize user so it doesn’t change on every render
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   }, []); // only runs once

//   useEffect(() => {
//     const fetchPolicies = async () => {
//       if (!user) return;
//       console.log("Fetching policies...");
//       try {
//         const response = await getAllPolicies();
//         setPolicies(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching policies:", error);
//         setPolicies([]);
//       }
//     };
//     fetchPolicies();
//   }, [user]); // user now stable → no infinite loop

//   // ✅ Render UI
//   const PolicyCard = ({ policy }) => (
//     <div
//       key={policy.policy_id}
//       className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
//     >
//       <h3 className="text-xl font-bold text-indigo-600 mb-2">
//         {policy.policy_name}
//       </h3>
//       <p className="text-gray-600 mb-4 h-12 overflow-hidden">
//         {policy.short_desc}
//       </p>
//       <div className="text-sm text-gray-500 mb-4">
//         <p className="font-semibold text-gray-800">
//           Premium:{" "}
//           <span className="text-green-600 font-bold">
//             ${policy.premium_amount}
//           </span>
//         </p>
//         <p>Duration: {policy.duration_years} years</p>
//       </div>
//       <button
//         onClick={() => navigate(`/policy/${policy.policy_id}`)}
//         className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
//       >
//         Buy Now
//       </button>
//     </div>
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 mt-20 text-gray-800">
//       <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-linear-to-r from-slate-900 to-slate-600 text-white">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4">
//           Protect What Matters Most
//         </h1>
//         <p className="text-lg md:text-xl mb-8 max-w-2xl">
//           Explore our range of insurance plans designed to secure your life,
//           health, and assets.
//         </p>
//       </section>

//       {user && (
//         <section className="py-16 px-6 md:px-16 lg:px-24 bg-gray-100">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
//             Our Insurance Policies
//           </h2>

//           {policies === null && (
//             <p className="text-center text-gray-500 text-lg">
//               Loading policies...
//             </p>
//           )}

//           {Array.isArray(policies) && policies.length > 0 && (
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {policies.map((policy) => (
//                 <PolicyCard key={policy.policy_id} policy={policy} />
//               ))}
//             </div>
//           )}

//           {Array.isArray(policies) && policies.length === 0 && (
//             <p className="text-center text-gray-500 text-lg">
//               No policies available at the moment.
//             </p>
//           )}
//         </section>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllPolicies } from "../services/PolicyServices";

// export function Home() {
//   const [policies, setPolicies] = useState(null);
//   const navigate = useNavigate();

//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     const fetchPolicies = async () => {
//       if (!user) return;
//       console.log("Fetching policies...");
//       try {
//         const response = await getAllPolicies();
//         setPolicies(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching policies:", error);
//         setPolicies([]);
//       }
//     };
//     fetchPolicies();
//   }, [user]);

//   // ✅ Card for policies (unchanged)
//   const PolicyCard = ({ policy }) => (
//     <div
//       key={policy.policy_id}
//       className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
//     >
//       <h3 className="text-xl font-bold text-indigo-600 mb-2">
//         {policy.policy_name}
//       </h3>
//       <p className="text-gray-600 mb-4 h-12 overflow-hidden">
//         {policy.short_desc}
//       </p>
//       <div className="text-sm text-gray-500 mb-4">
//         <p className="font-semibold text-gray-800">
//           Premium:{" "}
//           <span className="text-green-600 font-bold">
//             ${policy.premium_amount}
//           </span>
//         </p>
//         <p>Duration: {policy.duration_years} years</p>
//       </div>
//       <button
//         onClick={() => navigate(`/policy/${policy.policy_id}`)}
//         className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
//       >
//         Buy Now
//       </button>
//     </div>
//   );

//   // ✅ Promotional section for logged-out users
//   const PromoSection = () => (
//     <section className="py-16 px-6 md:px-16 lg:px-24 bg-gray-50 text-center">
//       <h2 className="text-4xl font-bold text-indigo-700 mb-8">
//         Why Choose Our Insurance?
//       </h2>
//       <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
//         <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
//           <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
//             💎 Trusted Protection
//           </h3>
//           <p className="text-gray-600">
//             Backed by years of trust and thousands of satisfied customers who
//             rely on us for their health and life security.
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
//           <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
//             ⚡ Quick Claim Processing
//           </h3>
//           <p className="text-gray-600">
//             Our streamlined digital process ensures faster claim approvals with
//             minimal paperwork.
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
//           <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
//             🕐 24/7 Customer Support
//           </h3>
//           <p className="text-gray-600">
//             Get support any time of the day — our dedicated team is always ready
//             to help you when you need it most.
//           </p>
//         </div>
//       </div>

//       <div className="mt-12">
//         <button
//           onClick={() => navigate("/login")}
//           className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
//         >
//           Get Started Today
//         </button>
//       </div>
//     </section>
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 mt-20 text-gray-800">
//       <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-linear-to-r from-slate-900 to-slate-600 text-white">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4">
//           Protect What Matters Most
//         </h1>
//         <p className="text-lg md:text-xl mb-8 max-w-2xl">
//           Explore our range of insurance plans designed to secure your life,
//           health, and assets.
//         </p>
//       </section>

//       {/* ✅ If logged in → show policies | else → promotional cards */}
//       {user ? (
//         <section className="py-16 px-6 md:px-16 lg:px-24 bg-gray-100">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
//             Our Insurance Policies
//           </h2>

//           {policies === null && (
//             <p className="text-center text-gray-500 text-lg">
//               Loading policies...
//             </p>
//           )}

//           {Array.isArray(policies) && policies.length > 0 && (
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {policies.map((policy) => (
//                 <PolicyCard key={policy.policy_id} policy={policy} />
//               ))}
//             </div>
//           )}

//           {Array.isArray(policies) && policies.length === 0 && (
//             <p className="text-center text-gray-500 text-lg">
//               No policies available at the moment.
//             </p>
//           )}
//         </section>
//       ) : (
//         <PromoSection />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPolicies } from "../services/PolicyServices";

export function Home() {
  const [policies, setPolicies] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  useEffect(() => {
    const fetchPolicies = async () => {
      if (!user) return;
      console.log("Fetching policies...");
      try {
        const response = await getAllPolicies();
        setPolicies(response.data);
      } catch (error) {
        console.error("❌ Error fetching policies:", error);
        setPolicies([]);
      }
    };
    fetchPolicies();
  }, [user]);

  // ✅ Card for policies (unchanged)
  const PolicyCard = ({ policy }) => (
    <div
      key={policy.policy_id}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
    >
      <h3 className="text-xl font-bold text-indigo-600 mb-2">
        {policy.policy_name}
      </h3>
      <p className="text-gray-600 mb-4 h-12 overflow-hidden">
        {policy.short_desc}
      </p>
      <div className="text-sm text-gray-500 mb-4">
        <p className="font-semibold text-gray-800">
          Premium:{" "}
          <span className="text-green-600 font-bold">
            Rs. {policy.premium_amount}
          </span>
        </p>
        <p>Duration: {policy.duration_years} years</p>
      </div>
      <button
        onClick={() => navigate(`/policy/${policy.policy_id}`)}
        className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );

  // ✅ Promotional section for logged-out users
  const PromoSection = () => (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold text-indigo-700 mb-8">
        Why Choose Our Insurance?
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
            💎 Trusted Protection
          </h3>
          <p className="text-gray-600">
            Backed by years of trust and thousands of satisfied customers who
            rely on us for their health and life security.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
            ⚡ Quick Claim Processing
          </h3>
          <p className="text-gray-600">
            Our streamlined digital process ensures faster claim approvals with
            minimal paperwork.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
            🕐 24/7 Customer Support
          </h3>
          <p className="text-gray-600">
            Get support any time of the day — our dedicated team is always ready
            to help you when you need it most.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Get Started Today
        </button>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-20 text-gray-800">
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-linear-to-r from-slate-900 to-slate-600 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Protect What Matters Most
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Explore our range of insurance plans designed to secure your life,
          health, and assets.
        </p>
      </section>

      {/* ✅ If logged in → show policies | else → promotional cards */}
      {user ? (
        <section className="py-16 px-6 md:px-16 lg:px-24 bg-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
            Our Insurance Policies
          </h2>

          {policies === null && (
            <p className="text-center text-gray-500 text-lg">
              Loading policies...
            </p>
          )}

          {Array.isArray(policies) && policies.length > 0 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {policies.map((policy) => (
                <PolicyCard key={policy.policy_id} policy={policy} />
              ))}
            </div>
          )}

          {Array.isArray(policies) && policies.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              No policies available at the moment.
            </p>
          )}
        </section>
      ) : (
        <PromoSection />
      )}
    </div>
  );
}
