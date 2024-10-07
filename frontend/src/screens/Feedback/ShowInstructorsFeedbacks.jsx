import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import InstructorFeedback from './components/InstructorFeedback';

const instructors = [
  'Alex Johnson',
  'Mia Torres',
  'Ryan Smith',
  'Jessica Lee',
  'David Kim',
  'Emily Garcia',
  'Chris Patel',
  'Sarah Brown',
  'Mark Wilson',
  'Olivia Martinez',
  'Daniel Nguyen',
  'Sophie Davis'
];

const ShowInstructorsFeedbacks = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = `Instructor Feedbacks | AURA Fitness`;
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered instructors to display the searched name at the top
  const sortedInstructors = [
    ...filteredInstructors.filter((instructor) => instructor.toLowerCase() === searchTerm.toLowerCase()),
    ...filteredInstructors.filter((instructor) => instructor.toLowerCase() !== searchTerm.toLowerCase())
  ];

  return (
    <div className='flex w-full min-h-screen bg-cover bg-center bg-fixed bg-no-repeat justify-center items-center' style={{ backgroundImage: 'url(/images/sven-mieke-jO6vBWX9h9Y-unsplash.jpg)' }}>
      <div className='flex justify-center flex-col gap-6 p-10 bg-[#c7c7c72c] rounded-2xl backdrop-blur-sm items-center'>
        <SearchBar placeholder='Search for your Instructor ..' onInput={handleSearch} />
        <div className='flex justify-center flex-col gap-3'>
          {sortedInstructors.length > 0 ? (
            sortedInstructors.map((instructor, index) => (
              <InstructorFeedback key={index} name={instructor} />
            ))
          ) : (
            <p>No instructors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowInstructorsFeedbacks;
