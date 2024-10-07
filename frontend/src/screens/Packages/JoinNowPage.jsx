import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import dayjs from "dayjs"; // Import dayjs for date manipulation

const JoinNowPage = () => {
  const location = useLocation();
  const promo = location.state?.promo; // Check if promo exists in location state
  const navigate = useNavigate();
  
  // Access userId from Redux store
  const userId = useSelector((state) => state.auth.userInfo?._id); // Adjust according to your userInfo structure

  const [formData, setFormData] = useState({
    packname: "",
    price: "",
    startDate: new Date().toISOString().slice(0, 10), // Auto-fill today's date
    validity: "", // This will store the number of days
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    if (!promo) {
      // If promo is not available, navigate back or show an error
      alert("No promo data available. Redirecting...");
      navigate("/"); // Redirect to the home page or any other appropriate route
    } else {
      // Calculate validity in days between startDate and validity date
      const currentDate = dayjs(new Date().toISOString().slice(0, 10));
      const promoValidityDate = dayjs(promo.validity); // promo.validity is the end date
      const validityInDays = promoValidityDate.diff(currentDate, "day"); // Calculate the difference in days
      
      // Set the form data with promo details
      setFormData({
        packname: promo.packname,
        price: promo.price,
        startDate: new Date().toISOString().slice(0, 10), // today's date
        validity: validityInDays, // Set the difference in days
      });
    }
  }, [promo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/packages/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...formData }), // Include userId in the request body
      });

      const data = await response.json();

      if (response.ok) {
        alert("Successfully joined the package!");
        navigate("/member-dashboard"); // Redirect to a confirmation page or dashboard
      } else {
        setError(data.message || "Failed to join the package. Try again.");
      }
    } catch (error) {
      console.error("Error:", error); // Log detailed error to console
      setError("Network error. Please try again.");
    } finally {
      setLoading(false); // Set loading back to false after submission
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Join Now</h1>

      {/* Show error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Name */}
        <div>
          <label className="block text-gray-700 font-medium">Package Name</label>
          <input
            type="text"
            value={formData.packname}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Package Price */}
        <div>
          <label className="block text-gray-700 font-medium">Package Price</label>
          <input
            type="text"
            value={formData.price}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-700 font-medium">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Validity */}
        <div>
          <label className="block text-gray-700 font-medium">Validity (in Days)</label>
          <input
            type="text"
            value={formData.validity}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button when loading
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
        >
          {loading ? "Joining..." : "Join Now"}
        </button>
      </form>
    </div>
  );
};

export default JoinNowPage;
