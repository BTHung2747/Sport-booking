import React from 'react';

const SportCategoryCard = ({ icon, name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex flex-col items-center justify-center gap-4
        w-[160px] h-[160px]
        bg-[#F3F4F6] rounded-[16px]
        border-2 border-transparent
        cursor-pointer select-none
        transition-all duration-200
        hover:border-[#FF6E40] hover:shadow-md hover:bg-white
        focus:outline-none focus:border-[#FF6E40]
        group
      "
    >
      {/* Icon */}
      <div className="flex items-center justify-center text-[#1F2937] transition-colors duration-200 group-hover:text-[#FF6E40]">
        {icon}
      </div>

      {/* Sport name */}
      <span
        className="text-base text-[#1F2937] text-center leading-tight transition-colors duration-200 group-hover:text-[#FF6E40]"
        style={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
      >
        {name}
      </span>
    </button>
  );
};

export default SportCategoryCard;