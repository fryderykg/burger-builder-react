import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './navigationItems.css';

const navigationItems = (props) => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Login</NavigationItem>
    </ul>
  );
};

export default navigationItems;
