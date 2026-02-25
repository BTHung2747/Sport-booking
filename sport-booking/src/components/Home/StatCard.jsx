import React from 'react';

const StatCard = ({ icon:Icon,  value, label, gradient }) => {
  return (
    <div className="card card-hover p-6 text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${gradient}`}>
        <Icon size={32} className="text-white" />
      </div>
      <div className="heading-3 mb-1">{value}</div>
      <div className="body-small text-gray-600">{label}</div>
    </div>
  );
};

export default StatCard;
