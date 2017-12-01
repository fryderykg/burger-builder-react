import React from 'react';
import styles from './backdrop.css';

const backdrop = (props) => {
  return (
      props.show ? <div className={styles.Backdrop} onClick={props.closeBackdrop}/>: null
  );
};

export default backdrop;
