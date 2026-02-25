import React from 'react';

const History = ({ bookings, onCancel }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Lịch sử đặt sân của tôi</h2>
      
      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-white rounded shadow-sm">
            <p className="text-gray-500">Bạn chưa có lịch đặt sân nào.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <table className="min-w-full text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-4 font-semibold text-blue-900">Tên Sân</th>
                <th className="p-4 font-semibold text-blue-900">Ngày</th>
                <th className="p-4 font-semibold text-blue-900">Giờ</th>
                <th className="p-4 font-semibold text-blue-900">Tổng tiền</th>
                <th className="p-4 font-semibold text-blue-900">Trạng thái</th>
                <th className="p-4 font-semibold text-blue-900 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{b.fieldName}</td>
                  <td className="p-4 text-gray-600">{b.date}</td>
                  <td className="p-4 text-gray-600"><span className="px-2 py-1 bg-gray-100 rounded text-sm">{b.slot}</span></td>
                  <td className="p-4 font-bold text-blue-600">{b.price.toLocaleString()}đ</td>
                  <td className="p-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        b.status === 'Chờ xác nhận' ? 'bg-yellow-100 text-yellow-700' : 
                        b.status === 'Đã hủy' ? 'bg-red-100 text-red-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                          {b.status}
                      </span>
                  </td>
                  <td className="p-4 text-center">
                    {b.status === 'Chờ xác nhận' && (
                      <button 
                        onClick={() => onCancel(b.id)}
                        className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded hover:bg-red-500 hover:text-white transition"
                      >
                        Hủy
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;