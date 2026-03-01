import React from 'react';
import SportCategoryCard from './SportCategoryCard';

// SVG Icons as React components
const SoccerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 3.3l1.35-.95c1.82.56 3.37 1.76 4.38 3.37l-.39 1.34-1.35.46L14.5 8.5 13 5.3zM9.65 4.35L11 5.3 9.5 8.5 7.01 9.52l-1.35-.46-.39-1.34a7.987 7.987 0 0 1 4.38-3.37zM7.08 17.11l-1.14.1A7.938 7.938 0 0 1 4 12c0-.12.01-.23.02-.35l1-.73 1.38.48 1.46 4.34-.78 1.37zm7.42 2.48c-.79.26-1.63.41-2.5.41s-1.71-.15-2.5-.41l-.69-1.49.64-1.1h5.11l.64 1.11-.7 1.48zM14.27 15H9.73l-1.35-4.02L12 8.44l3.63 2.54L14.27 15zm3.79 2.21l-1.14-.1-.79-1.37 1.46-4.34 1.39-.47 1 .73c.01.11.02.22.02.34 0 1.99-.73 3.81-1.94 5.21z" fill="currentColor"/>
  </svg>
);

const BasketballIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.09 11h4.86a9.951 9.951 0 0 0-1.54-4.4 5.987 5.987 0 0 0-3.32 4.4zM6.91 11a5.987 5.987 0 0 0-3.32-4.4A9.951 9.951 0 0 0 2.05 11h4.86zm8.16 0a7.994 7.994 0 0 1 4.22-6A9.967 9.967 0 0 0 12 2 9.967 9.967 0 0 0 4.71 5a7.994 7.994 0 0 1 4.22 6h6.14zm.02 2h-6.16a7.994 7.994 0 0 1-4.22 6c2.1 1.88 4.84 3 7.81 3a9.967 9.967 0 0 0 7.29-3 7.994 7.994 0 0 1-4.72-6zm-8.18 0H2.05c.35 1.64 1.15 3.11 2.26 4.3a5.987 5.987 0 0 0 2.6-4.3zm11.16 0a5.987 5.987 0 0 0 2.6 4.3 9.951 9.951 0 0 0 2.26-4.3h-4.86z" fill="currentColor"/>
  </svg>
);

const TennisIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.52 2.49C17.18.15 12.9.62 9.97 3.55c-1.6 1.6-2.52 3.87-2.54 5.46-.02 1.58.26 3.89-1.35 5.5l-4.24 4.24 1.42 1.42 4.24-4.24c1.61-1.61 3.92-1.33 5.5-1.35s3.86-.94 5.46-2.54c2.92-2.93 3.4-7.21 1.06-9.55zm-9.2 9.19c-1.53-1.53-1.05-4.61 1.06-6.72s5.18-2.59 6.72-1.06c1.53 1.53 1.05 4.61-1.06 6.72s-5.18 2.59-6.72 1.06zM18 17c.53 0 1.04.21 1.41.59.78.78.78 2.05 0 2.83-.37.37-.88.58-1.41.58s-1.04-.21-1.41-.59c-.78-.78-.78-2.05 0-2.83.37-.37.88-.58 1.41-.58m0-2c-1.02 0-2.05.39-2.83 1.17-1.56 1.56-1.56 4.09 0 5.66C15.95 22.61 16.98 23 18 23s2.05-.39 2.83-1.17c1.56-1.56 1.56-4.09 0-5.66C20.05 15.39 19.02 15 18 15z" fill="currentColor"/>
  </svg>
);

const BadmintonIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.04 12.79l-8.5-8.5C9.43 2.48 12.94 2 16.5 2c.83 0 1.5.67 1.5 1.5v.02c0 .27-.09.52-.26.72L15.04 7h5.46c.83 0 1.5.67 1.5 1.5v.02c0 .27-.09.52-.26.72l-2.7 2.76 3.46 3.46-1.41 1.41-3.46-3.46-2.76 2.7c-.2.17-.45.26-.72.26h-.02c-.83 0-1.5-.67-1.5-1.5V9.46l-2.76 2.7c-.2.17-.45.26-.72.26h-.02c-.83 0-1.5-.67-1.5-1.5 0-.83.67-1.5 1.5-1.5h5.46l2.74-2.74c.17-.2.26-.45.26-.72v-.02c0-.83-.67-1.5-1.5-1.5-3.56 0-7.07.48-10.04 2.37l8.5 8.5c1.49.66 3.52 1.28 5.95 1.28.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-2.84 0-5.21-.7-6.93-1.5L3.51 20.5a3.535 3.535 0 0 1 0-5c1.38-1.38 3.62-1.38 5 0l6.53-2.71z" fill="currentColor"/>
  </svg>
);

const SwimmingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm8 0c0-1.1.9-2 2-2v5h2V3.05c-1.1-.45-2-.55-3-.55-1.5 0-2.79.55-4.29 1.62L8.85 5.77c-.3.21-.51.51-.51.88v4.35c0 .55.45 1 1 1h2v7h2v-6.5l1.8-1.9c1.6 2.7 3.2 4.9 3.2 4.9V21h2v-7.5s-2-3.35-4-7.5zM1 17c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm17.5-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
  </svg>
);

const GymIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" fill="currentColor"/>
  </svg>
);

const SPORT_CATEGORIES = [
  { id: 1, icon: <SoccerIcon />, name: 'Bóng đá',  type: 'Bóng đá'  },
  { id: 2, icon: <BasketballIcon />, name: 'Bóng rổ',  type: 'Bóng rổ'  },
  { id: 3, icon: <TennisIcon />, name: 'Tennis',    type: 'Tennis'    },
  { id: 4, icon: <BadmintonIcon />, name: 'Cầu lông',  type: 'Cầu lông'  },
  { id: 5, icon: <SwimmingIcon />, name: 'Bơi lội',  type: 'Bơi lội'  },
  { id: 6, icon: <GymIcon />, name: 'Gym',      type: 'Gym'       },
];

const SportCategories = ({ onCategorySelect }) => {
  return (
    <div style={{ marginTop: '60px' }}>
      {/* Section title */}
      <h2
        className="text-[#111827] mb-8"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '1.3',
        }}
      >
        Khám phá theo môn thể thao
      </h2>

      {/* Horizontal card row - centered, no scroll */}
      <div className="flex flex-row justify-center items-center flex-wrap gap-x-8 gap-y-2">
        {SPORT_CATEGORIES.map((cat) => (
          <SportCategoryCard
            key={cat.id}
            icon={cat.icon}
            name={cat.name}
            onClick={() => onCategorySelect && onCategorySelect(cat.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default SportCategories;