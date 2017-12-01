import React from 'react';
import Logo from '../../../components/Logo/Logo';
import styles from './toolbar.css';

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <div>MENU</div>
      <Logo/>
      <nav>
        ...
      </nav>
    </header>
  );
};

export default toolbar;
