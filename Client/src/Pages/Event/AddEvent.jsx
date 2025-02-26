import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddEvent = () => {
    const [formData, setFormData] = useState({
        eventname: '',
        eventtype: '',
        location: {
            address: '',
            city: '',
            state: '',
        },
        startDate: '',
        endDate: '',
        eventSocialMedia: {
            linkedin: '',
            instagram: '',
            facebook: '',
        },
        eventDescription: '',
        proposal: '',
        offers: '',
        eventOrganizer: '',
        audienceCount: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("location.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                location: { ...prev.location, [field]: value },
            }));
        } else if (name.includes("eventSocialMedia.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                eventSocialMedia: { ...prev.eventSocialMedia, [field]: value },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateSocialMediaLinks = () => {
        const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        return Object.values(formData.eventSocialMedia).every(link => !link || urlRegex.test(link.trim()));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validateSocialMediaLinks()) {
            setErrorMessage("Invalid social media link detected! Please enter valid URLs.");
            return;
        }

        if (!userId) {
            setErrorMessage("User not authenticated! Please log in.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/event/new", {
                ...formData,
                offers: formData.offers.split(","),
                createdBy: userId,
            });

            console.log("Response Data:", res.data);
            setFormData({
                eventname: '',
                eventtype: '',
                location: { address: '', city: '', state: '' },
                startDate: '',
                endDate: '',
                eventSocialMedia: { linkedin: '', instagram: '', facebook: '' },
                eventDescription: '',
                proposal: '',
                offers: '',
                eventOrganizer: '',
                audienceCount: ''
            });

        } catch (err) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create Event</h2>
                {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="eventname" placeholder="Event Name" value={formData.eventname} onChange={handleChange} required className="input-style" />
                    <input type="text" name="eventtype" placeholder="Event Type" value={formData.eventtype} onChange={handleChange} required className="input-style" />
                    <input type="text" name="location.address" placeholder="Event Address" value={formData.location.address} onChange={handleChange} required className="input-style" />
                    <input type="text" name="location.city" placeholder="City" value={formData.location.city} onChange={handleChange} required className="input-style" />
                    <input type="text" name="location.state" placeholder="State" value={formData.location.state} onChange={handleChange} required className="input-style" />
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="input-style" />
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required className="input-style" />
                    <input type="url" name="eventSocialMedia.facebook" placeholder="Facebook" value={formData.eventSocialMedia.facebook} onChange={handleChange} className="input-style" />
                    <input type="text" name="eventDescription" placeholder="Event Description" value={formData.eventDescription} onChange={handleChange} required className="input-style" />
                    <input type="text" name="proposal" placeholder="Proposal" value={formData.proposal} onChange={handleChange} required className="input-style" />
                    <input type="text" name="offers" placeholder="Offers (comma-separated)" value={formData.offers} onChange={handleChange} required className="input-style" />
                    <input type="text" name="eventOrganizer" placeholder="Event Organizer" value={formData.eventOrganizer} onChange={handleChange} required className="input-style" />
                    <input type="number" name="audienceCount" placeholder="Audience Count" value={formData.audienceCount} onChange={handleChange} required className="input-style" min="10" />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">
                        Submit Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
