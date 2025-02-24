import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleOnSignUp = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors

        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                username,
                password,
            });

            console.log("Response Data:", res.data); 
            console.log("Token:", res.data.token); 

            localStorage.setItem("token", res.data.token); 
            navigate("/"); 

        } catch (err) {
            console.error(err);
            
            // Check if response exists and contains an error message
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

                {/* Show error message if it exists */}
                {errorMessage && (
                    <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-lg text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleOnSignUp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Username:</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password:</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
