import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const ShowPackagesFeedbacks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [packages, setPackages] = useState([]); // To store unique package names
  const [selectedPackage, setSelectedPackage] = useState(''); // To track selected package

  useEffect(() => {
    document.title = `Packages Feedbacks | AURA Fitness`;

    // Fetch all feedbacks
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/api/package-feedbacks');
        setFeedbacks(response.data.response);

        // Extract unique package names from feedbacks
        const uniquePackages = [...new Set(response.data.response.map(feedback => feedback.pName))];
        setPackages(uniquePackages);
        
        // Log unique packages for debugging
        console.log('Unique Packages:', uniquePackages);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
  };

  // Filter feedbacks based on the selected package and search term
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const isPackageMatch = selectedPackage ? feedback.pName === selectedPackage : true;
    const isSearchMatch = 
      feedback.pName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      feedback.pfNote.toLowerCase().includes(searchTerm.toLowerCase());

    // Debugging logs to check values
    console.log('Filtering Feedbacks:');
    console.log(`Feedback Package: ${feedback.pName}, Selected Package: ${selectedPackage}, Search Term: ${searchTerm}`);
    console.log(`Package Match: ${isPackageMatch}, Search Match: ${isSearchMatch}`);

    return isPackageMatch && isSearchMatch;
  });

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
      );
    }
    return <div className='flex'>{stars}</div>;
  };

  return (
    <div className='flex w-full min-h-screen bg-gray-100 justify-center items-center'>
      <div className='flex flex-col gap-6 p-10 bg-white rounded-3xl shadow-lg max-w-3xl w-full'>
        <h1 className='text-2xl font-bold text-gray-800 text-center'>Packages Feedbacks</h1>
        <SearchBar placeholder='Search for your Package ..' onInput={handleSearch} />
        
        {/* Dropdown for package selection */}
        <select
          value={selectedPackage}
          onChange={handlePackageChange}
          className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
        >
          <option value=''>All Packages</option>
          {packages.map(packageName => (
            <option key={packageName} value={packageName}>{packageName}</option>
          ))}
        </select>

        <div className='grid grid-cols-1 gap-4 w-full'>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map(feedback => (
              <div key={feedback.pfID} className='p-6 bg-white shadow-lg rounded-lg transition transform hover:scale-105'>
                <h3 className='text-lg font-semibold text-blue-700'>{feedback.pName} Package Feedback</h3>
                <div className='mt-4'>
                  <p className='text-gray-800'><strong>Customer:</strong> {feedback.cusName}</p>
                  <p className='text-gray-800'><strong>Rating:</strong> {renderStars(feedback.pfRate)}</p>
                  <p className='text-gray-800'><strong>Note:</strong> {feedback.pfNote}</p>
                  <p className='text-gray-800'><strong>Date:</strong> {new Date(feedback.pfDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-600 text-center'>No feedback available for this package.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPackagesFeedbacks;
