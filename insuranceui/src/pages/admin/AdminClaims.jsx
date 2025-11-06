import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { toast } from "../../components/hooks/use-toast";

export default function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch all claims
  const fetchClaims = async () => {
    try {
      const res = await axios.get("http://localhost:7000/admin/claims", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaims(res.data);
    } catch (error) {
      console.error("Error fetching claims:", error);
      alert("Failed to load claims");
    } finally {
      setLoading(false);
    }
  };

  // Update claim status (approve/reject)
  const handleStatusChange = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this claim?`))
      return;

    try {
      await axios.put(
        `http://localhost:7000/admin/claims/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // alert(`Claim ${status} successfully!`);
      toast({
        title: `Claim ${status} successfully!`,
        variant: "success",
      });
      fetchClaims(); // refresh table
    } catch (error) {
      console.error("Error updating claim:", error);
      alert("Failed to update claim status");
      toast({
        title: "Failed to update claim status",
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  if (loading)
    return <p className="p-10 text-center text-gray-600">Loading claims...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Manage Claims 💰
        </h1>

        {claims.length === 0 ? (
          <p className="text-gray-600">No claims found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Policy</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim, index) => (
                  <tr
                    key={claim.claim_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{claim.user_name}</td>
                    <td className="p-3">{claim.policy_name}</td>
                    <td className="p-3">{claim.claim_reason}</td>
                    <td className="p-3">₹{claim.claim_amount}</td>
                    <td className="p-3 capitalize">{claim.claim_status}</td>
                    <td className="p-3">
                      {new Date(claim.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(claim.claim_id, "approved")
                        }
                        disabled={claim.claim_status !== "pending"}
                        className={`px-3 py-1 rounded ${
                          claim.claim_status === "pending"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(claim.claim_id, "rejected")
                        }
                        disabled={claim.claim_status !== "pending"}
                        className={`px-3 py-1 rounded ${
                          claim.claim_status === "pending"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
