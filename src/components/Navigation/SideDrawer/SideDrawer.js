import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './sideDrawer.css';

const SideDrawer = (props) => {
  let sideDrawerClasses;

  if(props.show) {
    sideDrawerClasses = [styles.SideDrawer, styles.Open].join(' ')
  } else {
    sideDrawerClasses = [styles.SideDrawer, styles.Close].join(' ')
  }

  return (
    <Aux>
      <Backdrop show={props.show} closeBackdrop={props.closeSideDrawer}/>
      <div className={sideDrawerClasses}>
        <div onClick={props.closeSideDrawer}>X</div>
        <div className={styles.LogoWrapper}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
