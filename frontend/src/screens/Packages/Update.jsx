import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
  const { idd } = useParams();

  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(`/api/reco/pgetall?upId=${idd}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.equipment.find(
            (Employe) => Employe._id === idd
          );
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      };
      fetchE();
    } catch (error) {
      console.log(error.message);
    }
  }, [idd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/reco/proupdatee/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("Success");
        navigate("/");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="h-[600px] relative">
      <img
        src="https://images.pexels.com/photos/4753885/pexels-photo-4753885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-full opacity-90 h-full object-cover"
      />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className="flex justify-center items-center">
            <div>
              <h1 className="text-4xl mt-10 font-serif opacity-90 uppercase text-white">
                Update Promo Package
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Link to={`/`}>
              <button className="text-md hover:text-orange-400 font-serif underline text-gray-800">
                Back
              </button>
            </Link>
          </div>
          <div>
            <div className="flex justify-center mt-4 bg-slate-100 rounded-lg bg-opacity-60 h-[400px] w-[500px] items-center">
              <form
                className="flex flex-col mt-10 gap-4"
                onSubmit={handleSubmit}
              >
                <div className="flex justify-center items-center gap-28">
                  <div>
                    <div className="mt-4">
                      <label htmlFor="packname" className="block text-gray-700">
                        Package Name
                      </label>
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        id="packname"
                        onChange={(e) =>
                          setFormData({ ...formData, packname: e.target.value })
                        }
                        value={formData.packname}
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="details" className="block text-gray-700">
                        Details
                      </label>
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        id="details"
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                        value={formData.details}
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="price" className="block text-gray-700">
                        Price
                      </label>
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        id="price"
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        value={formData.price}
                      />
                      <p className="text-red-600 h-0 text-sm rounded-lg text-center">
                        Price must be a number
                      </p>
                    </div>
                    <div className="mt-5">
                      <label htmlFor="validity" className="block text-gray-700">
                        Validity
                      </label>
                      <input
                        className="bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="date"
                        id="validity"
                        onChange={(e) =>
                          setFormData({ ...formData, validity: e.target.value })
                        }
                        value={formData.validity}
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        className="bg-[#ecb604] uppercase hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90"
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
