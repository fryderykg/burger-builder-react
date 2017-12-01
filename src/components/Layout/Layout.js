import React from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './layout.css'

const layout = (props) => (
  <Aux>
    <Toolbar/>
    <div>SideDrawer, Backdrop</div>
    <main className={styles.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;
