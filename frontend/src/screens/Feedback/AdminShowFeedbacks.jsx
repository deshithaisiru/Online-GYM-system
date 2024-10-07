import { React, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ShowFeedbacksTable } from './components/ShowFeedbacksTable';
import { ShowFeedbacksInstructTable } from './components/ShowFeedbacksInstructTable';

const AdminShowFeedbacks = () => {

  const { type } = useParams();

  useEffect(() => {
    document.title = `Show Feedback ${type} | AURA Fitness | Admin`;
  }, [type]);

  const bgImageURL = type === 'instructors'
    ? '/images/2137499-1920x1080-desktop-1080p-gym-motivation-wallpaper.jpg'
    : '/images/wp12384140.jpg' 
  ;

  return (
    <div className='flex w-screen h-screen bg-cover bg-center bg-no-repeat justify-center items-center' style={{ backgroundImage: `url(${bgImageURL})` }}>
        {type === 'packages' ? (
          <ShowFeedbacksTable reviewType={type} />
        ) : (
          <ShowFeedbacksInstructTable reviewType={type} />
        )}
      </div>

  )
}

export default AdminShowFeedbacks