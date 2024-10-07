import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/reco/pgetall`);
        const data = await res.json();

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
      const res = await fetch(`/api/reco/prodelete/${DId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((Employe) => Employe._id !== DId));
        alert("Deleted");
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
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (Employe) =>
          Employe.packname &&
          Employe.packname.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const generatePDF = () => {
    const doc = new jsPDF();

    const header = "Package Report";
    const date = new Date().toLocaleDateString();

    doc.setFontSize(20);
    doc.text(header, 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 30);

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
      startY: 45,
      styles: { fontSize: 10 },
      theme: "grid",
    });

    doc.save("package_report.pdf");
  };

  return (
    <div className="min-h-screen bg-amber-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl lg:w-[1200px] w-full p-6">
        <h1 className="font-semibold uppercase text-black text-2xl text-center mb-4">
          Package Details
        </h1>

        <div className="flex justify-between mb-4">
          <Link to={`/dashboard`}>
            <button className="flex items-center bg-amber-400 hover:bg-amber-300 rounded-lg h-10 text-white font-serif px-4">
              <img
                src="https://img.icons8.com/?size=100&id=39776&format=png&color=000000"
                alt="Arrow"
                className="w-4 h-4 mr-2"
              />
              Back
            </button>
          </Link>
          <div className="flex space-x-4">
            <Link to={`/Addprom`}>
              <button className="flex items-center bg-amber-400 hover:bg-amber-300 rounded-lg h-10 text-white font-serif px-4 w-40">
                <img
                  src="https://img.icons8.com/?size=100&id=Li1YuxryCXFK&format=png&color=000000"
                  alt="Add Icon"
                  className="w-25 h-5 mr-1"
                />
                Add Package
              </button>
            </Link>
            <button
              onClick={generatePDF}
              className="flex items-center bg-amber-400 hover:bg-amber-300 text-white rounded-lg h-10 px-4 w-40"
            >
              <img
                src="https://img.icons8.com/?size=100&id=iKHgFBf3bRsI&format=png&color=000000"
                alt="Download Icon"
                className="w-25 h-5 mr-1"
              />
              Generate PDF
            </button>
          </div>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow min-w-32 max-w-xs h-10 rounded-full shadow-xl border border-slate-400 bg-opacity-10 px-4" // Minimum and maximum width
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Table Header and Body */}
        <div className="max-h-96 overflow-y-auto scrollbar-none">
          <table className="w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filter && filter.length > 0 ? (
                filter.map((Employe) => (
                  <tr key={Employe._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Employe.packname} {/* Updated to packname */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Employe.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Employe.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Employe.validity} {/* Corrected from validtiy */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/manage/${Employe._id}`}>
                        <img
                          src="https://img.icons8.com/?size=100&id=12082&format=png&color=000000"
                          alt="Edit"
                          className="w-5 h-5 inline-block cursor-pointer"
                        />
                      </Link>
                      <img
                        src="https://img.icons8.com/?size=100&id=WI4nkH3z0ufG&format=png&color=000000"
                        alt="Delete"
                        className="w-5 h-5 inline-block ml-3 cursor-pointer"
                        onClick={() => {
                          setformId(Employe._id);
                          handleDeleteUser();
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                  >
                    No packages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
