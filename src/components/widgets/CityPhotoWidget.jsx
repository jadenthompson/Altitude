// src/components/widgets/CityPhotoWidget.jsx
import React from 'react';

const CityPhotoWidget = () => {
  return (
    <div className="overflow-hidden rounded-xl shadow">
      <img
        src="https://source.unsplash.com/featured/?city"
        alt="City"
        className="w-full h-40 object-cover"
      />
    </div>
  );
};

export default CityPhotoWidget;
