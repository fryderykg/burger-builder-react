import React from 'react';
import styles from './drawerToggle.css';

const drawerToggle = (props) => {
  return (
    <div className={styles.DrawerToggle} onClick={props.open}>
      <div/>
      <div/>
      <div/>
    </div>
  );
};

export default drawerToggle;
