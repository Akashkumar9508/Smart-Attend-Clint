import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

const Studentdash = () => {
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [error, setError] = useState(null);
  const [errorNotices, setErrorNotices] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiUrl}/students`);
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students");
        setLoading(false);
      }
    };

    const fetchNotices = async () => {
      try {
        const response = await fetch(`${apiUrl}/messages`);
        const data = await response.json();

        // Log the data to see the structure
        console.log("Fetched notices:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setNotices(data);
        } else {
          // If it's not an array, you may want to set an error or an empty array
          setNotices([]); // or handle accordingly
        }
        setLoadingNotices(false);
      } catch (err) {
        setErrorNotices("Failed to fetch notices");
        setLoadingNotices(false);
      }
    };

    fetchStudents();
    fetchNotices();
  }, []);

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>{error}</div>;

  if (loadingNotices) return <div>Loading notices...</div>;
  if (errorNotices) return <div>{errorNotices}</div>;

  return (
    <>
      <div className="student h-[100vh] w-[100%] bg-white flex justify-around items-center font-[poppins]">
        <Navbar />
        <div className="studentdash w-[60%] h-full flex flex-col justify-end ">
          <h1 className="font-bold text-center text-4xl mb-5">STUDENT DASHBOARD</h1>
          <div className="container formElement w-full h-[75%] mb-5 overflow-scroll bg-white rounded-xl shadow-lg">
            <table className="table-auto w-full text-center border-collapse">
              <thead className="sticky top-0 bg-[#0D92F4] z-10">
                <tr className="border-b-2">
                  <th className="text-2xl font-semibold p-4 border-r-2">SN NO</th>
                  <th className="text-2xl font-semibold p-4 border-r-2">STUDENT NAME</th>
                  <th className="text-2xl font-semibold p-4 border-r-2">ROLL NUMBER</th>
                  <th className="text-2xl font-semibold p-4">ATTENDANCE STATUS</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b-2">
                    <td className="p-4 border-r-2">{index + 1}</td>
                    <td className="p-4 border-r-2">{student.name}</td>
                    <td className="p-4 border-r-2">{student.rollNumber}</td>
                    <td className="p-4">{student.attendanceStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notice Section */}
        <div className="formElement notice w-[30%] h-[75%] overflow-scroll rounded-[30px] mt-32 bg-red-200 p-4 flex justify-start items-center flex-col">
          <h2 className="font-bold text-3xl mb-4">Notices</h2>
          <ul className="w-full">
            {notices.length > 0 ? (
              notices.map((notice, index) => (
                <li key={index} className="mb-2 p-2 bg-white rounded shadow">
                  <h3 className="font-semibold">{notice.teacherName}</h3>
                  <p>{notice.message}</p>
                  <p className="text-sm text-gray-600">
                    Active until: {new Date(notice.startTime).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <li className="mb-2 p-2 bg-white rounded shadow">
                <p>No notices available.</p>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Studentdash;
