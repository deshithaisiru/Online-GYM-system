import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageSuppliers() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  console.log("ind", DId);

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/sup/getallorder`);
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

  const handleDeleteSupplier = async () => {
    try {
      const res = await fetch(`/api/sup/deleteeq/${DId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((Supplier) => Supplier._id !== DId));
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
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (Supplier) =>
          Supplier.supname &&
          Supplier.supname.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Id', 'SupplierName', 'ProductName', 'Quantity', 'Size'];

    const tableRows = filter.map(item => [
      item.id,
      item.supname,
      item.productname,
      item.quantity,
      item.size,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      theme: 'grid',
    });

    doc.save('suppliers_records.pdf');
  };

  return (
    <div className="h-[800px] relative">
      <img
        src="https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-full opacity-90 h-full object-cover"
      />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-center items-center">
          <div className="mb-8 mt-4 font-semibold uppercase text-white text-2xl">
            Received Supplier Orders
          </div>
        </div>

        <div className="flex justify-center mb-8 items-center">
          <div>
            <form>
              <div className="opacity-50">
                <input
                  type="text"
                  placeholder="Search... "
                  className=" w-[400px] h-10 mt-4 rounded-full shadow-xl border border-slate-400 bg-opacity-10"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div>
          <Link to={`/add`}>
            <button className="w-24 bg-[#252525] hover:opacity-80 rounded-lg h-10 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
              Add Order
            </button>
          </Link>
        </div>

        <div className="lg:w-[600px] xl:w-[1216px] lg:h-[400px] w-[450px] md:w-[700px] bg-white">
          <div className="">
            <div className="max-h-96 overflow-y-auto scrollbar-none">
              <table className="w-full divide-y divide-black divide-opacity-0 ">
                <thead className="bg-none divide-x divide-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs bg-gray-700 text-white font-medium text-opacity-80 uppercase">
                      UserId
                    </th>
                    <th className="px-6 py-3 text-left text-xs bg-gray-700 text-white font-medium text-opacity-80 uppercase">
                      SupplierId
                    </th>
                    <th className="px-6 py-3 text-left text-xs bg-gray-700 text-white font-medium text-opacity-80 uppercase">
                      SupplierName
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-gray-700 text-white text-opacity-80 uppercase">
                      ProductName
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-gray-700 text-white text-opacity-80 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-gray-700 text-white text-opacity-80 uppercase">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-gray-700 text-white text-opacity-80 uppercase">
                      Edit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium bg-gray-700 text-white text-opacity-80 uppercase">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-none bg-opacity-40 divide-y divide-white">
                  {filter && filter.length > 0 ? (
                    <>
                      {filter.map((Supplier) => (
                        <tr key={Supplier._id} className="white:border-white dark:bg-white">
                          <td className="px-6 py-4 font-serif whitespace-nowrap">
                            S#00{Supplier.id}
                          </td>
                          <td className="px-6 py-4 font-serif whitespace-nowrap">
                            E#00{Supplier.Emid}
                          </td>
                          <td className="px-6 py-4 font-serif whitespace-nowrap">
                            {Supplier.supname}
                          </td>
                          <td className="px-6 py-4 font-serif whitespace-nowrap">
                            {Supplier.productname}
                          </td>
                          <td className="px-6 py-4 font-serif whitespace-nowrap">
                            {Supplier.quantity}
                          </td>
                          <td className="px-6 py-4 font-serif whitespace-nowrap">
                            {Supplier.size}
                          </td>

                          <td className="whitespace-nowrap">
                            <Link to={`/manageorder/${Supplier._id}`}>
                              <button className="w-24 bg-[#1bbe4c] hover:opacity-80 rounded-lg h-10 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap">
                            <span
                              onClick={() => {
                                setformId(Supplier._id);
                                handleDeleteSupplier();
                              }}
                            >
                              <button className="w-24 bg-[#d62e22] hover:opacity-80 rounded-lg h-10 border-white border border-opacity-45 text font-serif text-white text-opacity-80">
                                Delete
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <p className="text-2xl font-serif absolute ml-[480px] opacity-60 mt-14">
                      You have no suppliers
                    </p>
                  )}
                </tbody>
              </table>

              <div className="flex justify-between px-6 py-4 bg-gray-200">
                <div className="font-bold">Total Orders: {Info.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
