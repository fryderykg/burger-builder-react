import React from 'react';
import styles from './buildControls.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <BuildControl/>
    </div>
  );
};

export default buildControls;
