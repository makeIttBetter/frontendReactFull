import React from 'react';

const Download = ({ styles }) => (
  <section id="download" style={{ textAlign: 'center' }}>
    <div className={styles.container}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px', marginTop: '20px', fontWeight: 'bold'}}>Download AiTripPlanner</h2>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>Available now on web and mobile platforms.</p>
      </div>
    </div>
    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
      <a href="#" className="cta-button" style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#77c9d4',
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
        borderRadius: '8px',
        border: '#77c9d4',
      }}>Download Now</a>
    </div>
  </section>
);

export default Download;