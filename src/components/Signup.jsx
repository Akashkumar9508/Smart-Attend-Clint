import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import signupImg from '../assets/signupIMG.png';
import Footer from './Footer';
const apiUrl = import.meta.env.VITE_API_BACKEND_URL;


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    rollNumber: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Signup successful !!');  
        navigate('/login');  
      } else {
        toast.error('Signup failed. Please try again.');  
        console.error('Signup failed:', data);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');  
      console.error('Error submitting signup form:', error);
    }

    // Reset form data
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
      rollNumber: '',
    });
  };

  return (
    <>
    <div className="h-[100vh] w-[100%] flex justify-center items-center bg-gray-100 font-[poppins]">
      <Navbar />
      <div className="formElement h-[80%] w-[60%] rounded-[50px] flex mt-10 overflow-hidden">
        <div className="left h-[100%] w-[50%] bg-white flex justify-center items-center">
          <img src={signupImg} alt="" />
        </div>
        <form className="bg-white p-8 rounded-lg  w-[50%] h-[100%]" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>
        
        <div className="input-group signupInput1">
        <box-icon name='user'  size=" 17px" class="absolute-icon" ></box-icon>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder=" "
            className='inputF'
            />
            <label className='labelF'>Name</label>
        </div>

        <div className="input-group">
          <box-icon name='envelope'  size=" 17px" class="absolute-icon" ></box-icon>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder=" "
            className='inputF'
            />
            <label className='labelF' >Email</label>
        </div>

        <div className="input-group">
          <box-icon name='low-vision'  size=" 17px" class="absolute-icon" ></box-icon>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder=" "
            className='inputF'
            />
            <label className='labelF'>Password</label>
        </div>

        <div className="input-group">
          <box-icon name='layer'  size=" 17px" class="absolute-icon" ></box-icon>
          <input 
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            placeholder=" "
            className='inputF'
          />
          <label className='labelF' >Roll Number</label>
        </div>


        <div className="mb-5 flex">
          <label className=" pl-2 block text-gray-700">Role</label>
          <div className="flex items-center pl-6 ">
            <input
              type="radio"
              id="teacher"
              name="role"
              value="teacher"
              checked={formData.role === 'teacher'}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="teacher" className="mr-4">Teacher</label>
            
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              checked={formData.role === 'student'}
              onChange={handleInputChange}
              className="ml-6"
            />
            <label htmlFor="student" className='ml-3'>Student</label>
          </div>
        </div>


        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 rounded-[40px]"
        >
          Sign Up
        </button>
      </form>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default Signup;
