import React from 'react';

const Testimonials = () => (
  <section id="testimonials" style={{ backgroundColor: '#f6f6f6', paddingTop: '80px', paddingBottom: '80px'}}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '120px', fontSize: '42px'}}>What Our Users Say</h2>
      <div style={styles.container}>
        <div style={styles.leftBox}>
          <div style={styles.blockquote}>
            <p style={styles.p}>"The AI TripPlanner is incredibly intuitive and saved me hours of research time!"</p>
          </div>
        </div>
        <div style={styles.rightBox}>
          <div style={styles.blockquote}>
            <p style={styles.p}>"I'm amazed by how accurately it suggests activities based on my preferences."</p>
          </div>
        </div>
        <div style={styles.centerBox}>
          <div style={styles.blockquote}>
            <p style={styles.p}>"Planning trips has never been easier! The personalized recommendations are spot on."</p>
          </div>
        </div>
        <div style={styles.rightBox}>
          <div style={styles.blockquote}>
            <p style={styles.p}>"The integration with my favorite apps makes it seamless to organize my trips."</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  blockquote: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  p: {
    fontSize: '24px',
    fontStyle: 'italic',
    margin: '0',
  },
  leftBox: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '35%',
    transform: 'translateY(-50%) rotate(-10deg)',
    zIndex: '1',
  },
  rightBox: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '35%',
    transform: 'translateY(-50%) rotate(10deg)',
    zIndex: '1',
  },
  centerBox: {
    margin: '0 auto',
    width: '35%',
    zIndex: '2',
  },
};

export default Testimonials;
