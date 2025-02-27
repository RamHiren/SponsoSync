import React, { useEffect, useState } from "react";
import axios from "axios";

const MySponser = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [formData, setFormData] = useState({
    sponsername: "",
    email: "",
    type: "",
    price: "",
    minimalAudienceCount: "",
    location: { city: "", state: "", country: "" },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.get(
        "http://localhost:3000/sponser/admin/mysponserslist",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const sponsorsWithEvents = await Promise.all(
        response.data?.sponsers.map(async (sponsor) => {
          const events = await Promise.all(
            sponsor.interested.map(async (eventId) => {
              try {
                const eventRes = await axios.get(
                  `http://localhost:3000/event/${eventId}`,
                  { headers: { Authorization:` Bearer ${token}` } }
                );
                console.log(eventRes.data);
                return eventRes.data;
              } catch (err) {
                console.error("Failed to fetch event", err);
                return null; // Skip failed event fetch
              }
            })
          );
          return { ...sponsor, events: events.filter(Boolean) };
        })
      );

      setSponsors(sponsorsWithEvents);
    } catch (err) {
      setError(err.message || "Failed to load sponsors.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sponsor?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/sponser/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSponsors((prev) => prev.filter((sponsor) => sponsor._id !== id));
    } catch (err) {
      alert("Failed to delete sponsor.");
    }
  };

  const handleEditClick = (sponsor) => {
    setEditingSponsor(sponsor._id);
    setFormData({
      sponsername: sponsor.sponsername,
      email: sponsor.email,
      type: sponsor.type,
      price: sponsor.price,
      minimalAudienceCount: sponsor.minimalAudienceCount,
      location: { ...sponsor.location },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/sponser/admin/update/${editingSponsor}`,
        formData,
        { headers: { Authorization: `Bearer ${token} `} }
      );

      setSponsors((prev) =>
        prev.map((sponsor) =>
          sponsor._id === editingSponsor
            ? { ...sponsor, ...formData }
            : sponsor
        )
      );
      setEditingSponsor(null);
    } catch (err) {
      alert("Failed to update sponsor.");
    }
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4">{event.event.eventname}</h2>
          <p className="text-gray-600"><strong>Event Type:</strong> {event.event.eventtype}</p>
          <p className="text-gray-600"><strong>Description:</strong> {event.event.description}</p>
          <p className="text-gray-600"><strong>Date:</strong> {new Date(event.event.date).toLocaleDateString()}</p>
          <p className="text-gray-600"><strong>Address:</strong> {event.event.location.address}</p>
          <p className="text-gray-600"><strong>City:</strong> {event.event.location.city}</p>
          <p className="text-gray-600"><strong>State:</strong> {event.event.location.state}</p>

          <p className="text-gray-600"><strong>Organizer:</strong> {event.event.eventOrganizer}</p>
          <p className="text-gray-600"><strong>Audience Count:</strong> {event.event.audienceCount}</p>
          <button
            
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Chat
          </button>

          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Sponsors</h1>
      {sponsors.length === 0 ? (
        <p className="text-center text-gray-500">No sponsors available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sponsors.map((sponsor) => (
            <div key={sponsor._id} className="bg-white p-4 shadow-lg rounded-lg">
              {sponsor.logoUrl && (
                <img src={sponsor.logoUrl} alt="Sponsor Logo" className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
              )}
              <h2 className="text-xl font-semibold">{sponsor.sponsername}</h2>
              <p className="text-gray-600">Email: {sponsor.email}</p>
              <p className="text-gray-600">Type: {sponsor.type}</p>
              <p className="text-gray-600">Price: ₹{sponsor.price}</p>
              <p className="text-gray-600">
                Minimal Audience: {sponsor.minimalAudienceCount}
              </p>
              <p className="text-gray-600">
                Location: {sponsor.location.city}, {sponsor.location.state},{" "}
                {sponsor.location.country}
              </p>
              <h3 className="text-lg font-semibold mt-4">Interested Events:</h3>
              {sponsor.events.length === 0 ? (
                <p className="text-gray-500">No events found.</p>
              ) : (
                <ul className="list-disc ml-5">
                  {sponsor.events.map((event, index) => (
                    <div key={event._id || `event-${index}`}>
                      <li>{event.event.eventname}</li>
                      <button
                        onClick={() => handleViewEvent(event)}
                        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                      >
                        View Event
                      </button>
                    </div>
                  ))}
                </ul>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEditClick(sponsor)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sponsor._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <EventModal event={selectedEvent} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default MySponser;