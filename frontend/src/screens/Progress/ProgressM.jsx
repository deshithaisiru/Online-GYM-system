import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [uniqueNames, setUniqueNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/progress/getall`);
        const data = await res.json();

        if (res.ok) {
          setInfo(data.equipment);
          setFilter(data.equipment);
          const names = [...new Set(data.equipment.map(item => item.name))];
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
      const res = await fetch(`/api/progress/delete/${DId}`, {
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

  useEffect(() => {
    let filteredData = Info;

    if (query.trim() !== "") {
      filteredData = filteredData.filter((Employe) =>
        Employe.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedName) {
      filteredData = filteredData.filter((Employe) => Employe.name === selectedName);
    }

    setFilter(filteredData);
  }, [query, Info, selectedName]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Week No", "Weight (kg)", "Height (cm)", "Exercise Time (min)", "Meals", "Water Intake (L)", "Sleep Time (h)", "Rest Day"];

    const tableRows = filter.map(item => [
      item.name,
      item.Weekno,
      `${item.weight} kg`,
      `${item.height} cm`,
      item.Extime,
      item.meals,
      `${item.Wintake} L`,
      `${item.sleepTime} h`,
      item.RestDay,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: "grid",
    });

    doc.save("progress_records.pdf");
  };

  return (
    <div className="relative h-screen">
      <img src="https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="absolute inset-0 object-cover w-full h-full opacity-70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
        <h1 className="mb-8 text-3xl font-bold text-white uppercase">Manage Progress</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full max-w-md h-12 px-4 text-lg rounded-full shadow-lg border border-gray-400 focus:outline-none focus:ring focus:ring-yellow-400"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="w-full max-w-md h-12 rounded-full shadow-lg border border-gray-400 bg-white focus:outline-none focus:ring focus:ring-yellow-400"
          >
            <option value="">All Names</option>
            {uniqueNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-5xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-yellow-500 text-white">
                <tr>
                  {["Name", "Week No", "Weight (kg)", "Height (cm)", "Exercise Time (min)", "Meals", "Water Intake (L)", "Sleep Time (h)", "Rest Day", "Edit", "Delete"].map((header) => (
                    <th key={header} className="px-4 py-3 text-left text-xs font-medium uppercase">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filter.length > 0 ? (
                  filter.map((Employe) => (
                    <tr key={Employe._id} className="hover:bg-gray-100">
                      <td className="px-4 py-3 whitespace-nowrap">{Employe.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{Employe.Weekno}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{`${Employe.weight} kg`}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{`${Employe.height} cm`}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{Employe.Extime}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{Employe.meals}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{`${Employe.Wintake} L`}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{`${Employe.sleepTime} h`}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{Employe.RestDay}</td>
                      <td className="whitespace-nowrap">
                        <Link to={`/manage/${Employe._id}`}>
                          <button className="w-24 bg-green-500 hover:bg-green-400 rounded-lg h-10 border border-opacity-45 text-white">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap">
                        <button onClick={() => { setformId(Employe._id); handleDeleteUser(); }} className="w-24 bg-red-500 hover:bg-red-400 rounded-lg h-10 border border-opacity-45 text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="px-4 py-3 text-center">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            onClick={generatePDF}
            className="w-40 h-10 text-white bg-yellow-500 hover:bg-yellow-400 rounded-lg shadow-md mt-4"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
