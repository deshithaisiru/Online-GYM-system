import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPlus, FaFilePdf } from "react-icons/fa";

export default function ManageSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [query, setQuery] = useState("");
  
  // Get the current user from Redux store
  const { userInfo: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch(`/api/schedule/Sgetall`);
        const data = await res.json();
        if (res.ok) {
          // Filter schedules for the current user
          const userSchedules = data.equipment.filter(
            (schedule) => schedule.name === currentUser.name
          );
          setSchedules(userSchedules);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    if (currentUser) {
      fetchSchedules();
    }
  }, [currentUser]);

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleDeleteSchedule = async (id) => {
    try {
      const res = await fetch(`/api/schedule/sdelete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSchedules((prev) => prev.filter((schedule) => schedule._id !== id));
        alert("Schedule deleted successfully");
      } else {
        alert("Failed to delete schedule");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Type", "Time", "Schedule", "Info"];
    const tableRows = filteredSchedules.map((item) => [
      item.type,
      item.time,
      item.schedule,
      item.info
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: "grid",
    });

    doc.save(`${currentUser.name}_schedules.pdf`);
  };

  if (!currentUser) {
    return <div className="text-center mt-10 text-2xl font-serif">Please log in to view your schedules.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-600 mb-12 font-serif">
          My Schedule Management
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search schedules by type..."
            className="w-full md:w-96 px-4 py-2 rounded-full shadow-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 mb-4 md:mb-0"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex space-x-4">
            <Link
              to="/addschedule"
              className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200 flex items-center"
            >
              <FaPlus className="mr-2" />
              <span className="font-serif uppercase">Request Schedule</span>
            </Link>
            <button
              onClick={generatePDF}
              className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200 flex items-center"
            >
              <FaFilePdf className="mr-2" />
              <span className="font-serif uppercase">Generate PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule) => (
              <div
                key={schedule._id}
                className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={schedule.image}
                  alt=""
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-yellow-600 mb-2 font-serif">
                    {schedule.type}
                  </h3>
                  <p className="text-gray-600 mb-2 font-serif">Time: {schedule.time}</p>
                  <p className="text-red-600 font-medium mb-4 font-serif">
                    {schedule.schedule}
                  </p>
                  <p className="text-gray-700 mb-4 font-serif">{schedule.info}</p>
                  <button
                    onClick={() => handleDeleteSchedule(schedule._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200 font-serif uppercase"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-2xl text-center text-gray-600 font-serif">
              No schedules found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}