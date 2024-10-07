import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/reco/getall`);
        const data = await res.json();

        if (res.ok) {
          setInfo(data.equipment);
          setfilter(data.equipment); // Initialize filter with all data
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  // Search
  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (Employe) =>
          Employe.supname &&
          Employe.supname.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  return (
    <div className="h-[800px] relative">
      <img
        src="https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-full opacity-90 h-full object-cover"
      />

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 p-4  rounded-lg shadow-lg">
        <div className="flex justify-center items-center mb-8">
          <h2 className="font-semibold uppercase text-gray-800 text-2xl">Orders</h2>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 rounded-full shadow-xl border border-gray-400 p-2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[500px] overflow-y-auto scrollbar-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filter.length > 0 ? (
            filter.map((Employe) => (
              <div key={Employe._id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                <h3 className="font-bold text-xl">Supplier: {Employe.supname}</h3>
                <p className="text-gray-600">Product: {Employe.productname}</p>
                <p className="text-gray-600">Quantity: {Employe.quantity}</p>
                <p className="text-gray-600">Size: {Employe.size}</p>
                <p className="text-gray-600">Employee ID: E#00{Employe.Emid}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">You have no orders</div>
          )}
        </div>
        </div>

        <div className="flex justify-between px-6 py-4 bg-gray-200 mt-4 rounded-lg">
          <div className="font-bold">Total Orders: {Info.length}</div>
        </div>
      </div>
    </div>
  );
}
