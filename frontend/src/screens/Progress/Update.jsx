import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const [formData, setFormData] = useState({
    id: "",
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
  const { idd } = useParams();

  useEffect(() => {
    const fetchE = async () => {
      try {
        const res = await fetch(`/api/progress/getall?upId=${idd}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        const selectedE = data.equipment.find((Employe) => Employe._id === idd);
        if (selectedE) {
          setFormData(selectedE);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchE();
  }, [idd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['Weekno', 'weight', 'height', 'Extime', 'meals', 'Wintake', 'sleepTime'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setPublishError(`${field} is required.`);
        return;
      }
    }

    // Check for non-negative values
    if (
      formData.Weekno < 0 ||
      formData.weight < 0 ||
      formData.height < 0 ||
      formData.Extime < 0 ||
      formData.meals < 0 ||
      formData.Wintake < 0 ||
      formData.sleepTime < 0
    ) {
      setPublishError("Week Number, Weight, Height, Exercise Time, Meals, Water Intake, and Sleep Time must be non-negative values.");
      return;
    }

    try {
      const res = await fetch(`/api/progress/updatee/${formData._id}`, {
        method: "PUT",
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
      alert("Success");
      navigate("/ProgressM");
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update Workout Progress
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Client name"
                readOnly
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Weekno" className="block text-sm font-medium text-gray-700">
                Week Number
              </label>
              <input
                id="Weekno"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Week Number"
                value={formData.Weekno}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Extime" className="block text-sm font-medium text-gray-700">
                Exercise Time
              </label>
              <input
                id="Extime"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Exercise Time"
                value={formData.Extime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="meals" className="block text-sm font-medium text-gray-700">
                Meals
              </label>
              <input
                id="meals"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Meals"
                value={formData.meals}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Wintake" className="block text-sm font-medium text-gray-700">
                Water Intake (liters)
              </label>
              <input
                id="Wintake"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Water Intake"
                value={formData.Wintake}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sleepTime" className="block text-sm font-medium text-gray-700">
                Sleep Time (hours)
              </label>
              <input
                id="sleepTime"
                type="number"
                min="0"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Sleep Time"
                value={formData.sleepTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="RestDay" className="block text-sm font-medium text-gray-700">
                Rest Day
              </label>
              <select
                id="RestDay"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                value={formData.RestDay}
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
          <div>
            {publishError && <div className="text-red-500">{publishError}</div>}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
