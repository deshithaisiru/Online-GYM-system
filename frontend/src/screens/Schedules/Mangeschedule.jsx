import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Manageschedule() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");
  const [nameFilter, setNameFilter] = useState(""); // New state for name filter
  const [uniqueNames, setUniqueNames] = useState([]); // New state for unique names

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/schedule/Sgetall`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data.equipment);
          // Get unique names for dropdown
          const names = [...new Set(data.equipment.map((item) => item.name))];
          setUniqueNames(names);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/schedule/sdelete/${DId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((Employe) => Employe._id !== DId));
        alert("deleted");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Search & Filter
  useEffect(() => {
    let filteredData = [...Info];
    
    if (query.trim() !== "") {
      filteredData = filteredData.filter(
        (Employe) =>
          Employe.name &&
          Employe.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (nameFilter) {
      filteredData = filteredData.filter((Employe) => Employe.name === nameFilter);
    }

    setfilter(filteredData);
  }, [query, nameFilter, Info]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Package", "Time", "Schedule"];

    // Prepare the data
    const tableRows = filter.map((item) => [
      item.name,
      item.type,
      item.time,
      item.schedule,
    ]);

    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: "grid",
    });

    // Save the PDF
    doc.save("schedule_records.pdf");
  };

  return (
    <div className="h-[800px] relative bg-white">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-center items-center">
          <div className="mb-8 mt-4 font-semibold uppercase text-yellow-500 text-2xl">
            Manage Schedule
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Link to={`/dashboard`}>
            <button className="text-md hover:text-yellow-400 font-serif underline text-yellow-500">
              Back
            </button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex justify-center mb-8 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-[400px] h-10 mt-4 rounded-full shadow-xl border border-yellow-400 bg-opacity-10"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Filter for Names */}
        <div className="flex justify-center mb-8 items-center">
          <select
            className="w-[200px] h-10 mt-4 rounded-full shadow-xl border border-yellow-400 bg-opacity-10"
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

        {/* Display Filtered Schedules */}
        <div className="lg:w-[600px] xl:w-[1000px] lg:h-[500px] w-[450px] md:w-[700px] bg-white p-4 rounded-lg shadow-lg border border-yellow-500">
          <div className="max-h-[470px] overflow-y-auto scrollbar-none">
            {filter.length > 0 ? (
              filter.map((Employe) => (
                <div
                  key={Employe._id}
                  className="bg-yellow-100 p-4 mb-4 rounded-lg shadow-md bg-opacity-80 transition-transform duration-300 hover:scale-90"
                >
                  <div className="flex">
                    <img
                      src={Employe.image}
                      alt=""
                      className="w-[400px] h-[300px] mr-4"
                    />
                    <div className="flex flex-wrap justify-between w-full">
                      <div className="w-1/2 pr-2">
                        <div>
                          <strong>Name:</strong> {Employe.name}
                        </div>
                        <div>
                          <strong>Type:</strong> {Employe.type}
                        </div>
                        <div className="font-thin text-yellow-600">
                          <strong>Schedule:</strong> {Employe.schedule}
                        </div>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div>
                          <strong>Time:</strong> {Employe.time}
                        </div>
                        <div>
                          <strong>Info:</strong> {Employe.info}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <Link to={`/Add/${Employe._id}`}>
                      <button className="bg-yellow-500 hover:opacity-80 rounded-lg h-8 w-36 text-white">
                        Add Schedule
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setformId(Employe._id);
                        handleDeleteUser();
                      }}
                      className="bg-red-500 hover:opacity-80 rounded-lg h-8 w-24 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-2xl font-serif text-yellow-500 opacity-60 mt-14 text-center">
                No schedules found
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={generatePDF}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
