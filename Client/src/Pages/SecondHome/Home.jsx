import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get("http://localhost:3000/sponser", {
          headers: { Authorization: `Bearer ${token}` },
        });

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

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.get("http://localhost:3000/event/myevents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const verifiedEvents = response.data?.events?.filter(event => event.isVerified) || [];

      setEvents(verifiedEvents || []);
      setShowEvents(true);
    } catch (err) {
      setError(err.message || "Failed to fetch events.");
    }
  };

  const handleApply = async (sponsorId, eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      await axios.post(
        `http://localhost:3000/sponser/${sponsorId}/apply`,
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Applied successfully!");
    } catch (err) {
      alert(err.message || "Failed to apply for event.");
    }
  };

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
              {sponsor.logoUrl && (
                <img src={sponsor.logoUrl} alt="Sponsor Logo" className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
              )}
              <h2 className="text-xl font-semibold">{sponsor.sponsername}</h2>
              <p className="text-gray-600">Email: {sponsor.email}</p>
              <p className="text-gray-600">Type: {sponsor.type}</p>
              <p className="text-gray-600">Price: ₹{sponsor.price}</p>
              <p className="text-gray-600">Minimal Audience: {sponsor.minimalAudienceCount}</p>
              <p className="text-gray-600">Location: {sponsor.location.city}, {sponsor.location.state}, {sponsor.location.country}</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300" onClick={fetchEvents}>Request</button>

              {showEvents && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Select an Event:</h3>
                  {events.length === 0 ? (
                    <p className="text-gray-500">No events available.</p>
                  ) : (
                    <ul>
                      {events.map((event) => (
                        <li key={event._id} className="flex justify-between items-center mt-2">
                          <span>{event.eventname}</span>
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                            onClick={() => handleApply(sponsor._id, event._id)}
                          >
                            Apply
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
