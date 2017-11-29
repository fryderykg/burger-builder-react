import React from 'react';
import styles from './buildControl.css'

const buildControl = (props) => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}test</div>
      <button className={styles.BuildControl__Less}>Less</button>
      <button className={styles.BuildControl__More}>More</button>
    </div>
  );
};

export default buildControl;
