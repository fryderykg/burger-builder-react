import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './logo.css';

const logo = (props) => (
    <div className={styles.Logo}>
      <img src={burgerLogo} alt="logo"/>
    </div>
  );

export default logo;
