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

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.get("http://localhost:3000/sponser/admin/mysponserslist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSponsors(response.data?.sponsers || []);
    } catch (err) {
      setError(err.message || "Failed to load sponsors.");
    } finally {
      setLoading(false);
    }
  };

  // Delete sponsor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sponsor?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/sponser/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSponsors(sponsors.filter((sponsor) => sponsor._id !== id));
    } catch (err) {
      alert("Failed to delete sponsor.");
    }
  };

  // Open edit modal
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({ ...prev, location: { ...prev.location, [key]: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit edited data
  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/sponser/admin/update/${editingSponsor}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSponsors((prev) =>
        prev.map((sponsor) =>
          sponsor._id === editingSponsor ? { ...sponsor, ...formData } : sponsor
        )
      );
      setEditingSponsor(null);
    } catch (err) {
      alert("Failed to update sponsor.");
    }
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
              <h2 className="text-xl font-semibold">{sponsor.sponsername}</h2>
              <p className="text-gray-600">Email: {sponsor.email}</p>
              <p className="text-gray-600">Type: {sponsor.type}</p>
              <p className="text-gray-600">Price: ₹{sponsor.price}</p>
              <p className="text-gray-600">Minimal Audience: {sponsor.minimalAudienceCount}</p>
              <p className="text-gray-600">
                Location: {sponsor.location.city}, {sponsor.location.state}, {sponsor.location.country}
              </p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEditClick(sponsor)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(sponsor._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingSponsor && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Sponsor</h2>
            <input
              type="text"
              name="sponsername"
              value={formData.sponsername}
              onChange={handleChange}
              placeholder="Sponsor Name"
              className="w-full p-2 border mb-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border mb-2"
            />
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              className="w-full p-2 border mb-2"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border mb-2"
            />
            <input
              type="number"
              name="minimalAudienceCount"
              value={formData.minimalAudienceCount}
              onChange={handleChange}
              placeholder="Minimal Audience Count"
              className="w-full p-2 border mb-2"
            />
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 border mb-2"
            />
            <input
              type="text"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full p-2 border mb-2"
            />
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full p-2 border mb-4"
            />
            <div className="flex justify-between">
              <button onClick={() => setEditingSponsor(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleEditSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySponser;
