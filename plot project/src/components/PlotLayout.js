import React from 'react';
import MapBackground from './MapBackground';
import PlotLabel from './PlotLabel';
import PlotSides from './PlotSides';

const PlotLayout = ({ plots, statusColors, onPlotClick }) => {
  const svgWidth = 2368;
  const svgHeight = 1728;

  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '100%',
    overflow: 'hidden',
    height: 'calc(100vh - 200px)',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    marginBottom: '16px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 4px 0'
  };
  const borderStyle = {
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    flex: '1',
    display: 'block',
    backgroundColor: '#f9fafb'
  };

  const svgStyle = {
    width: '100%',
    height: '100%',
    display: 'block',
    margin: '0',
    padding: '0',
    transform: 'scale(1) translateX(-50px)',
    transformOrigin: 'top left'
  };

  const footerStyle = {
    marginTop: '16px',
    overflow: 'hidden',
    width: '100%'
  };

  const footerTextStyle = {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Map Layout</h2>
      </div>
      
      <div style={borderStyle}>
        <MapBackground />
        <svg 
          width={svgWidth} 
          height={svgHeight} 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          style={{ ...svgStyle, position: 'relative', zIndex: 1 }}
        >
          {/* Plot sections with enhanced visibility and labeling */}
          {plots.map((plot) => {
            const getTextCenterX = (plot) => {
              if (plot.shape === 'square') {
                return plot.x + Math.min(plot.width, plot.height) / 2;
              } else if ((plot.shape === 'trapezium' || plot.shape === 'polygon') && plot.points) {
                // Calculate center from scaled polygon points
                const originalPoints = plot.points.split(' ').map(point => {
                  const [px, py] = point.split(',').map(Number);
                  return { x: px, y: py };
                });
                
                // Find bounds of original shape
                const minX = Math.min(...originalPoints.map(p => p.x));
                const maxX = Math.max(...originalPoints.map(p => p.x));
                const originalWidth = maxX - minX;
                
                // Scale and center
                const scaledCenterX = plot.x + (plot.width / 2);
                return scaledCenterX;
              } else {
                return plot.x + plot.width / 2;
              }
            };

            const getTextCenterY = (plot) => {
              if (plot.shape === 'square') {
                return plot.y + Math.min(plot.width, plot.height) / 2;
              } else if ((plot.shape === 'trapezium' || plot.shape === 'polygon') && plot.points) {
                // Calculate center from scaled polygon points
                const scaledCenterY = plot.y + (plot.height / 2);
                return scaledCenterY;
              } else {
                return plot.y + plot.height / 2;
              }
            };

            const renderShape = () => {
              // Handle different shapes based on plot.shape property
              if (plot.shape === 'square') {
                // Render a perfect square
                const size = Math.min(plot.width, plot.height);
                return (
                  <rect
                    x={plot.x}
                    y={plot.y}
                    width={size}
                    height={size}
                    fill={statusColors[plot.status]}
                    stroke="#333"
                    strokeWidth="2"
                    style={{ 
                      cursor: 'pointer', 
                      opacity: 0.8, 
                      transition: 'opacity 0.2s'
                    }}
                    onClick={() => onPlotClick && onPlotClick(plot)}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                  />
                );
              } else if (plot.rotation) {
                // Handle rotated plots
                return (
                  <g transform={`rotate(${plot.rotation} ${plot.x + plot.width/2} ${plot.y + plot.height/2})`}>
                    <rect
                      x={plot.x}
                      y={plot.y}
                      width={plot.width}
                      height={plot.height}
                      fill={statusColors[plot.status]}
                      stroke="#333"
                      strokeWidth="2"
                      style={{ 
                        cursor: 'pointer', 
                        opacity: 0.8, 
                        transition: 'opacity 0.2s'
                      }}
                      onClick={() => onPlotClick && onPlotClick(plot)}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                    />
                  </g>
                );
              } else if (plot.shape === 'trapezium' && plot.points) {
                // Render trapezium shape with relative coordinates and scaling
                const getScaledPoints = (points, x, y, width, height) => {
                  // Parse original points
                  const originalPoints = points.split(' ').map(point => {
                    const [px, py] = point.split(',').map(Number);
                    return { x: px, y: py };
                  });
                  
                  // Find bounds of original shape
                  const minX = Math.min(...originalPoints.map(p => p.x));
                  const maxX = Math.max(...originalPoints.map(p => p.x));
                  const minY = Math.min(...originalPoints.map(p => p.y));
                  const maxY = Math.max(...originalPoints.map(p => p.y));
                  
                  const originalWidth = maxX - minX;
                  const originalHeight = maxY - minY;
                  
                  // Scale and translate points
                  return originalPoints.map(point => {
                    const scaledX = (point.x - minX) * (width / originalWidth);
                    const scaledY = (point.y - minY) * (height / originalHeight);
                    return `${x + scaledX},${y + scaledY}`;
                  }).join(' ');
                };
                
                return (
                  <polygon
                    points={getScaledPoints(plot.points, plot.x, plot.y, plot.width, plot.height)}
                    fill={statusColors[plot.status]}
                    stroke="#333"
                    strokeWidth="2"
                    style={{ 
                      cursor: 'pointer', 
                      opacity: 0.8, 
                      transition: 'opacity 0.2s'
                    }}
                    onClick={() => onPlotClick && onPlotClick(plot)}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                  />
                );
              } else if (plot.shape === 'polygon' && plot.points) {
                const getScaledPoints = (points, x, y, width, height) => {
                  const originalPoints = points.split(' ').map(point => {
                    const [px, py] = point.split(',').map(Number);
                    return { x: px, y: py };
                  });
                  
                  const minX = Math.min(...originalPoints.map(p => p.x));
                  const maxX = Math.max(...originalPoints.map(p => p.x));
                  const minY = Math.min(...originalPoints.map(p => p.y));
                  const maxY = Math.max(...originalPoints.map(p => p.y));
                  
                  const originalWidth = maxX - minX;
                  const originalHeight = maxY - minY;
                  
                  // Scale and translate points
                  return originalPoints.map(point => {
                    const scaledX = (point.x - minX) * (width / originalWidth);
                    const scaledY = (point.y - minY) * (height / originalHeight);
                    return `${x + scaledX},${y + scaledY}`;
                  }).join(' ');
                };
                
                return (
                  <polygon
                    points={getScaledPoints(plot.points, plot.x, plot.y, plot.width, plot.height)}
                    fill={statusColors[plot.status]}
                    stroke="#333"
                    strokeWidth="2"
                    style={{ 
                      cursor: 'pointer', 
                      opacity: 0.8, 
                      transition: 'opacity 0.2s'
                    }}
                    onClick={() => onPlotClick && onPlotClick(plot)}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                  />
                );
              } else if (plot.shape === 'L-shape' && plot.points) {
                return (
                  <path
                    d={plot.points}
                    fill={statusColors[plot.status]}
                    stroke="#333"
                    strokeWidth="2"
                    style={{ 
                      cursor: 'pointer', 
                      opacity: 0.8, 
                      transition: 'opacity 0.2s'
                    }}
                    onClick={() => onPlotClick && onPlotClick(plot)}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                  />
                );
              } else {
                return (
                  <rect
                    x={plot.x}
                    y={plot.y}
                    width={plot.width}
                    height={plot.height}
                    fill={statusColors[plot.status]}
                    stroke="#333"
                    strokeWidth="2"
                    style={{ 
                      cursor: 'pointer', 
                      opacity: 0.8, 
                      transition: 'opacity 0.2s'
                    }}
                    onClick={() => onPlotClick && onPlotClick(plot)}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                  />
                );
              }
            };

            return (
              <g key={plot.id}>
                {renderShape()}
                {/* Plot number with area display for all 146 plots */}
                <foreignObject 
                  x={getTextCenterX(plot) - 20} 
                  y={getTextCenterY(plot) - 15} 
                  width="60" 
                  height="50"
                  style={{ pointerEvents: 'none' }}
                >
                  <PlotLabel 
                    number={plot.id} 
                    area={plot.area || 183.3} 
                  />
                </foreignObject>
                {/* Plot sides display for all 146 plots */}
                <foreignObject 
                  x={getTextCenterX(plot) - 30} 
                  y={getTextCenterY(plot) - 30} 
                  width="100" 
                  height="80"
                  style={{ pointerEvents: 'none' }}
                >
                  <PlotSides 
                    sides={plot.sides}
                  />
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default PlotLayout;
