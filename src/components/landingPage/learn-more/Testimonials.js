import React from 'react';

const Testimonials = ({ styles }) => (
  <section id="testimonials">
    <div className={styles.container}>
      <h2>What Our Users Say</h2>
      <blockquote className={styles.blockquote}>
        <p>"The AiTripPlanner made my vacation planning effortless!" - Sarah L.</p>
      </blockquote>
      <blockquote className={styles.blockquote}>
        <p>"I love how it integrates with my calendar and maps." - John D.</p>
      </blockquote>
    </div>
  </section>
);

export default Testimonials;