import "./App.css";
import Navbar from "./components/Navbar";
import myImage from "./assets/Checklist.png";
import { gsap } from "gsap";
import React, { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./components/Footer";

export default function App() {
  const boxRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // GSAP animation
    gsap.to(boxRef.current, {
      y: 20,
      scrub: 5,
      scale: 1.02,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <>
      <div className="h-[100vh] w-[100%] font-[poppins] text-black relative bg-gradient-to-br from-blue-100 to-white overflow-hidden">
        <Navbar />
        <div className="main overflow-hidden h-full w-full flex justify-between items-center relative">
         
          <div className="leftText h-[80%] w-[50%]  flex mt-44 items-start flex-col  pl-16 select-none">
            <h1 className="font-semibold text-5xl leading-tight mb-2 tracking-wider ">
              Stay Updated with <br />
              Student Attendance <br />
              Management System
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A smart solution to easily track and manage student attendance.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg font-semibold transition duration-300">
              Get Started
            </button>
          </div>
          <div className="rightImg h-[80%] w-[50%] flex justify-center items-center ">
            <img
              src={myImage}
              alt="Attendance Management"
              className=" h-[90%]"
            />
          </div>
        </div>

        
        <h1
            className="absolute text-[14rem] md:text-[12rem] left-10 -bottom-14 opacity-[0.3] select-none text-transparent font-bold"
            style={{ WebkitTextStroke: "2px gray" }}
          >
            {" "}
              WEB4SCRIPT
          </h1>
      </div>
      <Footer />
    </>
  );
}
