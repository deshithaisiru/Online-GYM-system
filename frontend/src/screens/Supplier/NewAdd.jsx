import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageEmp() {
 
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
 

  const [validation, setValidation] = useState(null);  
  const [suplierId, setSuplierId] = useState(null);  
  const [EmployeId, setEmployeId] = useState(null); 
  console.log();

  


  

   








 

 


  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await fetch("/api/reco/create", {
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
        console.log("sussessfull");
        alert("suscessfull");
        
       
        navigate("");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

    
  const handleSChange = (e) => {
    const quantity = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (quantity === "") {
        setValidation(null);
    } else if (!quantityPattern.test(quantity)) {
        if (isNaN(quantity)) {
            setValidation("must be a number");
        } else {
            setValidation("must be a positive integer");
        }
    } else {
        setFormData({ ...formData, quantity });
        setValidation(null);
    }
};


const handleSupplierChange = (e) => {
  const id = e.target.value.trim();
  const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

  if (id === "") {
    setSuplierId(null);
  } else if (!quantityPattern.test(id)) {
      if (isNaN(id)) {
        setSuplierId("Id must be a number");
      } else {
        setSuplierId("Id must be a positive integer");
      }
  } else {
      setFormData({ ...formData, id });
      setSuplierId(null);
  }
};


const handleEmployeeChange = (e) => {
  const Emid = e.target.value.trim();
  const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

  if (Emid === "") {
    setEmployeId(null);
  } else if (!quantityPattern.test(Emid)) {
      if (isNaN(Emid)) {
        setEmployeId("Id must be a number");
      } else {
        setEmployeId("Id must be a positive integer");
      }
  } else {
      setFormData({ ...formData, Emid });
      setEmployeId(null);
  }
};


 





  return (
    <div className="h-[700px] relative">
      <img src="https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full  opacity-90 h-full object-cover" />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-4xl mt-10 font-serif opacity-90 uppercase   text-white">
               palce orders
              </h1>
            </div>
          </div>
          <div>
            <div className="flex justify-center mt-4 bg-slate-100 rounded-lg bg-opacity-60 h-[500px] w-[500px] items-center">
              <form className="flex flex-col mt-4  gap-4" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center gap-28">
                  <div>
                  <div className="mt-2">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="EmployeId"
                        id="Emid"
                        onChange={handleEmployeeChange}
                      />
                      {EmployeId && (
                        <p className="mt-0 text-red-600 h-0   text-sm    rounded-lg text-center ">
                          {EmployeId}
                        </p>
                      )}

                    </div>
                    <div className="mt-5">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="SupplierId"
                        id="id"
                        onChange={handleSupplierChange}
                      />
                         {suplierId && (
                        <p className="mt-0 text-red-600 h-0   text-sm    rounded-lg text-center ">
                          {suplierId}
                        </p>
                      )}
                    </div>
                    <div className="mt-5">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="SupplierName"
                        id="supname"
                        onChange={handlchange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="ProductName"
                        id="productname"
                        onChange={handlchange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Quantity"
                        id="quantity"
                        onChange={handleSChange}
                      />
                      {validation && (
                        <p className="mt-0 text-red-600 h-0   text-sm    rounded-lg text-center ">
                          {validation}
                        </p>
                      )}
                    </div>

                     
                    <div className="mt-6">
                     
                      <select
                        className="bg-slate-100 p-3 rounded-lg w-[400px] h-11 "
                        id="size"
                        onChange={handlchange}
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
  );
}
