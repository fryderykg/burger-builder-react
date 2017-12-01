import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './sideDrawer.css';

const SideDrawer = (props) => {

  return (
    <div className={styles.SideDrawer}>
      <div className={styles.LogoWrapper}>
        <Logo/>
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  );
};

export default SideDrawer;
