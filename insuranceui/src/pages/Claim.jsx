// import React, { useState, useEffect } from "react";
// import { submitClaim } from "../services/ClaimService";
// import axios from "axios";
// import { toast } from "../components/hooks/use-toast"; // if you’re using lightswind/toaster

// export default function Claim() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [policies, setPolicies] = useState([]);
//   const [claimData, setClaimData] = useState({
//     policy_id: "",
//     claim_reason: "",
//     claim_amount: "",
//   });

//   // Fetch user’s purchased policies for dropdown
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:7000/purchase/user/${user.id}`
//         );
//         setPolicies(res.data || []);
//       } catch (err) {
//         console.error("❌ Error fetching policies:", err);
//       }
//     };
//     fetchPolicies();
//   }, [user.id]);

//   // Handle claim form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await submitClaim({
//         user_id: user.id,
//         policy_id: claimData.policy_id,
//         claim_reason: claimData.claim_reason,
//         claim_amount: claimData.claim_amount,
//       });

//       toast({
//         title: "Claim submitted succesfully",
//         variant: "success",
//       });
//       setClaimData({ policy_id: "", claim_reason: "", claim_amount: "" });
//     } catch (err) {
//       console.log(err);
//       toast({
//         title: "Claim submission failed",
//         variant: "warning",
//       });
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-md">
//       <h2 className="text-3xl font-semibold text-indigo-700 mb-6">
//         Submit a Claim
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Policy dropdown */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Select Policy
//           </label>
//           <select
//             name="policy_id"
//             value={claimData.policy_id}
//             onChange={(e) =>
//               setClaimData({ ...claimData, policy_id: e.target.value })
//             }
//             className="w-full border rounded-lg p-2"
//             required
//           >
//             <option value="">-- Choose Policy --</option>
//             {policies.map((p) => (
//               <option key={p.policy_id} value={p.policy_id}>
//                 {p.policy_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Claim reason */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Claim Reason
//           </label>
//           <textarea
//             name="claim_reason"
//             value={claimData.claim_reason}
//             onChange={(e) =>
//               setClaimData({ ...claimData, claim_reason: e.target.value })
//             }
//             className="w-full border rounded-lg p-2"
//             placeholder="Describe your claim reason"
//             required
//           />
//         </div>

//         {/* Claim amount */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Claim Amount
//           </label>
//           <input
//             type="number"
//             name="claim_amount"
//             value={claimData.claim_amount}
//             onChange={(e) =>
//               setClaimData({ ...claimData, claim_amount: e.target.value })
//             }
//             className="w-full border rounded-lg p-2"
//             placeholder="Enter claim amount"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//         >
//           Submit Claim
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { submitClaim } from "../services/ClaimService";
import axios from "axios";
import { toast } from "../components/hooks/use-toast"; // lightswind/toaster

export default function Claim() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [policies, setPolicies] = useState([]);
  const [claimData, setClaimData] = useState({
    policy_id: "",
    claim_reason: "",
    claim_amount: "",
  });

  // Fetch user's purchased policies for dropdown
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/purchase/user/${user.id}`
        );
        setPolicies(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching policies:", err);
      }
    };
    fetchPolicies();
  }, [user.id]);

  // Handle claim form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitClaim({
        user_id: user.id,
        policy_id: claimData.policy_id,
        claim_reason: claimData.claim_reason,
        claim_amount: claimData.claim_amount,
      });

      toast({
        title: "Claim submitted successfully",
        variant: "success",
      });

      setClaimData({ policy_id: "", claim_reason: "", claim_amount: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Claim submission failed",
        variant: "warning",
      });
    }
  };

  return (
    <div className="w-full mt-29 min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex justify-center items-start py-16">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-2">
            Submit a Claim
          </h2>
          <p className="text-gray-600">
            Fill out the details below to initiate your claim process.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Policy Dropdown */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Select Policy
            </label>
            <select
              name="policy_id"
              value={claimData.policy_id}
              onChange={(e) =>
                setClaimData({ ...claimData, policy_id: e.target.value })
              }
              className="w-full border border-gray-300 bg-gray-50 focus:bg-white rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              required
            >
              <option value="">-- Choose Policy --</option>
              {policies.map((p) => (
                <option key={p.policy_id} value={p.policy_id}>
                  {p.policy_name}
                </option>
              ))}
            </select>
          </div>

          {/* Claim Reason */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Claim Reason
            </label>
            <textarea
              name="claim_reason"
              value={claimData.claim_reason}
              onChange={(e) =>
                setClaimData({ ...claimData, claim_reason: e.target.value })
              }
              className="w-full border border-gray-300 bg-gray-50 focus:bg-white rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 min-h-[120px]"
              placeholder="Describe the reason for your claim"
              required
            />
          </div>

          {/* Claim Amount */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Claim Amount
            </label>
            <input
              type="number"
              name="claim_amount"
              value={claimData.claim_amount}
              onChange={(e) =>
                setClaimData({ ...claimData, claim_amount: e.target.value })
              }
              className="w-full border border-gray-300 bg-gray-50 focus:bg-white rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Enter claim amount"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
          >
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
}
