import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const ReviewBlock = ({ feedback, onUpdate }) => {
  const stars = () => {
    const starElements = [];

    for (let i = 0; i < feedback.pfRate; i++) {
      starElements.push(
        <FontAwesomeIcon className="text-yellow-500 text-[1.25em]" key={i} icon={faStar} />
      );
    }
    for (let i = feedback.pfRate; i < 5; i++) {
      starElements.push(
        <FontAwesomeIcon className="text-zinc-500 text-[1.25em]" key={i} icon={faStar} />
      );
    }

    return starElements;
  };

  return (
    <div className='flex w-4/5 p-3 odd:flex-row-reverse rounded-xl border-yellow-500 border hover:shadow-lg hover:shadow-slate-900 transition-all duration-500'>
      <div className='flex-1 rounded-full overflow-hidden flex items-center justify-center'>
        <FontAwesomeIcon className='text-[60px]' icon={faCircleUser} />
      </div>
      <div className='flex-[5]'>
        <p className='text-[.85em]'>{feedback.cusName}</p>
        <p className='text-[.85em] mt-1'>{feedback.pfNote}</p>
        <div className='flex gap-3 justify-start mt-3'>{stars()}</div>
        <button
          className='mt-2 text-blue-500 hover:underline'
          onClick={() => onUpdate(feedback)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

const FeedbackPopup = ({ feedback, onClose, onUpdateFeedback }) => {
  const [updatedNote, setUpdatedNote] = useState(feedback.pfNote);
  const [updatedRate, setUpdatedRate] = useState(feedback.pfRate);

  const handleUpdate = () => {
    const updatedFeedback = {
      ...feedback,
      pfNote: updatedNote,
      pfRate: updatedRate,
    };
    
    fetch('http://localhost:3001/api/update-package-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFeedback),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          onUpdateFeedback(updatedFeedback);
          onClose();
        } else {
          console.error('Update failed:', data.message);
        }
      })
      .catch(error => console.error('Error updating feedback:', error));
  };

  return (
    <div className='fixed inset-0 items-center justify-center bg-black bg-opacity-50 z-50' style={{ marginTop: '250px' }}>
    <div className='bg-white p-5 rounded-lg shadow-lg'>
      <h2 className='text-xl mb-3'>Update Feedback</h2>
      <textarea
        value={updatedNote}
        onChange={(e) => setUpdatedNote(e.target.value)}
        className='border p-2 w-full'
        rows='3'
      />
      <div className='flex gap-2 mt-2'>
        <span>Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={`cursor-pointer ${star <= updatedRate ? 'text-yellow-500' : 'text-yellow-300'}`} // Change text color to yellow for unselected stars
            onClick={() => setUpdatedRate(star)}
          />
        ))}
      </div>
      <div className='flex justify-end mt-4'>
        <button className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600' onClick={handleUpdate}>
          Update Changes
        </button>
        <button className='ml-2 bg-gray-300 px-3 py-1 rounded' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
};

const PackageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3001/api/package-feedbacks')
      .then(response => response.json())
      .then(data => {
        const filteredFeedbacks = data.response.filter(feedback => feedback.pName === 'platinum');
        setFeedbacks(filteredFeedbacks);
      })
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, []);

  const handleUpdateClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleUpdateFeedback = (updatedFeedback) => {
    setFeedbacks(feedbacks.map(f => (f._id === updatedFeedback._id ? updatedFeedback : f)));
  };

  return (
    <div className='flex flex-col gap-3 justify-center items-center p-10 w-[60vw] rounded-xl min-h-[25vh] bg-[#c7c7c7c4] relative'>
      <p className='uppercase text-[7.5em] font-semibold text-yellow-500 -z-10 absolute -top-3 left-5'>Platinum</p>

      {/* Display feedback blocks */}
      {feedbacks.length > 0 ? (
        feedbacks.map(feedback => (
          <ReviewBlock
            key={feedback._id}
            feedback={feedback}
            onUpdate={handleUpdateClick}
          />
        ))
      ) : (
        <p>No feedback available for Silver package.</p>
      )}

      {/* Show popup if selected feedback is not null */}
      {selectedFeedback && (
        <FeedbackPopup
          feedback={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
          onUpdateFeedback={handleUpdateFeedback}
        />
      )}
    </div>
  );
};

export default PackageFeedback;
