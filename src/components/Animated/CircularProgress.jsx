import React from 'react';
import '../../assets/css/css/CircularProgress.css'; // Import CSS file for styling

const CircularProgress = ({ size, thickness, color }) => {
  const circleStyle = {
    width: size || '50px', // Default size
    height: size || '50px', // Default size
    borderWidth: thickness || '3px', // Default thickness
    borderColor: color || '#3f51b5', // Default color
  };

  return (
    <div className="circular-progress" style={circleStyle}>
      <div className="circle"></div>
    </div>
  );
};

export default CircularProgress;