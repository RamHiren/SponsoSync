import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F4C5C] to-[#134E4A] text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">Sponsorship Hub</h2>
          <p className="mt-3 text-base leading-relaxed">
            Connecting brands with opportunities. Empowering sponsorships worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold tracking-wide">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="/about" className="text-base hover:text-[#E7F6F2] transition">About Us</a>
            </li>
            <li>
              <a href="/services" className="text-base hover:text-[#E7F6F2] transition">Our Services</a>
            </li>
            <li>
              <a href="/contact" className="text-base hover:text-[#E7F6F2] transition">Contact</a>
            </li>
            <li>
              <a href="/faq" className="text-base hover:text-[#E7F6F2] transition">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h3 className="text-lg font-semibold tracking-wide">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-2xl text-[#FFFFFF] hover:text-[#C0C0C0] transition"><FaFacebook /></a>
            <a href="#" className="text-2xl text-[#FFFFFF] hover:text-[#C0C0C0] transition"><FaTwitter /></a>
            <a href="#" className="text-2xl text-[#FFFFFF] hover:text-[#C0C0C0] transition"><FaInstagram /></a>
            <a href="#" className="text-2xl text-[#FFFFFF] hover:text-[#C0C0C0] transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm font-medium mt-8 tracking-wide">
        &copy; {new Date().getFullYear()} Sponsorship Hub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;