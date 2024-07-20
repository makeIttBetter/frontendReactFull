import React, { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const testimonials = testimonialsRef.current;
      if (!testimonials) return;

      const testimonialsTop = testimonials.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition > testimonialsTop) {
        const leftBox = testimonials.querySelector(`.${styles.leftBox}`);
        const rightBox = testimonials.querySelector(`.${styles.rightBox}`);
        const leftBoxBottom = testimonials.querySelector(`.${styles.leftBoxBottom}`);
        const rightBoxBottom = testimonials.querySelector(`.${styles.rightBoxBottom}`);

        if (leftBox) leftBox.classList.add(styles.active);
        if (rightBox) rightBox.classList.add(styles.active);
        if (leftBoxBottom) leftBoxBottom.classList.add(styles.active);
        if (rightBoxBottom) rightBoxBottom.classList.add(styles.active);
      } else {
        const leftBox = testimonials.querySelector(`.${styles.leftBox}`);
        const rightBox = testimonials.querySelector(`.${styles.rightBox}`);
        const leftBoxBottom = testimonials.querySelector(`.${styles.leftBoxBottom}`);
        const rightBoxBottom = testimonials.querySelector(`.${styles.rightBoxBottom}`);

        if (leftBox) leftBox.classList.remove(styles.active);
        if (rightBox) rightBox.classList.remove(styles.active);
        if (leftBoxBottom) leftBoxBottom.classList.remove(styles.active);
        if (rightBoxBottom) rightBoxBottom.classList.remove(styles.active);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="testimonials" className={styles.testimonialsSection} ref={testimonialsRef}>
      <div className={styles.testimonialsContainer}>
        <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
        <div className={styles.container}>
          <div className={styles.leftBox}>
            <div className={styles.blockquote}>
              <p className={styles.p}>"The AI TripPlanner is incredibly intuitive and saved me hours of research time!"</p>
            </div>
          </div>
          <div className={styles.centerBox}>
            <div className={styles.blockquote}>
              <p className={styles.p}>"Planning trips has never been easier! The personalized recommendations are spot on."</p>
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.blockquote}>
              <p className={styles.p}>"I'm amazed by how accurately it suggests activities based on my preferences."</p>
            </div>
          </div>
          <div className={styles.leftBoxBottom}>
            <div className={styles.blockquote}>
              <p className={styles.p}>"The personalized suggestions made my trip planning a breeze!"</p>
            </div>
          </div>
          <div className={styles.rightBoxBottom}>
            <div className={styles.blockquote}>
              <p className={styles.p}>"I love how the AI TripPlanner finds unique experiences tailored to my tastes."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

