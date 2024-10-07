import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const SetRate = ({rate, handleRating}) => {

    return (
        <div className='flex gap-2 items-center my-3'>
            {Array.from({ length: 5 }, (_, index) => (
                <FontAwesomeIcon className={` ${ index < rate ? 'text-yellow-500' : 'text-zinc-500' } text-[1.35em] `} key={index} icon={faStar} onClick={() => handleRating(index)} />
            ))}
        </div>
    )
}
