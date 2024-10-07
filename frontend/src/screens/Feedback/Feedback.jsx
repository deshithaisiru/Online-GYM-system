import { React, useEffect } from 'react'

const Feedback = () => {

  useEffect(() => {
    document.title = `Feedbacks | AURA Fitness`;
  });

  return (
    <div className='flex w-screen h-screen bg-cover bg-center bg-no-repeat justify-center items-center' style={{ backgroundImage: 'url(./images/sven-mieke-jO6vBWX9h9Y-unsplash.jpg)' }}>
      <div className='flex justify-center flex-col gap-6 p-10 bg-[#c7c7c72c] rounded-2xl backdrop-blur-sm items-center'>
        <p className='text-yellow-500 uppercase tracking-wider font-bold text-[1.5em]' >Choose Feedback Type</p>
        <div className='flex flex-col gap-5 justify-center items-center p-10 rounded-xl bg-[#c7c7c7c4]'>
          <a className='w-[350px] text-center uppercase font-bold tracking-wider bg-yellow-500 py-2 rounded-lg hover:shadow-lg hover:shadow-stone-500 transition-all duration-300' href={`/feedback/create/`}>
            Add Feedback
          </a>
          <a className='w-[350px] text-center uppercase font-bold tracking-wider bg-yellow-500 py-2 rounded-lg hover:shadow-lg hover:shadow-stone-500 transition-all duration-300'  href={`/feedback/${'packages'}`}>
            See Package Feedbacks
          </a>
          <a className='w-[350px] text-center uppercase font-bold tracking-wider bg-yellow-500 py-2 rounded-lg hover:shadow-lg hover:shadow-stone-500 transition-all duration-300'  href={`/feedback/${'instructors'}`}>
            See Instructor Feedbacks
          </a>
        </div>
      </div>
    </div>
  )
}

export default Feedback