import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
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

const FieldCard = ({ field }) => {
 

  return (
    <div className="card card-hover overflow-hidden group">
      <div className="relative overflow-hidden h-52">
        <img 
          src={field.image} 
          alt={field.name} 
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
        />
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
      
      <div className="p-5">
        <h3 className="heading-5 text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {field.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-gray-500 body-small mb-4">
          <MapPin size={16} className="flex-shrink-0" />
          <span>{field.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="label-text text-gray-400 mb-1">Giá thuê</p>
            <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {field.price.toLocaleString()}đ<span className="text-sm font-normal text-gray-500">/giờ</span>
            </span>
          </div>
          
          <Link 
            to={`/field/${field.id}`} 
            className="btn btn-primary"
          >
            Đặt sân
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
