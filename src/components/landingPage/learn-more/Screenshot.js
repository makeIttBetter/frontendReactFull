import React from 'react';
import screenshot1 from 'assets/places/rome.jpg';
import screenshot2 from 'assets/places/rome.jpg';

const Screenshot = ({ styles }) => (
  <section id="screenshots">
    <div className={styles.container}>
      <h2>See It in Action</h2>
      <img src={screenshot1} alt="AiTripPlanner Video" />
      <img src={screenshot2} alt="AiTripPlanner Video" />
    </div>
  </section>
);

export default Screenshot;