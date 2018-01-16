import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './navigationItems.css';

const navigationItems = (props) => {
  let orders = null;
  let auth = <NavigationItem link="/auth"
                             clicked={props.closeSideDrawer}>Login</NavigationItem>;

  if (props.isAuth) {
    orders = <NavigationItem link="/orders"
                             clicked={props.closeSideDrawer}>Orders</NavigationItem>;
    auth = <NavigationItem link="/logout"
                           clicked={props.closeSideDrawer}>Logout</NavigationItem>
  }

  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact
                      clicked={props.closeSideDrawer}>Burger Builder</NavigationItem>
      {orders}
      {auth}
    </ul>
  );
};

export default navigationItems;
