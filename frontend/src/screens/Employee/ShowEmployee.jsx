import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './components/Spinner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ShowEmployeeDetails = () => {
  const [information, setInformation] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const pdfRef = useRef(); // Create a ref for the content to download
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/informations/${id}`)
      .then((response) => {
        setInformation(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDownload = () => {
    const input = pdfRef.current; // Get the content to download
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Width of the image in the PDF
      const pageHeight = pdf.internal.pageSize.height; // Height of the page
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height based on aspect ratio
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF and check for page overflow
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('employee_details.pdf'); // Save the PDF with a specific name
    });
  };

  return (
    <div className='min-h-screen p-4 bg-gray-200'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Back button to navigate to the previous page in the left corner */}
          <button
            onClick={() => navigate(-1)}
            className='bg-gray-500 text-white px-6 py-3 rounded-md mb-4 transition duration-300 hover:bg-gray-400'
          >
            Back
          </button>

          {/* Content to download */}
          <div ref={pdfRef} className='flex flex-col border border-gray-300 shadow-lg rounded-xl w-3/4 mx-auto p-6 bg-white'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>Employee Information</h2>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border-b-2 border-gray-300 text-left py-2 px-4'>Field</th>
                  <th className='border-b-2 border-gray-300 text-left py-2 px-4'>Details</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(information)
                  .filter(([key]) => key !== '_id' && key !== '__v') // Filter out _id and __v
                  .map(([key, value]) => (
                    <tr key={key} className='border-b'>
                      <td className='text-lg font-semibold text-gray-700 py-2 px-4'>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </td>
                      <td className='text-lg text-gray-600 py-2 px-4'>{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={handleDownload}
            className='bg-black text-white px-6 py-3 rounded-md block mx-auto mt-4 transition duration-300 hover:bg-gray-800'>
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default ShowEmployeeDetails;
