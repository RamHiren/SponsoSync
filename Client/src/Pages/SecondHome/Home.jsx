import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get("http://localhost:3000/sponser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter only verified sponsors
        const verifiedSponsors = response.data?.sponser?.filter(sponsor => sponsor.isVerified) || [];

        setSponsors(verifiedSponsors);
      } catch (err) {
        setError(err.message || "Failed to load sponsors.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Verified Sponsors</h1>
      {sponsors.length === 0 ? (
        <p className="text-center text-gray-500">No verified sponsors available.</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
