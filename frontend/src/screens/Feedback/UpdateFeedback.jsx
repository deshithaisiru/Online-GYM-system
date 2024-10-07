import React, { useEffect } from 'react'
import UpdateFeedbackForm from "./components/UpdateFeedbackForm";

const UpdateFeedback = () => {

  useEffect(() => {
    document.title = `Edit Feedbacks | AURA Fitness`;
  });

  return (
    <div className='flex w-screen h-screen bg-cover bg-center bg-no-repeat justify-center items-center' style={{ backgroundImage: 'url(/images/sven-mieke-jO6vBWX9h9Y-unsplash.jpg)' }}>
      <div className='flex justify-center flex-col gap-6 p-10 bg-[#c7c7c72c] rounded-2xl backdrop-blur-sm items-center'>
      <p className='text-yellow-500 uppercase tracking-wider font-bold text-[1.5em]' >Update Your Feedback</p>
      <div className='flex flex-col gap-5 justify-center items-center p-10 rounded-xl bg-[#c7c7c7c4]'>
        <UpdateFeedbackForm />
      </div>
      </div>
    </div>
  )
}

export default UpdateFeedback