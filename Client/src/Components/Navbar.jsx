import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#F0F2F5] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
          <img src={logo} alt="SponsoSync Logo" className="h-10 w-10" />

            <span className="text-xl font-semibold text-black">SponsoSync</span>
          </div>

          <div className="hidden md:flex space-x-6 items-center mx-auto">
            <NavLink to="/" className="text-black font-medium hover:text-gray-600">
              Home
            </NavLink>
            <NavLink to="/newevent" className="text-black font-medium hover:text-gray-600">
              Add Event
            </NavLink>
            <NavLink to="/about" className="text-black font-medium hover:text-gray-600">
              About
            </NavLink>
            <NavLink to="/services" className="text-black font-medium hover:text-gray-600">
              Services
            </NavLink>
            <NavLink to="/contact" className="text-black font-medium hover:text-gray-600">
              Contact
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/login"
              className="border-2 border-black bg-[#F0F2F5] text-black font-medium px-4 py-2 rounded-lg transition duration-300 hover:bg-black hover:text-white"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="border-2 border-black bg-black text-white font-medium px-4 py-2 rounded-lg transition duration-300 hover:bg-[#F0F2F5] hover:text-black"
            >
              Register
            </NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#F0F2F5] border-t shadow-md">
          <div className="px-4 py-2 flex flex-col space-y-2">
            <NavLink to="/" className="text-black font-medium hover:text-gray-600" onClick={handleNavClick}>
              Home
            </NavLink>
            <NavLink to="/newevent" className="text-black font-medium hover:text-gray-600" onClick={handleNavClick}>
              Add Event
            </NavLink>
            <NavLink to="/about" className="text-black font-medium hover:text-gray-600" onClick={handleNavClick}>
              About
            </NavLink>
            <NavLink to="/services" className="text-black font-medium hover:text-gray-600" onClick={handleNavClick}>
              Services
            </NavLink>
            <NavLink to="/contact" className="text-black font-medium hover:text-gray-600" onClick={handleNavClick}>
              Contact
            </NavLink>
            <NavLink
              to="/login"
              className="border-2 border-black bg-[#F0F2F5] text-black font-medium px-4 py-2 rounded-lg transition duration-300 hover:bg-black hover:text-white"
              onClick={handleNavClick}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="border-2 border-black bg-black text-white font-medium px-4 py-2 rounded-lg transition duration-300 hover:bg-[#F0F2F5] hover:text-black"
              onClick={handleNavClick}
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}