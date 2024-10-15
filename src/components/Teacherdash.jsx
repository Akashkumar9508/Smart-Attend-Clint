import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

const Teacherdash = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState(''); 
  const [duration, setDuration] = useState(''); 

  useEffect(() => {
    fetch(`${apiUrl}/students`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => {
        console.error("Error fetching students:", error);
        toast.error("Error fetching student data");
      });
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = () => {
    const attendanceData = Object.keys(attendance).map((studentId) => ({
      rollNumber: students.find((student) => student._id === studentId)
        .rollNumber,
      status: attendance[studentId],
    }));

    fetch(`${apiUrl}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendanceData, 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.attendanceRecords) {
          toast.success("Attendance successfully submitted!");
          console.log("Marked Attendance:", data.attendanceRecords);
        } else if (
          data.message &&
          Array.isArray(data.alreadyMarkedRollNumbers)
        ) {
          const alreadyMarkedRollNumbers =
            data.alreadyMarkedRollNumbers.join(", ");
          toast.warn(
            `Attendance already marked for roll numbers: ${alreadyMarkedRollNumbers}`
          );
        } else {
          toast.error(data.message || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
        toast.error("Error submitting attendance");
      });
  };

  // Decode JWT token to get teacherId
  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  const submitNotice = () => {
    const token = localStorage.getItem('token'); 
    const decodedToken = decodeToken(token); 
    const teacherId = decodedToken.id; 

    fetch(`${apiUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        teacherId,
        message,
        duration
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.newMessage) {
          toast.success("Notice successfully submitted!");
          console.log("Submitted Notice:", data.newMessage);
        } else {
          toast.error(data.message || "Error submitting notice");
        }
      })
      .catch((error) => {
        console.error("Error submitting notice:", error);
        toast.error("Error submitting notice");
      });
  };

  return (
    <>
      <div className="h-[100vh] w-full font-[poppins] bg-gray-100 flex justify-center items-center">
        <Navbar />
        <div className="attendanceNoticeDiv w-[100%] h-[100%] flex justify-center">
          <div className="attendance main w-[65%] h-[100%] flex flex-col justify-end items-center p-4">
            <h2 className="text-3xl mb-6 font-semibold">
              Teacher Dashboard - Mark Attendance
            </h2>

            <div className="tableBox formElement h-[70%] w-[100%] overflow-scroll">
              <table className="min-w-full border border-gray-300 shadow-md rounded-lg text-center">
                <thead className="sticky top-0 bg-[#0D92F4]">
                  <tr>
                    <th className="px-6 py-3 text-center text-white">SN No</th>
                    <th className="px-6 py-3 text-center text-white">Name</th>
                    <th className="px-6 py-3 text-center text-white">
                      Roll No.
                    </th>
                    <th className="px-6 py-3 text-center text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="border px-6 py-4">{index + 1}</td>
                      <td className="border px-6 py-4">{student.name}</td>
                      <td className="border px-6 py-4">{student.rollNumber}</td>
                      <td className="border px-6 py-4">
                        <div className="flex justify-center items-center">
                          <label className="mr-4 flex items-center">
                            <input
                              type="radio"
                              name={`attendance-${student._id}`}
                              value="present"
                              onChange={() =>
                                handleAttendanceChange(student._id, "present")
                              }
                              className="mr-1"
                            />
                            Present
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`attendance-${student._id}`}
                              value="absent"
                              onChange={() =>
                                handleAttendanceChange(student._id, "absent")
                              }
                              className="mr-1"
                            />
                            Absent
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-6 py-2 px-8 bg-[#0D92F4] text-white font-semibold rounded-xl shadow hover:bg-[#44bf21]"
              onClick={submitAttendance}
            >
              Submit Attendance
            </button>
          </div>
          <div className="noticeDiv w-[30%] h-[100%] flex justify-center items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitNotice();
              }}
              className="formElement w-[90%] h-[68%] mt-16 bg-white rounded-[30px] flex flex-col justify-start p-7"
            >
              <h1 className="text-center text-2xl">Notice</h1>
              <div className="input-group">
                <box-icon
                  name="time"
                  size="17px"
                  class="absolute-icon"
                ></box-icon>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder=" "
                  className="inputF"
                />
                <label className="labelF">Duration in minutes</label>
              </div>
              <div className="textArea w-full h-[60%]">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-full w-full bg-gray-100 outline-none p-4 text-1xl"
                  placeholder="Enter your message here"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-6 py-2 px-8 bg-[#0D92F4] text-white font-semibold rounded-xl shadow hover:bg-[#44bf21]"
              >
                Submit Notice
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Teacherdash;
