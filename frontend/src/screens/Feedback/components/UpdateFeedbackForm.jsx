import { React, useEffect, useState } from 'react'
import { SetRate } from './SetRate';

const UpdateFeedbackForm = () => {

  const [rate, setRate] = useState(0);

  const inputRating = (newRate) => {
    setRate(newRate + 1);
  }

  return (
    <div>
      <form className='flex flex-col gap-2 items-center w-[30vw]' action="" method="post">
        <div className='w-full flex items-center justify-center relative'>
          <SetRate rate={rate} handleRating={inputRating} />
        </div>
        <div className='w-full flex items-center relative'>
          <textarea className='w-full outline-none hover:shadow-md hover:shadow-zinc-900 hover:outline-none border-none py-1 px-3 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500' name="user_feedback" id="user_feedback" rows={5}></textarea>
        </div>
        <div className='w-full pt-3 flex items-center justify-center gap-4 relative'>
          <button className='flex items-center justify-center py-2 uppercase font-semibold px-10 rounded-xl bg-yellow-500 hover:shadow-md hover:shadow-zinc-900 hover:outline-none transition-all duration-500' type="reset">Cancel</button>
          <button className='flex items-center justify-center py-2 uppercase font-semibold px-10 rounded-xl bg-yellow-500 hover:shadow-md hover:shadow-zinc-900 hover:outline-none transition-all duration-500' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateFeedbackForm