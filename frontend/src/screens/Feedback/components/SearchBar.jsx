import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ placeholder, onInput }) => {
  const handleChange = (event) => {
    onInput(event.target.value);
  };

  return (
    <div className='flex items-center relative w-1/2'>
      <input
        className='outline-0 border-0 w-full bg-[#c7c7c7c4] py-1 text-[1em] px-3 pr-12 rounded-lg focus:shadow-xl focus:shadow-zinc-900 hover:shadow-zinc-900 hover:shadow-md transition-all duration-500'
        type="text"
        placeholder={placeholder}
        onChange={handleChange} // Call the function on input change
      />
      <span className='px-3 py-1 hover:bg-amber-500 hover:text-zinc-100 border-l border-l-amber-500 text-amber-500 text-[1em] rounded-tr-lg rounded-br-lg absolute right-0 transition-all duration-500 cursor-pointer'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
    </div>
  );
};

export default SearchBar;
