import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/button';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ShowUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    userType: '',
    mobile: '',
    height: 0,
    weight: 0,
    birthday: '',
    address: '',
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/users/specific/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const userBMI = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(userBMI);
  const age = calculateAge(user.birthday);

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add enhanced header
    doc.setFillColor(204, 204, 0); // Darker yellow color
    doc.rect(0, 0, 210, 20, "F"); // Slightly larger header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("AuraFitness", 105, 15, null, null, "center");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("Your Health, Our Priority", 105, 26, null, null, "center"); // Sub-header
  
    // Add title for the document
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.text(`Client Details - ${user.name}`, 105, 50, null, null, "center");
  
    // Line separator below title
    doc.setDrawColor(52, 152, 219);
    doc.line(20, 55, 190, 55);
  
    // Table data
    const tableColumn = [
      { content: "Field", styles: { fillColor: [204, 204, 0], textColor: [0, 0, 0] } }, // Yellow color for field column
      { content: "Value", styles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] } }
    ];
  
    const tableRows = [
      ["Name", user.name],
      ["Email", user.email],
      ["User Type", user.userType],
      ["Mobile", user.mobile],
      ["Address", user.address],
      ["Height", `${user.height} cm`],
      ["Weight", `${user.weight} kg`],
      ["BMI", `${userBMI} (${bmiCategory})`],
      ["Birthday", user.birthday],
      ["Age", `${age} years`],
      ["Is Admin", user.isAdmin ? "Yes" : "No"],
    ];
  
    doc.autoTable({
      startY: 60,
      head: [tableColumn.map(col => col.content)], // Column names
      body: tableRows,
      headStyles: { fillColor: [204, 204, 0], textColor: [0, 0, 0] }, // Darker yellow for the field column
      alternateRowStyles: { fillColor: [255, 255, 204] }, // Lighter yellow for alternate rows
      margin: { top: 60, bottom: 40 },
      columnStyles: {
        1: { fillColor: [255, 255, 255] } // Values column with white
      }
    });
  
    // Add enhanced footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setTextColor(150);
  
      // Page number
      doc.text(
        `Page ${i} of ${pageCount}`,
        105,
        doc.internal.pageSize.height - 15,
        null,
        null,
        "center"
      );
  
      // Footer tagline
      doc.setFontSize(12);
      doc.text(
        "AuraFitness - Achieve Your Best Self!",
        105,
        doc.internal.pageSize.height - 10,
        null,
        null,
        "center"
      );
    }
  
    // Save the PDF
    doc.save(`${user.name}_details.pdf`);
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col text-gray-700 bg-black bg-opacity-70 shadow-none rounded-xl bg-clip-border p-8 w-full max-w-screen-lg">
        <h4 className="block font-sans text-5xl antialiased font-semibold leading-snug tracking-normal text-center text-white mb-2">
          User Details
        </h4>
        <p className="block mt-1 font-sans text-xl antialiased font-normal leading-relaxed text-center text-white mb-8">
          View user information in the Gym Management System
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-6">
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Name:</p>
            <p className="text-white">{user.name}</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Email:</p>
            <p className="text-white">{user.email}</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">User Type:</p>
            <p className="text-white">{user.userType}</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Mobile Number:</p>
            <p className="text-white">{user.mobile}</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Address:</p>
            <p className="text-white">{user.address}</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Height:</p>
            <p className="text-white">{user.height} cm</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Weight:</p>
            <p className="text-white">{user.weight} kg</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">BMI:</p>
            <p className="text-white">{userBMI} ({bmiCategory})</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Birthday:</p>
            <p className="text-white">{user.birthday}</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Age:</p>
            <p className="text-white">{age} years</p>
          </div>
          <div className="w-full md:w-[calc(50%-12px)]">
            <p className="text-white font-bold">Admin Status:</p>
            <p className="text-white">{user.isAdmin ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <Button
            onClick={handleBack}
            className="w-[calc(50%-6px)] rounded-lg bg-yellow-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
          >
            Back to Dashboard
          </Button>
          <Button
            onClick={downloadPDF}
            className="w-[calc(50%-6px)] rounded-lg bg-blue-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;