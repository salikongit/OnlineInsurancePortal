// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function PolicyDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [policy, setPolicy] = useState(null);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     axios
//       .get(`/api/policies/${id}`)
//       .then((res) => setPolicy(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleBuyNow = async () => {
//     try {
//       await axios.post(`/api/policies/buy`, {
//         user_id: user.user_id,
//         policy_id: id,
//       });
//       alert("Policy purchased successfully!");
//       navigate("/myaccount");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to buy policy");
//     }
//   };

//   if (!policy) return <p className="text-center mt-20">Loading...</p>;

//   return (
//     <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-20">
//       <h2 className="text-3xl font-bold text-indigo-700 mb-4">
//         {policy.policy_name}
//       </h2>
//       <p className="text-gray-600 mb-4">{policy.long_desc}</p>
//       <p className="text-lg mb-2">
//         <b>Premium:</b> ${policy.premium_amount}
//       </p>
//       <p className="text-lg mb-8">
//         <b>Duration:</b> {policy.duration_years} years
//       </p>

//       <div className="flex gap-4">
//         <button
//           onClick={() => navigate("/")}
//           className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleBuyNow}
//           className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700"
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch policy details on mount
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/policy/${id}`);
        setPolicy(res.data);
      } catch (err) {
        console.error("Error fetching policy:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  // ✅ Handle Buy button click
  const handleBuyNow = async () => {
    if (!user) {
      alert("Please log in to purchase a policy.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post("http://localhost:7000/purchase", {
        user_id: user.id,
        policy_id: id,
      });

      alert(res.data.message || "Policy purchased successfully!");
      navigate("/myaccount");
    } catch (err) {
      console.error("Error purchasing policy:", err);
      const message =
        err.response?.data?.message || "Failed to purchase policy.";
      alert(message);
    }
  };

  // ✅ Loading state
  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  }

  if (!policy) {
    return <p className="text-center mt-20 text-red-500">Policy not found.</p>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-60 mb-102">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">
        {policy.policy_name}
      </h2>
      <p className="text-gray-600 mb-4">{policy.long_desc}</p>
      <p className="text-lg mb-2">
        <b>Premium:</b> ${policy.premium_amount}
      </p>
      <p className="text-lg mb-8">
        <b>Duration:</b> {policy.duration_years} years
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
