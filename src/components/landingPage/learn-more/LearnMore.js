import React, { useEffect } from 'react';
import Screenshot from './Screenshot';
import Download from './Download';
import styles from './LearnMore.module.css';

const LearnMore = () => {
  useEffect(() => {
    // Your useEffect logic here if needed
  }, []);

  return (
    <div className={styles.LearnMore}>
      <Screenshot styles={styles} />
      {/*<Download styles={styles}/>*/}
    </div>
  );
};

export default LearnMore;