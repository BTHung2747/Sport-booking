import React, { useState, useRef } from 'react';
import { Sparkles, Trophy, MapPin as MapPinIcon, Clock } from 'lucide-react';
import { MOCK_FIELDS } from '../data/mockData';
import StatCard from '../components/Home/StatCard';
import FieldCard from '../components/Home/FieldCard';
import EmptyState from '../components/Home/EmptyState';
import SearchBar from '../components/Home/SearchBar';
import HomeFooter from '../components/Home/HomeFooter';
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const searchSectionRef = useRef(null);
  
  const scrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = () => {
    
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredFields = MOCK_FIELDS.filter(f => {
    const matchesText = searchText === '' || 
      f.name.toLowerCase().includes(searchText.toLowerCase()) ||
      f.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === 'All' || f.type === typeFilter;
    const matchesLocation = locationFilter === 'All' || f.location.includes(locationFilter);
    return matchesText && matchesType && matchesLocation;
  });

  const sportTypes = [...new Set(MOCK_FIELDS.map(f => f.type))];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4 animate-fade-in-up">
            <Sparkles size={24} className="text-yellow-300" />
            <span className="label-text">Hệ thống đặt sân thể thao</span>
          </div>
          
          <h1 className="heading-1 mb-6 max-w-3xl animate-fade-in-up">
            Đặt sân thể thao
            <br />
            <span className="text-yellow-300">nhanh chóng & tiện lợi</span>
          </h1>
          
          <p className="body-large mb-8 max-w-2xl text-blue-100 animate-fade-in-up">
            Tìm và đặt sân bóng đá, tennis, cầu lông với giá tốt nhất. 
            Hàng trăm sân chất lượng đang chờ bạn khám phá.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in-up">
            <button  onClick={scrollToSearch} className="btn bg-white text-blue-600 hover:bg-blue-50 text-base px-8 py-3">
              Khám phá ngay
            </button>
            <button className="btn bg-blue-600/50 backdrop-blur-sm text-white hover:bg-blue-600/70 text-base px-8 py-3 border border-white/20">
              Xem hướng dẫn
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-12 mb-16 relative z-20">
          <StatCard 
            icon={MapPinIcon}
            value={MOCK_FIELDS.length}
            label="Sân thể thao"
            gradient="gradient-primary"
          />
          <StatCard 
            icon={Trophy}
            value={sportTypes.length}
            label="Môn thể thao"
            gradient="gradient-success"
          />
          <StatCard 
            icon={Clock}
            value="24/7"
            label="Hỗ trợ đặt sân"
            gradient="gradient-warm"
          />
        </section>

        {/* Search & Filter Section */}
        <section className="mb-12" ref={searchSectionRef}>
          <div className="mb-6">
            <h2 className="heading-4 text-gray-900 mb-2">Khám phá theo môn thể thao</h2>
            <p className="body-small text-gray-500">Tìm kiếm và lọc theo sở thích của bạn</p>
          </div>

          <SearchBar 
            searchText={searchText}
            setSearchText={setSearchText}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            onSearch={handleSearch}
          />

          {/* Active Filters Display */}
          {(searchText || typeFilter !== 'All' || locationFilter !== 'All' || timeFilter !== 'All') && (
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="body-small text-gray-700 font-semibold">Đang lọc:</span>
                {searchText && (
                  <span className="badge bg-white text-blue-700 border border-blue-200 shadow-sm">
                    Tìm kiếm: "{searchText}"
                  </span>
                )}
                {typeFilter !== 'All' && (
                  <span className="badge bg-white text-blue-700 border border-blue-200 shadow-sm">
                    Môn: {typeFilter}
                  </span>
                )}
                {locationFilter !== 'All' && (
                  <span className="badge bg-white text-blue-700 border border-blue-200 shadow-sm">
                    Khu vực: {locationFilter}
                  </span>
                )}
                {timeFilter !== 'All' && (
                  <span className="badge bg-white text-blue-700 border border-blue-200 shadow-sm">
                    Thời gian: {timeFilter}
                  </span>
                )}
                <button 
                  onClick={() => { 
                    setSearchText('');
                    setTypeFilter('All'); 
                    setLocationFilter('All');
                    setTimeFilter('All');
                  }}
                  className="body-small text-blue-600 hover:text-blue-800 font-semibold ml-2 hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="heading-4 text-gray-900">
              {filteredFields.length > 0 ? 'Sân thể thao phù hợp' : 'Kết quả tìm kiếm'}
            </h2>
            <p className="body-small text-gray-500 mt-1">
              {filteredFields.length > 0 
                ? `Tìm thấy ${filteredFields.length} sân thể thao`
                : 'Không có kết quả phù hợp'
              }
            </p>
          </div>
          
          {filteredFields.length > 0 && (
            <select className="px-4 py-2 border border-gray-300 rounded-lg body-small focus:outline-none focus:border-blue-500">
              <option>Sắp xếp: Mặc định</option>
              <option>Giá: Thấp đến cao</option>
              <option>Giá: Cao đến thấp</option>
              <option>Đánh giá cao nhất</option>
            </select>
          )}
        </div>

      
        <section className="pb-16">
          {filteredFields.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> 
              {filteredFields.map(field => (
                <FieldCard key={field.id} field={field} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
      <HomeFooter />
    </div>
  );
};

export default Home;
