import React, { useEffect, useState } from "react";
import axios from "axios";

const Sponser = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.get("http://localhost:3000/admin/sponser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSponsors(response.data?.sponser || []);
    } catch (err) {
      setError(err.message || "Failed to load sponsors.");
    } finally {
      setLoading(false);
    }
  };

  const verifySponsor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/admin/sponser/${id}`,
        { isVerified: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSponsors(); // Refresh list after verification
    } catch (err) {
      console.error("Error verifying sponsor:", err);
      alert("Failed to verify sponsor.");
    }
  };

  const deleteSponsor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sponsor?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/admin/sponser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSponsors(); // Refresh list after deletion
    } catch (err) {
      console.error("Error deleting sponsor:", err);
      alert("Failed to delete sponsor.");
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Sponsors</h1>
      {sponsors.length === 0 ? (
        <p className="text-center text-gray-500">No sponsors available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <div key={sponsor._id} className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold">{sponsor.sponsername}</h2>
              <p className="text-gray-600">Email: {sponsor.email}</p>
              <p className="text-gray-600">Type: {sponsor.type}</p>
              <p className="text-gray-600">Price: ₹{sponsor.price}</p>
              <p className="text-gray-600">Minimal Audience: {sponsor.minimalAudienceCount}</p>
              <p className="text-gray-600">
                Location: {sponsor.location.city}, {sponsor.location.state}, {sponsor.location.country}
              </p>
              <p className={`text-${sponsor.isVerified ? "green" : "red"}-500 font-semibold`}>
                {sponsor.isVerified ? "Verified" : "Not Verified"}
              </p>

              <div className="mt-4 flex space-x-2">
                {!sponsor.isVerified && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => verifySponsor(sponsor._id)}
                  >
                    Verify
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => deleteSponsor(sponsor._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sponser;
