import React from 'react';
import background from '../assets/images/sripuram-layout.svg';

const MapBackground = () => {
  const svgWidth = 2368;
  const svgHeight = 1728;

  return (
    <svg 
      width={svgWidth} 
      height={svgHeight} 
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: '-50px', zIndex: 0, width: '100%', height: '100%' }}
    >
      {/* Enhanced background with smooth gradient */}
      <defs>
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7fafc" />
          <stop offset="30%" stopColor="#e0f2fe" />
          <stop offset="70%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
        <filter id="smoothFilter">
          <feGaussianBlur stdDeviation="0.5" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0.6 1" />
          </feComponentTransfer>
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
      </defs>
      
      {/* Background rectangle with enhanced styling */}
      <rect 
        x="0"
        y="0"
        width={svgWidth}
        height={svgHeight}
        fill="url(#backgroundGradient)"
        stroke="#94a3b8"
        strokeWidth="0.5"
      />
      
      {/* Use uploaded SVG as background with proper scaling */}
      <image 
        href={background}
        x="0"
        y="0"
        width={svgWidth}
        height={svgHeight}
        preserveAspectRatio="none"
        opacity="0.8"
        style={{ 
          imageRendering: 'auto',
          filter: 'url(#smoothFilter) contrast(1.05) saturate(1.1) brightness(1.02)'
        }}
      />
    </svg>
  );
};

export default MapBackground;
