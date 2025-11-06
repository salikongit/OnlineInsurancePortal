// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminNavbar from "../admin/AdminNavbar";

// export default function AdminPolicies() {
//   const token = localStorage.getItem("token");
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [newPolicy, setNewPolicy] = useState({
//     policy_name: "",
//     short_desc: "",
//     long_desc: "",
//     premium_amount: "",
//     duration_years: "",
//   });

//   // Fetch all policies
//   const fetchPolicies = async () => {
//     try {
//       const res = await axios.get("http://localhost:7000/policy", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPolicies(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch policies");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   // Handle form input
//   const handleChange = (e) => {
//     setNewPolicy({ ...newPolicy, [e.target.name]: e.target.value });
//   };

//   // Add a new policy
//   const handleAddPolicy = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:7000/policy/add", newPolicy, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewPolicy({
//         policy_name: "",
//         short_desc: "",
//         long_desc: "",
//         premium_amount: "",
//         duration_years: "",
//       });
//       fetchPolicies();
//       alert("Policy added successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add policy");
//     }
//   };

//   // Delete a policy
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this policy?")) return;
//     try {
//       await axios.delete(`http://localhost:7000/policy/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchPolicies();
//       alert("Policy deleted successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete policy");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading policies...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminNavbar />
//       <div className="p-8">
//         <h1 className="text-3xl font-semibold mb-6">Manage Policies</h1>

//         {/* Add Policy Form */}
//         <form
//           onSubmit={handleAddPolicy}
//           className="bg-white p-6 rounded shadow-md mb-8"
//         >
//           <h2 className="text-xl font-semibold mb-4">Add New Policy</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="policy_name"
//               placeholder="Policy Name"
//               value={newPolicy.policy_name}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//               required
//             />
//             <input
//               type="text"
//               name="short_desc"
//               placeholder="Short Description"
//               value={newPolicy.short_desc}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//               required
//             />
//             <textarea
//               name="long_desc"
//               placeholder="Long Description"
//               value={newPolicy.long_desc}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 col-span-1 md:col-span-2"
//               required
//             />
//             <input
//               type="number"
//               name="premium_amount"
//               placeholder="Premium Amount"
//               value={newPolicy.premium_amount}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//               required
//             />
//             <input
//               type="number"
//               name="duration_years"
//               placeholder="Duration (Years)"
//               value={newPolicy.duration_years}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add Policy
//           </button>
//         </form>

//         {/* Policies Table */}
//         <div className="overflow-x-auto bg-white rounded shadow-md">
//           <table className="min-w-full border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr className="text-center">
//                 <th className="py-2 px-4 border-b">ID</th>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Short Description</th>
//                 <th className="py-2 px-4 border-b">Long Description</th>
//                 <th className="py-2 px-4 border-b">Premium</th>
//                 <th className="py-2 px-4 border-b">Duration (Years)</th>
//                 <th className="py-2 px-4 border-b">Created At</th>
//                 <th className="py-2 px-4 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {policies.map((policy) => (
//                 <tr key={policy.policy_id} className="text-center">
//                   <td className="py-2 px-4 border-b">{policy.policy_id}</td>
//                   <td className="py-2 px-4 border-b">{policy.policy_name}</td>
//                   <td className="py-2 px-4 border-b">{policy.short_desc}</td>
//                   <td className="py-2 px-4 border-b">{policy.long_desc}</td>
//                   <td className="py-2 px-4 border-b">
//                     {policy.premium_amount}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {policy.duration_years}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {policy.created_at.split("T")[0]}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       onClick={() => handleDelete(policy.policy_id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../admin/AdminNavbar";
import { useToast } from "../../components/hooks/use-toast";

import {
  Plus,
  Trash2,
  FileText,
  DollarSign,
  Clock,
  Calendar,
} from "lucide-react";

export default function AdminPolicies() {
  const token = localStorage.getItem("token");
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [newPolicy, setNewPolicy] = useState({
    policy_name: "",
    short_desc: "",
    long_desc: "",
    premium_amount: "",
    duration_years: "",
  });

  // Fetch all policies
  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://localhost:7000/policy", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPolicies(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch policies");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setNewPolicy({ ...newPolicy, [e.target.name]: e.target.value });
  };

  // Add a new policy
  const handleAddPolicy = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7000/policy/add",
        newPolicy,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear form fields
      setNewPolicy({
        policy_name: "",
        short_desc: "",
        long_desc: "",
        premium_amount: "",
        duration_years: "",
      });

      // Refresh policies
      fetchPolicies();
      const addedName =
        res.data?.policy?.policy_name ||
        res.data?.policy_name ||
        newPolicy.policy_name ||
        "New Policy";
      // Show toast
      toast({
        title: "Policy added successfully !!",
        description: `${addedName} has been added!`,
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to add policy ",
        description: "Couldn't add policy. Please try again.",
        variant: "warning",
      });
    }
  };

  // Delete a policy
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
      await axios.delete(`http://localhost:7000/policy/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchPolicies();

      toast({
        title: "Policy deleted !",
        description: "The policy has been removed successfully.",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Deletion failed ",
        description: "Unable to delete this policy. Please try again.",
        variant: "warning",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <AdminNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-blue-600 mb-3"></div>
            <p className="text-slate-600 text-sm font-medium">
              Loading policies...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 max-w-md">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminNavbar />
      <div className="p-4 sm:p-6 lg:p-8 max-w-[95%] 2xl:max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Manage Policies
            </h1>
          </div>
          <p className="text-sm text-slate-600 ml-10">
            Total policies:{" "}
            <span className="font-semibold text-slate-800">
              {policies.length}
            </span>
          </p>
        </div>

        {/* Add Policy Form */}
        <form
          onSubmit={handleAddPolicy}
          className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Add New Policy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Policy Name
              </label>
              <input
                type="text"
                name="policy_name"
                placeholder="Enter policy name"
                value={newPolicy.policy_name}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Short Description
              </label>
              <input
                type="text"
                name="short_desc"
                placeholder="Brief description"
                value={newPolicy.short_desc}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Long Description
              </label>
              <textarea
                name="long_desc"
                placeholder="Detailed description"
                value={newPolicy.long_desc}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Premium Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="premium_amount"
                  placeholder="0.00"
                  value={newPolicy.premium_amount}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Duration (Years)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="duration_years"
                  placeholder="Years"
                  value={newPolicy.duration_years}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Policy
          </button>
        </form>

        {/* Policies Table */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <th className="py-3 px-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">
                    Short Desc
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                    Long Desc
                  </th>
                  <th className="py-3 px-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Premium
                  </th>
                  <th className="py-3 px-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                    Duration
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden xl:table-cell">
                    Created
                  </th>
                  <th className="py-3 px-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {policies.map((policy) => (
                  <tr
                    key={policy.policy_id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600">
                          {policy.policy_id}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {policy.policy_name}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="text-sm text-slate-600 max-w-xs truncate">
                        {policy.short_desc}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="text-sm text-slate-600 max-w-md truncate">
                        {policy.long_desc}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm font-medium text-slate-900">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        {policy.premium_amount}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {policy.duration_years}y
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap hidden xl:table-cell">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {policy.created_at.split("T")[0]}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(policy.policy_id)}
                        className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-all duration-200 text-sm font-medium border border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {policies.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl shadow-lg border border-slate-200 mt-6">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-600 font-medium">
              No policies found
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Add your first policy using the form above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
