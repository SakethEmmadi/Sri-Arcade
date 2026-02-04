import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PlotLayout from './components/PlotLayout';
import plotsData from './plots.json';
import './App.css';

function App() {
  const [plotsDataState, setPlotsData] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    setPlotsData(plotsData);
  }, []);
  const handlePlotClick = (plot) => {
    setSelectedPlot(plot);
  };
  if (!plotsDataState) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#6b7280' }}>Loading...</div>
      </div>
    );
  }

  const mainStyle = {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6'
  };

  const containerStyle = {
    maxWidth: '2600px',
    margin: '0 auto',
    padding: '32px 16px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '24px'
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginTop: '50px',
    marginLeft: '0px'
  };

  const detailsContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '14px',
    color: 'white',
    transition: 'background 0.3s ease'
  };

  const detailsTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  };
  const detailsContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    color: 'white'
  };
  const detailItemStyle = {
    fontSize: '16px',
    color: 'white',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    margin: '0',
    padding: '0',
    lineHeight: '1.2'
  };
  const statsContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    border: '2px solid #FF6B35',
    color: 'white'
  };

  const statsItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    color: 'white',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  };

  const statsLabelStyle = {
    fontWeight: '500',
    fontSize: '16px',
    color: 'white',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  };

  return (
    <div style={mainStyle}>
      <Header /> 
      <main style={containerStyle}>
        <div style={gridStyle}>
          {/* Sidebar  (Navbar Area) */}
          <div style={sidebarStyle}>
            {/* Selected Plot Info */}
            {selectedPlot && (
              <div style={{...detailsContainerStyle, backgroundColor: selectedPlot ? plotsDataState.statusColors[selectedPlot.status] : 'white', transition: 'background 0.3s ease'}}>
                <h3 style={detailsTitleStyle}>Plot Details</h3>
                <div style={detailsContentStyle}>
                  <p style={{...detailItemStyle, fontSize: '20px', fontWeight: 'bold', marginBottom: '5px'}}>
                    {selectedPlot.id ? `SRI SRI ARCADE` : ''}
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px'}}>
                    /HOUSE SITE PLOTS W-B:
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px'}}>
                    PLOT: {selectedPlot.id} EXTENT: 328 SQ.Yds
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px'}}>
                    STATUS: {selectedPlot.status ? selectedPlot.status.toUpperCase() : 'AVAILABLE'}
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px', marginTop: '5px'}}>
                    Boundaries:
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px', marginLeft: '20px'}}>
                    [N]: BY 33' WIDE ROAD
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px', marginLeft: '20px'}}>
                    (S): BY PLOT NO.{parseInt(selectedPlot.id) - 1}
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px', marginLeft: '20px'}}>
                    (E): BY 60' WIDE ROAD
                  </p>
                  <p style={{...detailItemStyle, fontSize: '20px', marginLeft: '20px'}}>
                    [W]: BY PLOT NO.{parseInt(selectedPlot.id) + 20}
                  </p>
                </div>
              </div>
            )}
            
            {/* Statistics */}
            <div style={statsContainerStyle}>
              <h3 style={detailsTitleStyle}>Statistics</h3>
              <div style={detailsContentStyle}>
                {Object.entries(plotsDataState.statusLabels).map(([status, label]) => (
                  <div key={status} style={statsItemStyle}>
                    <span style={statsLabelStyle}>{label}:</span>
                    <span style={{ fontWeight: 'bold' }}>{plotsDataState.plots.filter(p => p.status === status).length}</span>
                  </div>
                ))}
                <div key="total" style={{...statsItemStyle, borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '8px', marginTop: '8px'}}>
                  <span style={{...statsLabelStyle, fontWeight: 'bold'}}>Total Plots:</span>
                  <span style={{ fontWeight: 'bold' }}>{plotsDataState.plots.length}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Plot Layout - Right Side */}
          <div>
            <PlotLayout 
              plots={plotsDataState.plots} 
              statusColors={plotsDataState.statusColors}
              onPlotClick={handlePlotClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
