import React from 'react';

const Download = ({ styles }) => (
  <section id="download" style={{ textAlign: 'center' }}>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', /* Optional: Add shadow for depth */
      maxWidth: '1200px', /* Optional: Limit width to maintain readability */
      margin: 'auto', /* Center align horizontally */
      height: '400px', /* Adjust height as needed */
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', /* Center vertically */
      alignItems: 'center', /* Center horizontally */
    }}>
      <div className={styles.container} style={{ marginBottom: '10px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px', marginTop: '20px', fontWeight: 'bold'}}>Download AiTripPlanner</h2>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>Available now on web and mobile platforms.</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:'auto', marginBottom:'70px' }}>
        <a href="#" className="cta-button" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#77c9d4',
          color: 'white',
          textDecoration: 'none',
          fontSize: '18px',
          borderRadius: '8px',
          border: 'none', /* Remove border */
          transition: 'background 0.3s ease', /* Add transition for smooth hover effect */
          ':hover': { backgroundColor: '#5ca8b9' } // Inline hover style
        }}
        onMouseOver={(e) => { e.target.style.backgroundColor = '#5ca8b9'; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = '#77c9d4'; }}>
          Download Now
        </a>
      </div>
    </div>
  </section>
);

export default Download;