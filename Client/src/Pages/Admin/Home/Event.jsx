// // Event.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Event = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found. Please log in.");

//       const response = await axios.get("http://localhost:3000/admin/events", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setEvents(response.data?.events || []);
//     } catch (err) {
//       setError(err.message || "Failed to load events.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyEvent = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:3000/admin/events/${id}`,
//         { isVerified: true },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchEvents(); // Refresh list after verification
//     } catch (err) {
//       console.error("Error verifying event:", err);
//       alert("Failed to verify event.");
//     }
//   };

//   const deleteEvent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/admin/events/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchEvents(); // Refresh list after deletion
//     } catch (err) {
//       console.error("Error deleting event:", err);
//       alert("Failed to delete event.");
//     }
//   };

//   if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">All Events</h1>
//       {events.length === 0 ? (
//         <p className="text-center text-gray-500">No events available.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <div key={event._id} className="bg-white p-4 shadow-md rounded-lg">
//               <h2 className="text-xl font-semibold">{event.eventName}</h2>
//               <p className="text-gray-600">Date: {event.date}</p>
//               <p className="text-gray-600">Location: {event.location}</p>
//               <p className="text-gray-600">Organizer: {event.organizer}</p>
//               <p className={`text-${event.isVerified ? "green" : "red"}-500 font-semibold`}>
//                 {event.isVerified ? "Verified" : "Not Verified"}
//               </p>

//               <div className="mt-4 flex space-x-2">
//                 {!event.isVerified && (
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                     onClick={() => verifyEvent(event._id)}
//                   >
//                     Verify
//                   </button>
//                 )}
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                   onClick={() => deleteEvent(event._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Event;