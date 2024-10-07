import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {

    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
   
    const navigate = useNavigate();

    
    

      const { idd } = useParams();
  

   

 
  
  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `/api/reco/getall?upId=${idd}`
        );
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
        
      const res = await fetch(`/api/reco/updatee/${formData._id}`, {
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
        
        alert("sucsses ")
        navigate("/");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };








  return (
    <div className="h-[600px] relative">
      <img src="https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full  opacity-90 h-full object-cover" />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-4xl mt-8 font-serif opacity-90 uppercase   text-white">
               palce orders
              </h1>
            </div>
          </div>
          <div>
            <div className="flex justify-center mt-4 bg-slate-100 rounded-lg bg-opacity-60 h-[480px] w-[500px] items-center">
              <form className="flex flex-col mt-6  gap-4" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center gap-28">
                  <div>

                  <div className="mt-2">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="EmployeId"
                        id="Emid"
                        onChange={(e) => setFormData({ ...formData, Emid: e.target.value })}
                        value={formData.Emid}
                      />
                     
                        <p className="mt-0 text-red-600 h-0   text-sm    rounded-lg text-center ">
                          Id Must be Number
                        </p>
                     

                    </div>
                  <div className="mt-5">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="SupplierId"
                        id="id"
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        value={formData.id}
                      />
                        <p className="mt-0 text-red-600 h-0   text-sm    rounded-lg text-center ">
                          Id Must be Number
                        </p>
                     
                    </div>
                    <div className="mt-5">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="SupplierName"
                        id="supname"
                        onChange={(e) => setFormData({ ...formData, supname: e.target.value })}
                        value={formData.supname}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="ProductName"
                        id="productname"
                        onChange={(e) => setFormData({ ...formData, productname: e.target.value })}
                        value={formData.productname}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Quantity"
                        id="quantity"
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        value={formData.quantity}
                      />
                        <p className="mt-0 text-red-600 h-0   text-sm    rounded-lg text-center ">
                           Must be Number
                        </p>
                     
                    
                    </div>

                     
                    <div className="mt-6">
                     
                      <select
                        className="bg-slate-100 p-3 rounded-lg w-[400px] h-11 "
                        id="size"
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        value={formData.size}
                      >
                        <option value="">Select </option>
                        <option value="Large">Large</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                      
                      </select>
                    </div>
                       
                    
                   




                    <div className="mt-4">
                      <button
                        className=" bg-[#0b7002] uppercase hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90"
                        type="submit"
                      >
                        submit
                      </button>
                    </div>
                  </div>

                 
               
                </div>
              </form>
            </div>
          </div>
          <div className="flex">
            <div className=" mb-1 mt-4   "></div>
          </div>
        </div>

      
      </div>
    </div>
  )
}
