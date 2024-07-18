import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => (
  <section id="testimonials" className={styles.testimonialsSection}>
    <div className={styles.testimonialsContainer}>
      <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <div className={styles.blockquote}>
            <p className={styles.p}>"The AI TripPlanner is incredibly intuitive and saved me hours of research time!"</p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.blockquote}>
            <p className={styles.p}>"I'm amazed by how accurately it suggests activities based on my preferences."</p>
          </div>
        </div>
        <div className={styles.centerBox}>
          <div className={styles.blockquote}>
            <p className={styles.p}>"Planning trips has never been easier! The personalized recommendations are spot on."</p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.blockquote}>
            <p className={styles.p}>"The integration with my favorite apps makes it seamless to organize my trips."</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;

