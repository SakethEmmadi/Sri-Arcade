import React from 'react';

const PlotSides = ({ sides, x = 0, y = 0, width = 50, height = 40 }) => {
  const sideStyle = {
    position: 'absolute',
    fontSize: '7px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    WebkitTextStroke: '0.5px white',
    textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.7))',
    opacity: 0.85,
    pointerEvents: 'none',
    userSelect: 'none'
  };

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
      {/* Top side - horizontal text, positioned closer to edge */}
      <div
        style={{
          ...sideStyle,
          top: '0px',
          left: '50%',
          transform: 'translateX(-40%) rotate(0deg)',
          whiteSpace: 'normal'
        }}
      >
        {sides?.top && `${sides.top.toFixed(0)}`}
      </div>
      
      {/* Right side - vertical text, positioned closer to edge */}
      <div
        style={{
          ...sideStyle,
          top: '50%',
          right: '-7px',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center',
          whiteSpace: 'nowrap'
        }}
      >
        {sides?.right && `${sides.right.toFixed(1)}`}
      </div>
      
      {/* Bottom side - horizontal text, positioned closer to edge */}
      <div
        style={{
          ...sideStyle,
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%) rotate(0deg)',
          whiteSpace: 'pre-line'
        }}
      >
        {sides?.bottom && `${sides.bottom.toFixed(1)}`}
      </div>
      
      {/* Left side - vertical text, positioned closer to edge */}
      <div
        style={{
          ...sideStyle,
          top: '50%',
          left: '-13px',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center',
          whiteSpace: 'nowrap'
        }}
      >
        {sides?.left && `${sides.left.toFixed(1)}`}
      </div>
    </div>
  );
};

export default PlotSides;
