import React from 'react';
import styles from './drawerToggle.css';

const drawerToggle = (props) => {
  return (
    <div onClick={props.open}>MENU</div>
  );
};

export default drawerToggle;
