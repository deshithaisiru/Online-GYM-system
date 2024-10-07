import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './components/Spinner';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the jsPDF autoTable plugin

const ShowSalaryrecord = () => {
  const [salary, setSalary] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/salarys/${id}`)
      .then((response) => {
        setSalary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDownload = () => {
    const pdf = new jsPDF();
    pdf.text('Salary Record', 10, 10);
    
    // Define the table columns and data
    const columns = [
      { header: 'Field', dataKey: 'field' },
      { header: 'Value', dataKey: 'value' },
    ];

    const data = [
      { field: 'ID', value: salary.iD },
      { field: 'Month', value: salary.month },
      { field: 'Name', value: salary.name },
      { field: 'Role', value: salary.role },
      { field: 'Email', value: salary.email },
      { field: 'Basic Salary', value: salary.bsalary },
      { field: 'OT Hours', value: salary.otHour },
      { field: 'OT Rate', value: salary.otRate },
      { field: 'OT Total', value: salary.otTotal },
      { field: 'Bonus', value: salary.bonus },
      { field: 'Total Salary', value: salary.tsalary },
      { field: 'Payment Status', value: salary.payst },
    ];

    // Use autoTable to create the table in the PDF
    pdf.autoTable(columns, data, { startY: 20 });

    pdf.save('salary_record.pdf'); // Save the PDF with a specific name
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className='min-h-screen p-4 bg-gray-200'>
      <button 
        onClick={handleBack} 
        className="mb-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
      >
        Back
      </button>
      
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-black rounded-xl w-1/2 mx-auto p-4 bg-yellow-200'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Id:</span>
            <span>{salary.iD}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Month:</span>
            <span>{salary.month}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Name:</span>
            <span>{salary.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Role:</span>
            <span>{salary.role}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Email:</span>
            <span>{salary.email}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Basic Salary:</span>
            <span>{salary.bsalary}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>OT hours:</span>
            <span>{salary.otHour}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>OT rate:</span>
            <span>{salary.otRate}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>OT total:</span>
            <span>{salary.otTotal}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Bonus:</span>
            <span>{salary.bonus}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Total Salary:</span>
            <span>{salary.tsalary}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-700'>Payment Status:</span>
            <span>{salary.payst}</span>
          </div>
        </div>
      )}
      <div className='flex justify-center mt-4'>
        <button
          onClick={handleDownload}
          className='bg-black text-white px-4 py-2 rounded-md'>
          Download
        </button>
      </div>
    </div>
  );
};

export default ShowSalaryrecord;
