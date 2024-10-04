import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Manageschedule() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

  console.log("ind", DId);

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/schedule/Sgetall`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setInfo(data.equipment);
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
        alert("Deleted successfully");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Search
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Info]);
    } else {
      // If there's a query, filter the data
      const filteredData = Info.filter(
        (Employe) =>
          Employe.name &&
          Employe.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

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
    <div className="h-[800px] relative">
      <img
        src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-full opacity-90 h-full object-cover"
      />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-center items-center">
          <div className="mb-8 mt-4 font-semibold uppercase text-white text-3xl">
            Schedule Management
          </div>
        </div>

        <div className="flex justify-center mb-8 items-center">
          <input
            type="text"
            placeholder="Search schedules..."
            className="w-[400px] h-12 px-4 mt-4 rounded-full shadow-xl border border-slate-400 bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center mb-6">
          <Link to={`/addschedule`}>
            <button className="text-lg hover:text-blue-400 font-serif underline text-white">
              Request Schedule
            </button>
          </Link>
        </div>

        <div className="lg:w-[600px] xl:w-[1000px] bg-opacity-20 lg:h-[500px] w-[450px] md:w-[700px] bg-white p-4 rounded-lg shadow-lg transition-all duration-300">
          <div className="max-h-[470px] overflow-y-auto scrollbar-none">
            {filter.length > 0 ? (
              filter.map((Employe) => (
                <div
                  key={Employe._id}
                  className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md bg-opacity-80 transition-transform duration-300 hover:scale-95"
                >
                  <div className="flex">
                    <img
                      src={Employe.image}
                      alt=""
                      className="w-[200px] h-[150px] mr-4 rounded-md"
                    />
                    <div className="flex flex-wrap justify-between w-full">
                      <div className="w-1/2 pr-2">
                        <div>
                          <strong>Name:</strong> {Employe.name}
                        </div>
                        <div>
                          <strong>Type:</strong> {Employe.type}
                        </div>
                        <div className="font-thin text-red-600">
                          {Employe.schedule}
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
                </div>
              ))
            ) : (
              <p className="text-2xl font-serif text-white opacity-80 text-center mt-14">
                No schedules found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
