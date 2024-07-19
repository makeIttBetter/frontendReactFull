import React from 'react';

const MainSection = ({ styles }) => (
  <section id="learn-more" style={{ padding: '50px 0' }}>
    <div className={styles.container}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Discover Your Next Adventure with AiTripPlanner.</h1>
      <p style={{ fontSize: '24px', marginBottom: '10px', paddingLeft: '10px'}}>Seamlessly plan and organize your trips with AI.</p>
    </div>
  </section>
);

export default MainSection;