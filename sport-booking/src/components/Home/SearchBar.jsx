import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { IconBallFootball } from '@tabler/icons-react';

const SearchBar = ({ 
  typeFilter, 
  setTypeFilter, 
  locationFilter, 
  setLocationFilter,
  timeFilter,
  setTimeFilter,
  onSearch 
}) => {
  return (
    <div className="w-full h-[100px] bg-white rounded-[16px] shadow-xl flex items-center p-4">
      <div className="flex-1 flex items-center gap-3 border-r border-gray-200 px-6">
        <IconBallFootball className="text-2xl text-red-500 flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <span className="text-xs text-gray-500 mb-1">Môn thể thao</span>
          <select 
            className="w-full bg-transparent outline-none text-gray-800 font-medium cursor-pointer appearance-none"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">Tất cả</option>
            <option value="Bóng đá">Bóng đá</option>
            <option value="Tennis">Tennis</option>
            <option value="Cầu lông">Cầu lông</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex items-center gap-3 border-r border-gray-200 px-6">
        <MapPin className="text-2xl text-orange-500 flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <span className="text-xs text-gray-500 mb-1">Khu vực</span>
          <input 
            type="text" 
            placeholder="Quận/Huyện, Thành phố" 
            className="w-full bg-transparent outline-none text-gray-800 font-medium placeholder-gray-400"
            value={locationFilter === 'All' ? '' : locationFilter}
            onChange={(e) => setLocationFilter(e.target.value || 'All')}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center gap-3 px-6">
        <Calendar className="text-2xl text-purple-500 flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <span className="text-xs text-gray-500 mb-1">Thời gian</span>
          <input 
            type={timeFilter === 'All' ? 'text' : 'datetime-local'}
            placeholder="Chọn ngày giờ"
            className="w-full bg-transparent outline-none text-gray-800 font-medium cursor-pointer placeholder-gray-800"
            value={timeFilter === 'All' ? '' : timeFilter}
            onChange={(e) => setTimeFilter(e.target.value || 'All')}
            onFocus={(e) => e.target.type = 'datetime-local'}
            onBlur={(e) => {
              if (!e.target.value) {
                e.target.type = 'text';
                setTimeFilter('All');
              }
            }}
          />
        </div>
      </div>

      <button 
        onClick={onSearch}
        className="w-[140px] h-[56px] rounded-[12px] bg-gradient-to-r from-[#E91E63] to-[#EC407A] text-white font-bold text-base ml-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
      >
        <Search size={18} />
        <span>Tìm ngay</span>
      </button>
    </div>
  );
};

export default SearchBar;