import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import CreateFeedbackForm from './components/CreateFeedbackForm';

const CreateFeedback = () => {
  const { type } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo); // Access userInfo from Redux state

  // Check if userInfo is available and set the name and email
  const fullName = userInfo ? userInfo.name : '';
  const email = userInfo ? userInfo.email : '';

  useEffect(() => {
    document.title = `Create Feedback for ${type} | AURA Fitness`;
  }, [type]);

  const bgImageURL =
    type === 'instructors'
      ? '/images/2137499-1920x1080-desktop-1080p-gym-motivation-wallpaper.jpg'
      : '/images/wp12384140.jpg';

  return (
    <div
      className='flex w-screen h-screen bg-cover bg-center bg-no-repeat justify-center items-center'
      style={{ backgroundImage: `url(${bgImageURL})` }}
    >
      <div className='flex justify-center flex-col gap-6 p-10 bg-[#c7c7c72c] rounded-2xl backdrop-blur-sm items-center'>
        <p className='text-yellow-500 uppercase tracking-wider font-bold text-[1.25em]'>
          Give Your Feedback . . .
        </p>
        <div className='flex flex-col gap-5 justify-center items-center p-10 rounded-xl bg-[#c7c7c7c4]'>
          <CreateFeedbackForm fullName={fullName} email={email} /> {/* Pass the name and email to the feedback form */}
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
