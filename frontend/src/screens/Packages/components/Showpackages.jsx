import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Packages = () => {
  const [enrolledPackages, setEnrolledPackages] = useState([]); // Handle multiple packages
  const { userInfo } = useSelector((state) => state.auth); // Access user info from Redux store

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/packages/user/${userInfo._id}`); // Adjust endpoint as needed
        const data = await response.json();

        if (response.ok) {
          setEnrolledPackages(data); // Expecting an array of packages
        } else {
          console.error('Error fetching packages:', data.message);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    if (userInfo) {
      fetchPackages();
    }
  }, [userInfo]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Enrolled Packages</h1>
      {enrolledPackages.length > 0 ? (
        enrolledPackages.map((pkg) => (
          <div key={pkg._id} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold">Package Name: {pkg.packname}</h2>
            <p className="mt-2">Package Price: ${pkg.price}</p>
            <p className="mt-2">Start Date: {new Date(pkg.startDate).toLocaleDateString()}</p>
            <p className="mt-2">Validity Date: {pkg.validity} days</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">You are not enrolled in any packages.</p>
      )}
    </div>
  );
};

export default Packages;
