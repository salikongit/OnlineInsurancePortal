import React, { useEffect, useState } from "react";
import { getUserPurchases } from "../services/MyAccountService";
import { getUserClaims } from "../services/ClaimService";

export default function MyAccount() {
  const [purchases, setPurchases] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const [purchaseData, claimData] = await Promise.all([
          getUserPurchases(user.id),
          getUserClaims(user.id),
        ]);
        setPurchases(purchaseData);
        setClaims(claimData);
      } catch (err) {
        console.error("Error loading account data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading your account...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-26   min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
        {/* Header Section */}
        <div className="mb-10 border-b pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-4xl font-bold text-indigo-700 mb-2">
              My Account
            </h2>
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        </div>

        {/* Purchased Policies */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-semibold text-gray-800">
              Purchased Policies
            </h3>
            <div className="h-[2px] flex-1 ml-4 bg-gradient-to-r from-indigo-500 to-transparent"></div>
          </div>

          {purchases.length === 0 ? (
            <p className="text-gray-500 italic">
              You have not purchased any policies yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {purchases.map((policy) => (
                <div
                  key={policy.user_policy_id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                >
                  <h4 className="text-xl font-bold text-indigo-600 mb-3">
                    {policy.policy_name}
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>
                      <b>Premium:</b> ${policy.premium_amount}
                    </li>
                    <li>
                      <b>Duration:</b> {policy.duration_years} years
                    </li>
                    <li>
                      <b>Status:</b> {policy.status || "Active"}
                    </li>
                    <li className="text-sm text-gray-500 mt-1">
                      <b>Purchased on:</b>{" "}
                      {policy.purchase_date
                        ? new Date(policy.purchase_date).toLocaleDateString()
                        : "N/A"}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Claims Section */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-semibold text-gray-800">My Claims</h3>
            <div className="h-[2px] flex-1 ml-4 bg-gradient-to-r from-indigo-500 to-transparent"></div>
          </div>

          {claims.length === 0 ? (
            <p className="text-gray-500 italic">
              You have not submitted any claims yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {claims.map((claim) => (
                <div
                  key={claim.claim_id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                >
                  <h4 className="text-xl font-bold text-indigo-600 mb-3">
                    {claim.policy_name}
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>
                      <b>Amount:</b> ${claim.claim_amount}
                    </li>
                    <li>
                      <b>Reason:</b> {claim.claim_reason}
                    </li>
                    <li>
                      <b>Status:</b>{" "}
                      <span
                        className={`font-semibold ${
                          claim.claim_status === "Approved"
                            ? "text-green-600"
                            : claim.claim_status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {claim.claim_status}
                      </span>
                    </li>
                    <li className="text-sm text-gray-500 mt-1">
                      <b>Submitted on:</b>{" "}
                      {claim.created_at
                        ? new Date(claim.created_at).toLocaleDateString()
                        : "N/A"}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
