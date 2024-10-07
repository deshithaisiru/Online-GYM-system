import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageEmp() {
  const [info, setInfo] = useState([]);
  const [DId, setFormId] = useState("");
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch Promo Packages on Component Mount
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/reco/pgetall`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data.equipment);
          setFilter(data.equipment); // Initially set filter to all packages
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchInfo();
  }, []);

  // Handle Package Deletion
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/reco/prodelete/${DId}`, { method: "DELETE" });
      if (res.ok) {
        setInfo((prev) => prev.filter((employee) => employee._id !== DId));
        alert("Deleted successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle Search Filtering
  useEffect(() => {
    if (query.trim() === "") {
      setFilter([...info]);
    } else {
      const filteredData = info.filter((employee) =>
        employee.packname && employee.packname.toLowerCase().includes(query.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [query, info]);

  // Generate PDF of Promo Packages
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Package Name", "Details", "Price", "Validity"];
    const tableRows = filter.map((item) => [
      item.packname,
      item.details,
      item.price,
      item.validity,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: "grid",
    });
    doc.save("promo_packages.pdf");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner */}
      <div className="relative w-full h-96 bg-blue-600">
        <img
          src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50 bg-black flex justify-center items-center">
          <h1 className="text-white text-5xl font-bold uppercase">Welcome to Our Packages</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow w-full max-w-7xl px-10 mt-10 mx-auto">
        <div className="flex justify-between items-center mb-8 mt-4 font-semibold uppercase text-black text-2xl">
          <span>Plan Details</span>

          {/* PDF Button */}
          {/* <button
            onClick={generatePDF}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Generate PDF
          </button> */}
        </div>

        {/* Manage Packages Button */}
        <div className="flex justify-center mb-8">
      
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Package..."
            className="w-full max-w-md px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>

        {/* Promo Cards */}
        <div className="w-full max-w-7xl overflow-x-auto scrollbar-none">
          <div className="flex flex-wrap justify-center">
            {filter.length > 0 ? (
              filter.map((employee) => (
                <div
                  key={employee._id}
                  className="relative m-4 border shadow-lg h-[450px] rounded-3xl w-[350px] overflow-hidden"
                >
                  <img
                    src="https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Card Image"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="relative z-10 p-4 text-white">
                    <div className="flex justify-center items-center">
                      <h3 className="font-serif text-3xl">{employee.packname}</h3>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                      <h3 className="font-thin text-lg">{employee.details}</h3>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="mt-48 bg-yellow-400 w-32 border shadow-xl rounded-xl text-black">
                        <h3 className="font-serif text-3xl">${employee.price}</h3>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <Link
                        to={`/join-now`}
                        state={{ promo: employee }} // Pass the promo data
                      >
                        <div className="mt-8 w-36 bg-slate-100 border shadow-xl rounded-xl text-black">
                          <h3 className="font-serif hover:text-yellow-400 cursor-pointer text-3xl">
                            Join Now
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-2xl font-serif opacity-60">No packages available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
