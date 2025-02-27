import React, { useState,useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AddEventPage = () => {
  const [eventData, setEventData] = useState({
    eventname: "",
    eventtype: "",
    location: {
      address: "",
      city: "",
      state: "",
    },
    startDate: "",
    endDate: "",
    eventSocialMedia: {
      linkedin: "",
      instagram: "",
      facebook: "",
    },
    eventDescription: "",
    proposal: "",
    offers: [],
    eventOrganizer: "",
    audienceCount: 10,
    imageUrl: "", // Added imageUrl field
  });
const [userId, setUserId] = useState(null);
useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token id:", decoded.id);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }, []); 

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      location: { ...eventData.location, [name]: value },
    });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      eventSocialMedia: { ...eventData.eventSocialMedia, [name]: value },
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "sponsosync");
    data.append("cloud_name", "drgbi9wy0");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drgbi9wy0/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedFile = await res.json();
      setEventData({ ...eventData, imageUrl: uploadedFile.url,createdBy: userId }); // Store image URL
      console.log("Uploaded file URL:", uploadedFile.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
        setErrorMessage("User not authenticated! Please log in.");
        return;
    }

    const token = localStorage.getItem("token");
    try {
        // console.log("Event Data:", eventData);
      const response = await axios.post(
        "http://localhost:3000/event/new",
        // { ...eventData, createdBy: userId },
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Event added:", response.data);
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="eventname"
          placeholder="Event Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="eventtype"
          placeholder="Event Type"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleLocationChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleLocationChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={handleLocationChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          onChange={handleSocialChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          onChange={handleSocialChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="facebook"
          placeholder="Facebook"
          onChange={handleSocialChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="eventDescription"
          placeholder="Event Description"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          name="proposal"
          placeholder="Proposal"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="offers"
          placeholder="Offers (comma-separated)"
          onChange={(e) =>
            setEventData({ ...eventData, offers: e.target.value.split(",") })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="eventOrganizer"
          placeholder="Event Organizer"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="audienceCount"
          min="10"
          placeholder="Audience Count"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input

          type="file"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleFileUpload}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;