import React from 'react';
import styles from './Download.module.css';

const Download = () => (
  <section id="download" className={styles.downloadSection}>
    <div className={styles.downloadBox}>
      <div className={styles.container}>
        <div className={styles.downloadText}>
          <h2 className={styles.downloadTitle}>Download AiTripPlanner</h2>
          <p className={styles.downloadDescription}>Available now on web and mobile platforms.</p>
        </div>
      </div>
      <div className={styles.container}>
        <a href="#" className={styles.downloadButton}>
          Download Now
        </a>
      </div>
    </div>
  </section>
);

export default Download;
