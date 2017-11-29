import React from 'react';
import styles from './buildControl.css'

const buildControl = (props) => {
  console.log(props)
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button className={styles.BuildControl__Less}
              onClick={props.removeIngredient}
              disabled={props.disabled}>
        Less
      </button>
      <button className={styles.BuildControl__More}
              onClick={props.addIngredient}>
        More
      </button>
    </div>
  );
};

export default buildControl;
