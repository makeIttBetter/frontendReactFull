import React from 'react';
import screenshot1 from 'assets/places/rome.jpg';

const Screenshot = ({ styles }) => (
  <section id="screenshots">
    <div className={styles.container} style={{ position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden', borderRadius: '8px' }}>
        <img
          src={screenshot1}
          alt="AiTripPlanner Video"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            maxHeight:'100%',
            aspectRatio:'16/9',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>See It in Action</h2>
        </div>
      </div>
    </div>
  </section>
);
export default Screenshot;