import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './navigationItems.css';

const navigationItems = (props) => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" active>Burger Builder</NavigationItem>
      <NavigationItem link="/checkout">Checkout Page</NavigationItem>
    </ul>
  );
};

export default navigationItems;
