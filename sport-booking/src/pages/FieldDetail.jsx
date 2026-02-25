import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_FIELDS, TIME_SLOTS } from '../data/mockData';
import { Star } from 'lucide-react';
import { IconBallFootball, IconBallTennis } from '@tabler/icons-react';
import { GiShuttlecock } from 'react-icons/gi';

const getSportIcon = (type) => {
  switch (type) {
    case 'Bóng đá':
      return <IconBallFootball size={18} />;
    case 'Tennis':
      return <IconBallTennis size={18} />;
    case 'Cầu lông':
      return <GiShuttlecock size={18} />;
    default:
      return null;
  }
};

const getSportColor = (type) => {
  switch (type) {
    case 'Bóng đá':
      return 'bg-green-100 text-green-700';
    case 'Tennis':
      return 'bg-yellow-100 text-yellow-700';
    case 'Cầu lông':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const FieldDetail = ({ onBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const field = MOCK_FIELDS.find(f => f.id === parseInt(id));

  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  if (!field) return <div className="text-center mt-10">Không tìm thấy sân!</div>;

  const handleBooking = () => {
    if (!date || !slot) return alert("Vui lòng chọn đầy đủ ngày và giờ!");
    
    const newBooking = {
      id: Date.now(),
      fieldId: field.id, 
      fieldName: field.name, 
      date, 
      slot, 
      price: field.price,
      status: 'Chờ xác nhận' 
    };

    const isSuccess = onBook(newBooking);
    
    if (isSuccess) {
      alert("Đặt sân thành công! Vui lòng kiểm tra lịch sử.");
      navigate('/history');
    }
  };

  return (
    <div className="max-w-5xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative overflow-hidden rounded-lg mb-6">
            <img src={field.image} alt={field.name} className="w-full h-64 object-cover" />
            <div className="absolute top-3 right-3">
              <div className={`badge ${getSportColor(field.type)}`}>
                {getSportIcon(field.type)}
                <span>{field.type}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-semibold text-white">{field.rating}</span>
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-800">{field.name}</h2>
          <p className="text-lg text-blue-600 font-medium mb-4">{field.type}</p>
          <div className="space-y-2 text-gray-600">
             <p><strong>Địa điểm:</strong> {field.location}</p>
             <p><strong>Giá thuê:</strong> {field.price.toLocaleString()} VNĐ/giờ</p>
             <p><strong>Mô tả:</strong> Sân bãi đạt chuẩn quốc tế, có bãi gửi xe rộng rãi, phục vụ nước uống và khăn lạnh miễn phí.</p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 h-fit">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Đặt lịch ngay</h3>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Chọn ngày:</label>
            <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={(e) => setDate(e.target.value)} 
            />
          </div>
          
          <div className="mb-8">
            <label className="block mb-2 font-medium text-gray-700">Chọn khung giờ:</label>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map(t => (
                <button 
                  key={t}
                  className={`p-2 text-sm border rounded transition ${slot === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-200'}`}
                  onClick={() => setSlot(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleBooking} className="w-full py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-lg transform active:scale-95 transition">
            XÁC NHẬN ĐẶT SÂN
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldDetail;