import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageEmp() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [validation, setValidation] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reco/mcreate", {
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
        window.location.reload();
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleContactChange = (e) => {
    const phoneNumber = e.target.value.trim();
    const contactPattern = /^\d{10}$/; // Pattern for a valid contact number

    if (phoneNumber === "") {
      setValidation(null);
    } else if (!contactPattern.test(phoneNumber)) {
      if (isNaN(phoneNumber)) {
        setValidation("Contact number must be a number");
      } else {
        setValidation("Contact number must be a valid 10-digit number");
      }
    } else {
      setFormData({ ...formData, phonenumber: phoneNumber });
      setValidation(null);
    }
  };

  return (
    <div className="h-[800px] relative">
      <img src="https://images.pexels.com/photos/4753885/pexels-photo-4753885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full opacity-90 h-full object-cover" />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className="flex justify-center items-center">
            <div>
              <h1 className="text-4xl mt-10 font-serif opacity-90 uppercase text-white">
                Membership Package
              </h1>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Link to={`/plan`}>
              <button className="text-md hover:text-orange-400 font-serif underline text-gray-800">
                Back
              </button>
            </Link>
          </div>

          <div>
            <div className="flex justify-center mt-4 bg-slate-100 rounded-lg bg-opacity-60 h-[580px] w-[500px] items-center">
              <form className="flex flex-col mt-10 gap-4" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center gap-28">
                  <div>
                    <select
                      className="bg-slate-100 p-3 rounded-lg w-[400px] h-11"
                      id="packagename"
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Student">Student</option>
                      <option value="Family">Family</option>
                      <option value="3 Month">3 Month</option>
                    </select>
                    <div className="mt-4">
                      <input
                        className="bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="Your Name"
                        id="yourname"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Product Name"
                        id="productname"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Your Number"
                        id="phonenumber"
                        maxLength={10}
                        onChange={handleContactChange}
                      />
                      {validation && (
                        <p className="mt-0 text-red-600 h-0 text-sm rounded-lg text-center ">
                          {validation}
                        </p>
                      )}
                    </div>
                    <div className="mt-5">
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="City"
                        id="city"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Message"
                        id="message"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Radio buttons for gender selection */}
                    <div className="mt-4">
                      <p className="font-serif">Select Gender:</p>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={handleChange}
                          className="mr-1"
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={handleChange}
                          className="mr-1"
                        />
                        Female
                      </label>
                    </div>

                    <div className="mt-4">
                      <button
                        className="bg-[#f5bd06] uppercase hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex">
            <div className="mb-1 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
