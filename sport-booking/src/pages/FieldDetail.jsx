import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_FIELDS, TIME_SLOTS } from '../data/mockData';
import { Star, MapPin, Clock, Heart, Share2, Calendar, Check, Users, Phone, MessageCircle, Wifi, Coffee, Car, Shield } from 'lucide-react';
import { IconBallFootball, IconBallTennis } from '@tabler/icons-react';
import { GiShuttlecock } from 'react-icons/gi';
import HomeFooter from '../components/Home/HomeFooter';

const getSportIcon = (type) => {
  switch (type) {
    case 'Bóng đá': return <IconBallFootball size={20} />;
    case 'Tennis': return <IconBallTennis size={20} />;
    case 'Cầu lông': return <GiShuttlecock size={20} />;
    default: return null;
  }
};

const getSportColor = (type) => {
  switch (type) {
    case 'Bóng đá': return 'from-green-500 to-emerald-600';
    case 'Tennis': return 'from-yellow-500 to-orange-600';
    case 'Cầu lông': return 'from-blue-500 to-indigo-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

const FieldDetail = ({ onBook, bookings = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ép cuộn lên đầu trang mỗi khi vào chi tiết sân
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const field = MOCK_FIELDS.find(f => f.id === parseInt(id));
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Check if slot is booked based on bookings data
  const isSlotBooked = (selectedDate, timeSlot) => {
    return bookings.some(booking => 
      booking.fieldId === field.id &&
      booking.date === selectedDate && 
      booking.slot === timeSlot &&
      booking.status !== 'Đã hủy'
    );
  };

  if (!field) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-6xl mb-4">🏟️</div>
        <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy sân!</h2>
      </div>
    </div>
  );

  const handleBooking = () => {
    if (!date || !slot) return alert("Vui lòng chọn đầy đủ ngày và giờ!");
    
    // Check if already booked
    if (isSlotBooked(date, slot)) {
      return alert("Khung giờ này đã được đặt!");
    }
    
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newBooking = {
      id: uniqueId, 
      fieldId: field.id, 
      fieldName: field.name, 
      location: field.location, 
      image: field.image,
      date, 
      slot, 
      price: field.price, 
      status: 'Chờ xác nhận'
    };
    
    if (onBook(newBooking)) {
      alert("Đặt sân thành công!");
      setSlot(''); // Clear selection
      navigate('/history');
    }
  };

  const galleryImages = Array(5).fill(field.image);
  const getNext14Days = () => {
    const days = [], today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date, day: date.getDate(),
        dayName: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
        isToday: i === 0, isHot: i % 3 === 0
      });
    }
    return days;
  };
  const dates = getNext14Days();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[62%] relative rounded-lg overflow-hidden h-[450px]">
            <img 
              src={galleryImages[selectedImage]} 
              alt={field.name} 
              className="w-full h-full object-cover" 
            />
            
            <div className="absolute top-4 left-4 bg-[#cddc39] text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-sm">
              <Star size={14} className="fill-white" />
              Top Rated
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition">
                <Share2 size={18} />
              </button>
              <button onClick={() => setIsWishlisted(!isWishlisted)} className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition">
                <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
              </button>
              <button className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-md text-sm font-medium">
              1 / 24 ảnh
            </div>
          </div>
          <div className="w-full lg:w-[38%] flex flex-col justify-start">
            
            <h1 className="text-[32px] font-black text-gray-900 mb-2">{field.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} size={16} className={star <= Math.floor(field.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="font-bold text-gray-800 text-sm">{field.rating}</span>
              <span className="text-gray-500 text-sm">(120 đánh giá)</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3 mb-6">
              <MapPin size={20} className="text-red-400 shrink-0 mt-0.5" />
              <span className="text-gray-600 text-sm leading-relaxed">{field.location}</span>
            </div>

            <div className="mb-3">
              <span className="text-4xl font-bold text-[#ff4757]">
                {field.price.toLocaleString()}đ
              </span>
              <span className="text-gray-500 font-medium ml-1">/giờ</span>
            </div>

            <div className="bg-red-50 text-red-500 px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 w-fit mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Giá tốt nhất hôm nay
            </div>

            <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 w-fit mb-6 border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Đang hoạt động
            </div>

            <div className="bg-blue-50/80 rounded-xl p-3 flex items-center gap-2 mb-6 border border-blue-100/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              <span className="text-blue-600 text-sm font-semibold">Đã đặt 234 lần tuần này</span>
            </div>

            <button 
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-gradient-to-r from-[#D81B60] to-[#FF6E40] text-white font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-opacity mb-4"
            >
              Đặt sân ngay
            </button>

            <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Xác nhận tức thì
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Phản hồi &lt; 10 phút
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'overview', label: 'Tổng quan', icon: Star },
              { id: 'booking', label: 'Lịch đặt', icon: Calendar },
              { id: 'amenities', label: 'Tiện ích', icon: Coffee }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-2 font-semibold text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.id ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'
                }`}>
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section id="overview" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">Giới thiệu</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  Sân {field.type.toLowerCase()} {field.name} là một trong những sân thể thao hiện đại và chất lượng nhất tại {field.location}, TP.HCM. 
                  Với mặt cỏ nhân tạo cao cấp, hệ thống chiếu sáng chuyên nghiệp và đầy đủ tiện nghi, 
                  {field.name} là lựa chọn lý tưởng cho các trận đấu của bạn.
                </p>
                <p>
                  Sân có kích thước tiêu chuẩn 40×70m, phù hợp cho các trận {field.type.toLowerCase()} 7-11 người. Hệ thống thoát 
                  nước hiệu quả giúp sân luôn khô ráo ngay cả sau mưa. Đội ngũ nhân viên chuyên nghiệp, nhiệt 
                  tình luôn sẵn sàng hỗ trợ.
                </p>
                <p>
                  Chúng tôi cam kết mang đến trải nghiệm tốt nhất với dịch vụ chuyên nghiệp, cơ sở vật chất hiện 
                  đại và mức giá cạnh tranh. Hãy đến và trải nghiệm sự khác biệt tại {field.name}!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  'Mặt cỏ nhân tạo cao cấp thế hệ mới',
                  'Hệ thống đèn chiếu sáng chuẩn FIFA',
                  'Phòng thay đồ rộng rãi, máy lạnh',
                  'Bãi đỗ xe miễn phí cho khách hàng',
                  'Căn-tin phục vụ đồ ăn, nước uống',
                  'Camera an ninh 24/7',
                  'Hệ thống thoát nước hiện đại',
                  'Nhân viên chuyên nghiệp, nhiệt tình'
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-gray-800 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Booking */}
            <section id="booking-section" className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-black text-slate-800 mb-8">Đặt lịch sân</h2>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Chọn ngày</h3>
                <div className="flex gap-3 overflow-x-auto pb-4">
                  {dates.map((day, idx) => (
                    <button key={idx} onClick={() => setDate(day.date.toISOString().split('T')[0])}
                      className={`flex-shrink-0 w-24 p-4 rounded-2xl border-2 transition-all duration-300 ${
                        date === day.date.toISOString().split('T')[0]
                          ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white border-transparent  shadow-xl'
                          : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-md'
                      }`}>
                      <div className="text-center">
                        <p className={`text-xs font-medium mb-1 ${date === day.date.toISOString().split('T')[0] ? 'text-white/80' : 'text-gray-500'}`}>
                          {day.dayName}
                        </p>
                        <p className={`text-2xl font-bold ${date === day.date.toISOString().split('T')[0] ? 'text-white' : 'text-slate-800'}`}>
                          {day.day}
                        </p>
                        {day.isToday && <span className={`text-[10px] font-bold ${date === day.date.toISOString().split('T')[0] ? 'text-white' : 'text-orange-500'}`}>Hôm nay</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Chọn khung giờ</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {TIME_SLOTS.map(timeSlot => {
                    const isSelected = slot === timeSlot;
                    const isBooked = date && isSlotBooked(date, timeSlot);
                    
                    return (
                      <button 
                        key={timeSlot} 
                        onClick={() => !isBooked && setSlot(timeSlot)}
                        disabled={isBooked}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-orange-500 bg-red-50 shadow-lg'
                            : isBooked
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-200 bg-white hover:border-orange-500 hover:shadow-md hover:-translate-y-1'
                        }`}
                      >
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {timeSlot}
                        </p>
                        <p className={`text-xl font-bold mb-3 ${
                          isBooked ? 'text-orange-400' : 'text-orange-500'
                        }`}>
                          {field.price.toLocaleString()}đ
                        </p>
                        <div className="flex items-center justify-between">
                          {/* Left: Status Badge */}
                          {!isBooked && !isSelected && (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                              Còn trống
                            </span>
                          )}
                          {isBooked && (
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                              Đã đặt
                            </span>
                          )}
                          {isSelected && (
                            <span className="text-xs font-semibold text-white bg-orange-500 px-2.5 py-1 rounded-md">
                              Đã chọn
                            </span>
                          )}
                          {!isBooked && !isSelected && (
                            <span className="text-xs font-semibold text-orange-500">
                              Chọn
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
                            <Check size={12} className="text-white" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {date && slot && (
                <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl border-2 border-orange-200">
                  <h4 className="font-bold text-slate-800 mb-4">Thông tin đặt sân</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between"><span className="text-gray-600">Ngày:</span><span className="font-semibold">{date}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Giờ:</span><span className="font-semibold">{slot}</span></div>
                    <div className="flex justify-between text-lg pt-3 border-t border-orange-200">
                      <span className="font-bold">Tổng tiền:</span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">
                        {field.price.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                  <button onClick={handleBooking}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">
                    Xác nhận đặt sân
                  </button>
                </div>
              )}
            </section>

            {/* Pricing Table Section */}
            <section id="pricing" className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden">
              <h2 className="text-3xl font-black text-slate-800 mb-2">Bảng giá chi tiết</h2>
              
              <div className="mb-6 bg-gradient-to-r from-orange-100 to-rose-100 border-2 border-orange-300 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-orange-700">Ưu đãi đặc biệt!</p>
                    <p className="text-sm text-orange-600">Giảm 20% cho đặt trước 1 tuần</p>
                  </div>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">23:45:12</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border-2 border-gray-200">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-pink-50 to-rose-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Khung giờ</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Giá thường (T2-T6)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Giá cuối tuần (T7-CN)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: '6:00 - 9:00', weekday: '250.000', weekend: '300.000' },
                      { time: '9:00 - 12:00', weekday: '300.000', weekend: '350.000' },
                      { time: '14:00 - 17:00', weekday: '300.000', weekend: '350.000' },
                      { time: '17:00 - 22:00', weekday: '400.000', weekend: '450.000' }
                    ].map((row, idx) => (
                      <tr key={idx} className="group border-t border-gray-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all cursor-pointer">
                        <td className="px-6 py-4 font-medium text-gray-800 group-hover:pl-8 transition-all border-l-4 border-transparent group-hover:border-orange-500">
                          {row.time}
                        </td>
                        <td className="px-6 py-4 font-bold text-orange-600 relative group/price">
                          {row.weekday}đ
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover/price:block bg-gray-900 text-white text-xs rounded-lg p-3 w-48 shadow-xl z-10">
                            <div className="space-y-1">
                              <div className="flex justify-between"><span>Giá sân:</span><span>230.000đ</span></div>
                              <div className="flex justify-between"><span>Thuế VAT:</span><span>20.000đ</span></div>
                              <div className="flex justify-between font-bold border-t border-gray-700 pt-1"><span>Tổng:</span><span>{row.weekday}đ</span></div>
                            </div>
                            <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-rose-600">{row.weekend}đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center">
                <button className="group px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:animate-bounce">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Tải bảng giá PDF</span>
                </button>
              </div>
            </section>

            {/* Amenities & Services - Simplified Cards */}
            <section id="amenities" className="space-y-6">
              <h2 className="text-3xl font-black text-slate-800">Tiện ích & Dịch vụ</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { 
                    icon: Wifi, 
                    label: 'WiFi miễn phí', 
                    description: 'Kết nối internet tốc độ cao',
                    badge: 'Tốc độ cao',
                    badgeColor: 'bg-green-500'
                  },
                  { 
                    icon: Car, 
                    label: 'Bãi đỗ xe', 
                    description: 'Chỗ đậu xe rộng rãi, an toàn',
                    badge: 'Miễn phí',
                    badgeColor: 'bg-green-500'
                  },
                  { 
                    icon: Coffee, 
                    label: 'Căn-tin', 
                    description: 'Đồ ăn, nước uống tiện lợi',
                    badge: null
                  },
                  { 
                    icon: Users, 
                    label: 'Phòng thay đồ', 
                    description: 'Phòng thay đồ sạch sẽ, hiện đại',
                    badge: 'Mới',
                    badgeColor: 'bg-blue-500'
                  },
                  { 
                    icon: Shield, 
                    label: 'Cho thuê đồ', 
                    description: 'Bóng, giày, áo tập',
                    badge: null
                  },
                  { 
                    icon: Check, 
                    label: 'Tủ an toàn', 
                    description: 'Tủ cá nhân có khóa an toàn',
                    badge: null
                  }
                ].map((amenity, idx) => (
                  <div 
                    key={idx}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
                  >
                    {/* Badge (Nếu có) */}
                    {amenity.badge && (
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 text-[10px] font-bold text-white rounded-full ${amenity.badgeColor}`}>
                          {amenity.badge}
                        </span>
                      </div>
                    )}

                    {/* Icon Box */}
                    <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      <amenity.icon size={28} />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{amenity.label}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Contact Design */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-black text-slate-800 mb-6">Thông tin liên hệ</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                    <p className="text-base font-bold text-red-600">0909 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-800">contact@k34football.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Clock size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Giờ mở cửa</p>
                    <p className="text-sm font-semibold text-gray-800">06:00 - 22:00 (Hàng ngày)</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-green-600 font-semibold">Đang mở cửa</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                    <p className="text-sm font-semibold text-gray-800">{field.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Phone size={20} />
                  <span>Gọi ngay</span>
                </button>
                <button className="w-full py-4 border-2 border-orange-500 text-orange-600 font-bold text-base rounded-xl hover:bg-orange-50 hover:shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  <span>Nhắn tin</span>
                </button>
              </div>

              <div className="relative h-48 bg-gradient-to-br from-slate-100 to-stone-100 rounded-2xl overflow-hidden border border-slate-200 cursor-pointer group hover:shadow-xl transition-all">
                <div className="absolute inset-0">
                  <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#ddd" strokeWidth="0.5"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#ddd" strokeWidth="0.5"/>
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#ddd" strokeWidth="0.3"/>
                    <line x1="0" y1="75" x2="100" y2="75" stroke="#ddd" strokeWidth="0.3"/>
                    <line x1="25" y1="0" x2="25" y2="100" stroke="#ddd" strokeWidth="0.3"/>
                    <line x1="75" y1="0" x2="75" y2="100" stroke="#ddd" strokeWidth="0.3"/>
                  </svg>
                </div>
                
                <div className="absolute top-[45%] left-[42%]">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white shadow-lg opacity-60">
                    <MapPin size={16} />
                  </div>
                </div>

                <div className="absolute top-[40%] left-[55%] transform -translate-x-1/2 -translate-y-full">
                  <div className="relative">
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 flex h-16 w-16">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                    </span>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white group-hover:scale-125 transition-transform">
                      <MapPin size={24} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-sm">Nhấn để xem bản đồ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default FieldDetail;