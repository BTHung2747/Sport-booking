import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <SearchX size={48} className="text-gray-400" />
      </div>
      <h3 className="heading-4 text-gray-900 mb-2">Không tìm thấy sân phù hợp</h3>
      <p className="body-base text-gray-500 text-center max-w-md">
        Không có sân nào khớp với tiêu chí tìm kiếm của bạn. Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm khác.
      </p>
    </div>
  );
};

export default EmptyState;
