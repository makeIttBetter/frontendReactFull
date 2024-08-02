import React from 'react';
import styles from './Contact.module.css';

const Contact = () => (
  <section id="contact" className={`${styles.contact} ${styles['flex-container']}`}>
    <div className={styles.container}>
      <h2 className="original-h2">Contact Us</h2>
      <p>Have questions or need support? Reach out to us!</p>
      <form action="#" method="post">
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit" className={styles.cta}>Send Message</button>
      </form>
    </div>
  </section>
);

export default Contact;