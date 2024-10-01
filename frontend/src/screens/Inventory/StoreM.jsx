import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PencilIcon, TrashIcon, DownloadIcon, PlusIcon } from "lucide-react";

const ProductListItem = ({ product, onEdit, onDelete }) => {
  return (
    <li className="bg-white border-b border-yellow-200 hover:bg-yellow-50 transition-colors duration-150">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <img src={product.image} alt={product.ItemsN} className="w-16 h-16 object-cover rounded-md" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product.ItemsN}</h3>
            <p className="text-sm text-gray-600">Flavor: {product.flavor}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
          <p className="text-lg font-bold text-yellow-600">${product.price}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(product._id)}
              className="p-2 text-yellow-600 hover:text-yellow-800 transition-colors duration-150"
            >
              <PencilIcon size={18} />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="p-2 text-red-600 hover:text-red-800 transition-colors duration-150"
            >
              <TrashIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function StoreM() {
  const [Info, setInfo] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`/api/items/IgetAll`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data.items);
          setFilter(data.items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`/api/items/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInfo((prev) => prev.filter((product) => product._id !== id));
        setFilter((prev) => prev.filter((product) => product._id !== id));
        alert("Product deleted");
      } else {
        console.log("Error deleting product");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const filteredData = Info.filter(
      (product) =>
        product.ItemsN &&
        product.ItemsN.toLowerCase().includes(query.toLowerCase())
    );
    setFilter(filteredData);
  }, [query, Info]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Product Report", 10, 10);
    const columns = [
      { title: "Name", dataKey: "name" },
      { title: "Flavor", dataKey: "flavor" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Price", dataKey: "price" },
    ];
    const data = Info.map((product) => ({
      name: product.ItemsN,
      flavor: product.flavor,
      quantity: product.quantity,
      price: product.price,
    }));
    doc.autoTable({
      columns: columns,
      body: data,
      styles: { cellPadding: 1, fontSize: 10, lineHeight: 1.2, overflow: "linebreak" },
      headStyles: { fillColor: [255, 193, 7], textColor: [0, 0, 0], fontStyle: "bold" },
      columnStyles: { 0: { halign: "left" }, 1: { halign: "left" }, 2: { halign: "left" }, 3: { halign: "left" } },
    });
    doc.save("productReport.pdf");
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-bold mb-8 text-yellow-600">
          Inventory Management
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 px-4 py-2 rounded-full border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex space-x-4">
            <Link
              to="/add-inventory"
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-md transition duration-300"
            >
              <PlusIcon size={18} className="mr-2" />
              New Product
            </Link>
            <button
              onClick={generatePDF}
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-md transition duration-300"
            >
              <DownloadIcon size={18} className="mr-2" />
              Download Report
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-yellow-200">
            {filter.length > 0 ? (
              filter.map((product) => (
                <ProductListItem
                  key={product._id}
                  product={product}
                  onEdit={(id) => {
                    window.location.href = `/update/${id}`;
                  }}
                  onDelete={handleDeleteUser}
                />
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 text-lg">
                No products available
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}