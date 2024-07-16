import React from 'react';
import screenshot1 from 'assets/places/rome.jpg';

const Screenshot = ({ styles }) => (
  <section id="screenshots">
    <div className={styles.container}>
      <h2>See It in Action</h2>
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden', borderRadius: '8px' }}>
        <img
          src={screenshot1}
          alt="AiTripPlanner Video"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>
    </div>
  </section>
);


export default Screenshot;