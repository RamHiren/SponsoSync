import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <span className="text-xl font-semibold text-orange-700">MyBrand</span>
          
          <div className="hidden md:flex space-x-6 items-center mx-auto">
            <NavLink to="/" className="text-white hover:text-blue-800">Home</NavLink>
            <NavLink to="/newevent" className="text-white hover:text-blue-800">AddEvent</NavLink>

            <NavLink to="/about" className="text-white hover:text-blue-800">About</NavLink>
            <NavLink to="/services" className="text-white hover:text-blue-800">Services</NavLink>
            <NavLink to="/contact" className="text-white hover:text-blue-800">Contact</NavLink>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <NavLink to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Login</NavLink>
            <NavLink to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Register</NavLink>
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t shadow-md">
          <div className="px-4 py-2 flex flex-col space-y-2">
            <NavLink to="/" className="text-white hover:text-blue-800">Home</NavLink>
            <NavLink to="/about" className="text-white hover:text-blue-800">About</NavLink>
            <NavLink to="/services" className="text-white hover:text-blue-800">Services</NavLink>
            <NavLink to="/contact" className="text-white hover:text-blue-800">Contact</NavLink>
            <NavLink to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Login</NavLink>
            <NavLink to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Register</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}