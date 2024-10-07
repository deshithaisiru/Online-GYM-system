import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Addpromo() {
  const [formData, setFormData] = useState({
    packname: "",  // Updated to packname
    details: "",
    price: "",
    validity: "",  // Corrected from validtiy to validity
  });
  const [publishError, setPublishError] = useState(null);
  const [validation, setValidation] = useState(null);
  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reco/pcreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        console.log("successful");
        alert("successful");
        navigate("/package");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleSChange = (e) => {
    const price = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (price === "") {
      setValidation(null);
    } else if (!quantityPattern.test(price)) {
      setValidation("Price must be a positive integer");
    } else {
      setFormData({ ...formData, price });
      setValidation(null);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/4753885/pexels-photo-4753885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Centered Form */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-xl max-w-lg w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Promo Package Creation
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Back Button on the Left */}
            <div className="flex justify-start mb-4">
              <Link to={`/package`} className="text-gray-500 hover:text-gray-700">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="underline text-sm">Back</span>
                </button>
              </Link>
            </div>

            <div className="flex flex-col">
              <label htmlFor="packname" className="text-gray-700">  {/* Updated to packname */}
                Package Name
              </label>
              <input
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ecb604] focus:border-transparent"
                type="text"
                placeholder="Enter Package Name"
                id="packname"
                onChange={handlchange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="details" className="text-gray-700">
                Details
              </label>
              <input
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ecb604] focus:border-transparent"
                type="text"
                placeholder="Enter Package Details"
                id="details"
                onChange={handlchange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="text-gray-700">
                Price
              </label>
              <input
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ecb604] focus:border-transparent"
                type="text"
                placeholder="Enter Price"
                id="price"
                onChange={handleSChange}
              />
              {validation && (
                <p className="text-red-500 text-sm mt-1">{validation}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="validity" className="text-gray-700">  {/* Corrected from validtiy */}
                Validity Date
              </label>
              <input
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ecb604] focus:border-transparent"
                type="date"
                id="validity"  // Corrected from validtiy
                onChange={handlchange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#ecb604] text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Submit
            </button>
          </form>

          {/* Error message */}
          {publishError && (
            <p className="text-red-500 text-center mt-4">{publishError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
