import React from 'react';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styles from './toolbar.css';

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle open={props.openSideDrawer}/>
      <div className={styles.LogoWrapper}>
        <Logo/>
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems/>
      </nav>
    </header>
  );
};

export default toolbar;
