import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageSchedule() {
  const [info, setInfo] = useState([]);
  const [dId, setFormId] = useState("");
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [uniqueNames, setUniqueNames] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/schedule/Sgetall`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data.equipment);
          const names = [...new Set(data.equipment.map((item) => item.name))];
          setUniqueNames(names);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchInfo();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/schedule/sdelete/${dId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((employee) => employee._id !== dId));
        alert("Deleted successfully");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let filteredData = [...info];
    
    if (query.trim() !== "") {
      filteredData = filteredData.filter(
        (employee) =>
          employee.name &&
          employee.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (nameFilter) {
      filteredData = filteredData.filter((employee) => employee.name === nameFilter);
    }

    setFilter(filteredData);
  }, [query, nameFilter, info]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Package", "Time", "Schedule"];
    const tableRows = filter.map((item) => [
      item.name,
      item.type,
      item.time,
      item.schedule,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: "grid",
    });

    doc.save("schedule_records.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-yellow-600 text-center mb-8">
          Manage Schedule
        </h1>
        
        <div className="flex justify-between items-center mb-8">
          <Link to="/dashboard">
            <button className="bg-white text-yellow-500 border border-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition duration-300">
              Back to Dashboard
            </button>
          </Link>
          <button
            onClick={generatePDF}
            className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300"
          >
            Generate PDF
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-grow px-4 py-2 rounded-full border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-full border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          >
            <option value="">Filter by Name</option>
            {uniqueNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filter.length > 0 ? (
              filter.map((employee) => (
                <div
                  key={employee._id}
                  className="bg-yellow-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                >
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">{employee.name}</h3>
                    <p className="text-gray-600"><span className="font-medium">Type:</span> {employee.type}</p>
                    <p className="text-gray-600"><span className="font-medium">Time:</span> {employee.time}</p>
                    <p className="text-gray-600"><span className="font-medium">Schedule:</span> {employee.schedule}</p>
                    <p className="text-gray-500 mt-2 text-sm">{employee.info}</p>
                  </div>
                  <div className="bg-yellow-100 px-4 py-3 flex justify-between items-center">
                    <Link to={`/Add/${employee._id}`}>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
                        Add Schedule
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setFormId(employee._id);
                        handleDeleteUser();
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-2xl text-yellow-500 text-center py-12">
                No schedules found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}