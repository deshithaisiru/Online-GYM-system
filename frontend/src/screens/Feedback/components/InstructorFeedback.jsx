import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const ReviewBlock = ({ feedback, onUpdate }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(feedback.ifDate);

  const stars = () => {
    const starElements = [];

    for (let i = 0; i < feedback.ifRate; i++) {
      starElements.push(
        <FontAwesomeIcon className="text-yellow-500 text-[1.25em]" key={i} icon={faStar} />
      );
    }
    for (let i = feedback.ifRate; i < 5; i++) {
      starElements.push(
        <FontAwesomeIcon className="text-zinc-500 text-[1.25em]" key={i} icon={faStar} />
      );
    }

    return starElements;
  };

  return (
    <div className='flex gap-2 flex-row-reverse items-center p-3 rounded-2xl bg-[#fffbd662]'>
      <div className='flex-1 rounded-full overflow-hidden flex items-center justify-center'>
        <FontAwesomeIcon className='text-[60px]' icon={faCircleUser} />
      </div>
      <div className='flex-[5]'>
        <p className='text-[.85em]'>{feedback.cusName}</p>
        <p className='text-[.85em]'>{feedback.ifNote}</p>
        <div className='flex gap-3 justify-end'>{stars()}</div>
        <p className='text-[.85em]'>{formattedDate}</p>
        <p className='text-[.85em]'>{formattedTime}</p>
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
  const [updatedNote, setUpdatedNote] = useState(feedback.ifNote);
  const [updatedRate, setUpdatedRate] = useState(feedback.ifRate);

  const handleUpdate = () => {
    const updatedFeedback = {
      ...feedback,
      ifNote: updatedNote,
      ifRate: updatedRate,
    };
    
    fetch('/api/update-instruct-feedback', {
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



const InstructorFeedback = ({ name }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    // Fetch feedback data from the API
    fetch('/api/instruct-feedbacks')
      .then(response => response.json())
      .then(data => {
        // Filter feedbacks where iName matches the provided name
        const filteredFeedbacks = data.response.filter(feedback => feedback.iName === name);
        setFeedbacks(filteredFeedbacks);
      })
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, [name]);

  const handleUpdateClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleUpdateFeedback = (updatedFeedback) => {
    setFeedbacks(feedbacks.map(f => (f._id === updatedFeedback._id ? updatedFeedback : f)));
  };

  return (
    <div className='flex gap-3 justify-center items-start p-10 w-[60vw] rounded-xl bg-[#c7c7c7c4]'>
      <div className="flex-1 flex flex-col gap-2">
        <div className='aspect-[4/5] rounded-xl overflow-hidden'>
          <img className='w-[125%] relative top-[-10%]' src="/images/instructor_placeholder.jpg" alt="instructor-profile" />
        </div>
        <p className='text-[1.35em] font-semibold capitalize text-amber-700'>{name}</p>
      </div>
      <div className='flex-[3] flex flex-col gap-3'>
        {/* Display filtered review blocks */}
        {feedbacks.length > 0 ? (
          feedbacks.map(feedback => (
            <ReviewBlock
              key={feedback._id}
              feedback={feedback}
              onUpdate={handleUpdateClick}
            />
          ))
        ) : (
          <p>No feedback available for this instructor.</p>
        )}
      </div>

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

export default InstructorFeedback;
