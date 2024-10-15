import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem('token');

    if (token) {
      localStorage.removeItem('token');
      toast.success('Logout successful !!');
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const tokenExists = !!localStorage.getItem('token');

  return (
    <div className="nav fixed top-0 left-0 w-full h-[10%] bg-white flex justify-center items-center z-20">
      <div className="roundedDiv w-[95%] h-full flex justify-between items-center px-4 md:px-8">
        {/* Logo / Title */}
        <div className="title">
          <h2 className='text-xl md:text-2xl font-semibold'>
            Smart <span className='text-[#0D92F4]'>Attend</span>
          </h2>
        </div>

        {/* Nav Links */}
        <div className="navlinks hidden md:flex h-full w-1/2 justify-center items-center">
          <ul className='flex justify-between text-lg w-[70%] font-bold'>
            <Link to="/" className="hover:text-[#0D92F4]">Home</Link>
            <Link to="/studentdash" className="hover:text-[#0D92F4]">Student</Link>
            <Link to="/teacherdash" className="hover:text-[#0D92F4]">Teacher</Link>
            <Link to="/about" className="hover:text-[#0D92F4]">About</Link>
          </ul>
        </div>

        <div className="buttons h-full w-[20%] md:w-[10%] flex justify-end items-center">
          <button 
            onClick={handleClick}
            className="bg-[#0D92F4] h-[40%] md:h-[60%] w-[80%] rounded-full font-semibold text-white md:w-full hover:bg-[#0b7bcc] transition duration-300"
          >
            {tokenExists ? 'LogOut' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
