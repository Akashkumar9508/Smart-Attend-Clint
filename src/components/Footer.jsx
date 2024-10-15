import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-white text-[#0D92F4] py-4 shadow-lg font-[poppins] ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Left Side */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-[0.9rem] font-semibold">Student Attendance Management System</h3>
         
        </div>

        {/* Right Side Links */}
        <div className="flex mb-4 md:mb-0 -ml-20">
        <p className="text-sm ">© 2024 All Rights Reserved <span >Web4Script</span></p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://github.com/Akashkumar9508" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-[#0D92F4] hover:text-blue-700 transition duration-300" size={24} />
          </a>
          <a href="https://www.linkedin.com/in/akashkkumar9508/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-[#0D92F4] hover:text-blue-700 transition duration-300" size={24} />
          </a>
          <a href="https://www.instagram.com/akash_yadav_mist/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-[#0D92F4] hover:text-blue-700 transition duration-300" size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
