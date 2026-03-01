import React, { useState } from 'react';
import { IoCalendarOutline, IoTimeOutline, IoCheckmarkCircle, IoCloseCircle, IoHourglassOutline, IoTrashOutline, IoLocationOutline, IoReceiptOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
const History = ({ bookings = [], onCancel }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => {
        if (filter === 'pending') return b.status === 'Chờ xác nhận';
        if (filter === 'confirmed') return b.status === 'Đã xác nhận';
        if (filter === 'cancelled') return b.status === 'Đã hủy';
        return true;
      });

  const getStatusConfig = (status) => {
    switch(status) {
      case 'Chờ xác nhận':
        return {
          icon: <IoHourglassOutline className="text-lg" />,
          bgClass: 'bg-amber-50',
          textClass: 'text-amber-700',
          borderClass: 'border-amber-200',
          dotClass: 'bg-amber-400'
        };
      case 'Đã hủy':
        return {
          icon: <IoCloseCircle className="text-lg" />,
          bgClass: 'bg-rose-50',
          textClass: 'text-rose-700',
          borderClass: 'border-rose-200',
          dotClass: 'bg-rose-400'
        };
      default:
        return {
          icon: <IoCheckmarkCircle className="text-lg" />,
          bgClass: 'bg-emerald-50',
          textClass: 'text-emerald-700',
          borderClass: 'border-emerald-200',
          dotClass: 'bg-emerald-400'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-zinc-50 font-sans">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200 to-rose-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl shadow-lg transform rotate-3">
              <IoReceiptOutline className="text-3xl text-white transform -rotate-3" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-stone-800 to-zinc-800">
                Lịch sử đặt sân
              </h1>
              <p className="text-slate-500 mt-1 font-medium">Quản lý tất cả đặt chỗ của bạn</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { id: 'all', label: 'Tất cả', count: bookings.length },
              { id: 'pending', label: 'Chờ xác nhận', count: bookings.filter(b => b.status === 'Chờ xác nhận').length },
              { id: 'confirmed', label: 'Đã xác nhận', count: bookings.filter(b => b.status === 'Đã xác nhận').length },
              { id: 'cancelled', label: 'Đã hủy', count: bookings.filter(b => b.status === 'Đã hủy').length }
            ].map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`group relative px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                  filter === id
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-200'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border-2 border-slate-100'
                }`}
              >
                <span className="relative z-10">{label}</span>
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  filter === id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Grid */}
        {filteredBookings.length === 0 ? (
          <div className="relative bg-white rounded-3xl shadow-xl border-2 border-slate-100 p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-transparent to-stone-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-100 to-stone-100 rounded-full mb-6">
                <IoReceiptOutline className="text-5xl text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Chưa có lịch đặt sân nào</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Bắt đầu đặt sân ngay để tận hưởng trải nghiệm thể thao tuyệt vời!</p>
              <Link to="/" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Tìm sân ngay
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status);
              
              return (
                <div
                  key={booking.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl border-2 border-slate-100 overflow-hidden transition-all duration-500 transform hover:-translate-y-1"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500"></div>
                  
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Image Section */}
                    <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-stone-100">
                      {booking.image ? (
                        <img 
                          src={booking.image} 
                          alt={booking.fieldName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IoLocationOutline className="text-6xl text-slate-300" />
                        </div>
                      )}
                      
                      {/* Status Badge on Image */}
                      <div className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-2 ${statusConfig.bgClass} ${statusConfig.textClass} backdrop-blur-sm rounded-xl border ${statusConfig.borderClass} shadow-lg`}>
                        <span className={`w-2 h-2 rounded-full ${statusConfig.dotClass} animate-pulse`}></span>
                        {statusConfig.icon}
                        <span className="text-xs font-bold">{booking.status}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-black text-slate-800 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-rose-500 transition-all duration-300">
                              {booking.fieldName}
                            </h3>
                            {booking.location && (
                              <div className="flex items-center gap-2 text-slate-500">
                                <IoLocationOutline className="text-lg" />
                                <span className="text-sm font-medium">{booking.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-slate-50 to-stone-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm">
                              <IoCalendarOutline className="text-xl text-orange-500" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Ngày đặt</p>
                              <p className="text-sm font-bold text-slate-800">{booking.date}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-slate-50 to-stone-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm">
                              <IoTimeOutline className="text-xl text-rose-500" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Khung giờ</p>
                              <p className="text-sm font-bold text-slate-800">{booking.slot}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Section */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">
                            {booking.price.toLocaleString()}đ
                          </span>
                          <span className="text-sm text-slate-500 font-medium">tổng tiền</span>
                        </div>

                        {booking.status === 'Chờ xác nhận' && (
                          <button
                            onClick={() => onCancel(booking.id)}
                            className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          >
                            <IoTrashOutline className="text-lg group-hover/btn:rotate-12 transition-transform duration-300" />
                            <span>Hủy đặt</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default History;