import React from 'react';

const PlotLabel = ({ number, area, x = 0, y = 0 }) => {
  const containerStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    pointerEvents: 'none',
    userSelect: 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '8px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: 'white',
        lineHeight: 1,
        WebkitTextStroke: '0.5px white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.7))',
        opacity: 0.85
      }}>
        <span style={{ marginBottom: '1px' }}>{number}</span>
        <div style={{ 
          width: '25px', 
          borderBottom: '1px solid white',
          margin: '1px 0'
        }} />
        <span style={{ marginTop: '2px', fontSize: '8px' }}>{area.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default PlotLabel;
