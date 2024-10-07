import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

export default function AddProgress() {
  const [formData, setFormData] = useState({
    name: "",
    Weekno: "",
    weight: "",
    height: "",
    Extime: "",
    meals: "",
    Wintake: "",
    sleepTime: "",
    RestDay: "",
  });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.name) {
      setFormData((prevState) => ({
        ...prevState,
        name: userInfo.name,
        weight: userInfo.weight,
        height: userInfo.height,
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for negative values before submitting
    if (Object.values(formData).some(value => parseFloat(value) < 0)) {
      setPublishError("Values cannot be negative.");
      return;
    }

    console.log("Form Data Submitted:", formData);

    try {
      const res = await fetch("/api/progress/create", {
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

      setPublishError(null);
      alert("Progress added successfully");
      navigate("/pdisplay");
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <Link
            to="/pdisplay"
            className="flex items-center text-yellow-600 hover:text-yellow-700 transition duration-150 ease-in-out mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to My Progress List</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Progress
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.name}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="Weekno" className="block text-sm font-medium text-gray-700">
                Week Number
              </label>
              <input
                id="Weekno"
                name="Weekno"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Week Number"
                onChange={handleChange}
                onInvalid={(e) => e.target.setCustomValidity("Please enter a valid week number (0 or higher).")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                onInvalid={(e) => e.target.setCustomValidity("Please enter a valid weight (0 or higher).")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                id="height"
                name="height"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                onInvalid={(e) => e.target.setCustomValidity("Please enter a valid height (0 or higher).")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div>
              <label htmlFor="Extime" className="block text-sm font-medium text-gray-700">
                Exercise Time
              </label>
              <input
                id="Extime"
                name="Extime"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Exercise Time"
                onChange={handleChange}
                onInvalid={(e) => e.target.setCustomValidity("Please enter valid exercise time.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div>
              <label htmlFor="meals" className="block text-sm font-medium text-gray-700">
                Meals
              </label>
              <input
                id="meals"
                name="meals"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Meals"
                onChange={handleChange}
                onInvalid={(e) => e.target.setCustomValidity("Please enter valid meal details.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div>
              <label htmlFor="Wintake" className="block text-sm font-medium text-gray-700">
                Water Intake
              </label>
              <input
                id="Wintake"
                name="Wintake"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Water Intake"
                onChange={handleChange}
                onInvalid={(e) => e.target.setCustomValidity("Please enter valid water intake details.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div>
              <label htmlFor="sleepTime" className="block text-sm font-medium text-gray-700">
                Sleep Time
              </label>
              <input
                id="sleepTime"
                name="sleepTime"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Sleep Time"
                onChange={handleChange}
                onInvalid={(e) => e.target.setCustomValidity("Please enter valid sleep time.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div>
              <label htmlFor="RestDay" className="block text-sm font-medium text-gray-700">
                Rest Day
              </label>
              <select
                id="RestDay"
                name="RestDay"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                onChange={handleChange}
              >
                <option value="">Select a Rest Day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
          </div>
          {publishError && <p className="text-red-500 text-sm">{publishError}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Add Progress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
