import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { IconBallFootball } from '@tabler/icons-react';

const SearchBar = ({ 
  searchText,
  setSearchText,
  typeFilter, 
  setTypeFilter, 
  locationFilter, 
  setLocationFilter,
  timeFilter,
  setTimeFilter,
  onSearch 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      {/* Layout Grid:
         - Mobile (mặc định): 1 cột (xếp dọc)
         - Tablet (md): 2 cột 
         - Desktop (lg): 12 cột (xếp ngang)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        
        {/* 1. Ô Tìm kiếm (Chiếm 3/12 trên Desktop) */}
        <div className="lg:col-span-3">
          <label className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <Search size={14} className="text-blue-500" />
            Tìm kiếm
          </label>
          <input 
            type="text" 
            placeholder="Tên sân, địa điểm..." 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700 placeholder-gray-400"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>

        {/* 2. Môn thể thao (Chiếm 2/12 trên Desktop) */}
        <div className="lg:col-span-2">
          <label className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <IconBallFootball size={14} className="text-orange-500" />
            Môn thi đấu
          </label>
          <div className="relative">
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer font-medium text-gray-700"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">Tất cả</option>
              <option value="Bóng đá">Bóng đá</option>
              <option value="Tennis">Tennis</option>
              <option value="Cầu lông">Cầu lông</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* 3. Khu vực (Chiếm 2/12 trên Desktop) */}
        <div className="lg:col-span-2">
          <label className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <MapPin size={14} className="text-red-500" />
            Khu vực
          </label>
          <div className="relative">
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer font-medium text-gray-700"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">Toàn thành phố</option>
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 2">Quận 2</option>
              <option value="Quận 7">Quận 7</option>
              <option value="Bình Thạnh">Bình Thạnh</option>
              <option value="Thủ Đức">Thủ Đức</option>
              {/* Thêm các quận khác */}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* 4. Thời gian (Chiếm 3/12 trên Desktop) */}
        <div className="lg:col-span-3">
          <label className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <Calendar size={14} className="text-pink-500" />
            Thời gian
          </label>
          <div className="relative">
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer font-medium text-gray-700"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="All">Bất kỳ lúc nào</option>
              <option value="morning">Sáng (6:00 - 12:00)</option>
              <option value="afternoon">Chiều (12:00 - 18:00)</option>
              <option value="evening">Tối (18:00 - 22:00)</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* 5. Nút Bấm (Chiếm 2/12 trên Desktop - Nổi bật nhất) */}
        <div className="lg:col-span-2 flex items-end">
          <button 
            onClick={onSearch}
            className="w-full h-[48px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search size={20} />
            <span>Tìm sân</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchBar;