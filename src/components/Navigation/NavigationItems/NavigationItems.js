import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './navigationItems.css';

const navigationItems = (props) => {
  let orders = null;
  let auth = <NavigationItem link="/auth">Login</NavigationItem>

  if (props.isAuth) {
    orders = <NavigationItem link="/orders">Orders</NavigationItem>;
    auth = <NavigationItem link="/logout">Logout</NavigationItem>
  }

  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      {orders}
      {auth}
    </ul>
  );
};

export default navigationItems;
