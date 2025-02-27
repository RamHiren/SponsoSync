import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SponsorForm = () => {
    const [formData, setFormData] = useState({
        sponsername: '',
        email: '',
        location: { city: '', state: '', country: 'India' },
        type: '',
        socialMedia: { facebook: '', instagram: '', other: '' },
        price: '',
        minimalAudienceCount: '',
        logoUrl : '',
    });

    const [errorMessage, setErrorMessage] = useState('');
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
    }, []); // Added dependency array to run only once on mount

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
    
            // Update formData with the uploaded image URL
            setFormData(prev => ({
                ...prev,
                logoUrl: uploadedFile.secure_url, // Use secure_url to get HTTPS link
            }));
            console.log("Uploaded file URL:", uploadedFile.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (name.includes("location.")) {
                return { ...prev, location: { ...prev.location, [name.split(".")[1]]: value } };
            }
            if (name.includes("socialMedia.")) {
                return { ...prev, socialMedia: { ...prev.socialMedia, [name.split(".")[1]]: value } };
            }
            return { ...prev, [name]: value };
        });
    };

    const validateSocialMediaLinks = () => {
        const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        return Object.values(formData.socialMedia).every(link => !link || urlRegex.test(link.trim()));
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

        const token = localStorage.getItem("token"); // Get token here

        try {
            const res = await axios.post(
                "http://localhost:3000/sponser/new",
                { ...formData, createdBy: userId },
                // formData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );

            console.log("Response Data:", res.data);
            setFormData({
                sponsername: '',
                email: '',
                location: { city: '', state: '', country: 'India' },
                type: '',
                socialMedia: { facebook: '', instagram: '', other: '' },
                price: '',
                minimalAudienceCount: ''
            });
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sponsor Registration</h2>
                {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Sponsor Name:</label>
                        <input type="text" name="sponsername" value={formData.sponsername} onChange={handleChange} required 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">City:</label>
                        <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">State:</label>
                        <input type="text" name="location.state" value={formData.location.state} onChange={handleChange} required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Type of Sponsorship:</label>
                        <input type="text" name="type" value={formData.type} onChange={handleChange} required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Facebook:</label>
                        <input type="url" name="socialMedia.facebook" value={formData.socialMedia.facebook} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Instagram:</label>
                        <input type="url" name="socialMedia.instagram" value={formData.socialMedia.instagram} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Sponsorship Price (₹):</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Minimum Audience Count:</label>
                        <input type="number" name="minimalAudienceCount" value={formData.minimalAudienceCount} onChange={handleChange} required min="10"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div>
    <label className="block text-sm font-semibold text-gray-700">Logo</label>
    <input 
        type="file"
        accept="image/*"
        onChange={handleFileUpload} // No 'value' attribute here
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    {formData.logoUrl && (
        <img src={formData.logoUrl} alt="Uploaded Logo" className="mt-2 w-24 h-24 object-cover rounded-lg" />
    )}
</div>


                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SponsorForm;
