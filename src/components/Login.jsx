import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import LoginImg from "../assets/loginpng.png";
import "boxicons";
import Footer from "./Footer";
const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
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
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log(data);
      console.log(apiUrl);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");

        if (formData.role === "student") {
          navigate("/studentdash");
        } else if (formData.role === "teacher") {
          navigate("/teacherdash");
        } else {
          toast.error("Invalid role!");
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }

    setFormData({
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <>
    <div className="relative h-[100vh] w-[100%] bg-white flex justify-center items-center font-[poppins]">
      <Navbar />
      <div className="formElement h-[70%] w-[60%] rounded-[50px] flex mt-10 overflow-hidden">
        <div className="left h-[100%] w-[55%] bg-white flex justify-center items-center">
          <img src={LoginImg} className="h-[80%]" alt="" />
        </div>
        <form className="p-8 w-[45%] h-[100%]" onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center font-bold mb-6">Login</h1>

          <div className="input-group">
            <box-icon
              name="envelope"
              size=" 17px"
              class="absolute-icon"
            ></box-icon>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="inputF"
              placeholder=" " /* is ko mat hatana ok Used to trigger label float when not empty */
            />
            <label className="labelF">Email</label>
          </div>


          <div className="input-group">
            <box-icon
              name="low-vision"
              size=" 17px"
              class="absolute-icon"
            ></box-icon>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="inputF"
              placeholder=" " /* Used to trigger label float when not empty */
            />
            <label className="labelF">Password</label>
          </div>

          <div className="mb-4 flex">
            <label className="block text-gray-700">Role</label>
            <div className="flex items-center ml-5">
              <input
                type="radio"
                id="teacher"
                name="role"
                value="teacher"
                checked={formData.role === "teacher"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="teacher" className="mr-4">
                Teacher
              </label>

              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleInputChange}
                className="mr-2 ml-2"
              />
              <label htmlFor="student" className="">Student</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-[40px] hover:bg-blue-600"
          >
            Login
          </button>

          <div className="signUpDiv border-t border-gray-200 mt-4 h-15 gap-0 flex justify-center items-center flex-col">
            <span className="bg-white h-4 w-4 rounded-[50%] -mt-[10px] text-gray-400 text-[0.7rem]">
              OR
            </span>
            <Link
              to="/signup"
              className="w-full bg-blue-600 text-white mt-2 py-2 rounded-[40px] hover:bg-blue-500 text-center"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
