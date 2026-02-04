import React from 'react';

const Legend = ({ statusColors, statusLabels }) => {
  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#1f2937'
  };

  const flexWrapStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const colorBoxStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: '2px solid #d1d5db'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Plot Status</h3>
      <div style={flexWrapStyle}>
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} style={itemStyle}>
            <div 
              style={{ ...colorBoxStyle, backgroundColor: color }}
            />
            <span style={labelStyle}>
              {statusLabels[status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
